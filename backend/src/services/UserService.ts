import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface Auth0TokenResponse {
  access_token: string;
  id_token?: string;
  expires_in: number;
  token_type: string;
  refresh_token?: string;
}

class UserService {
  private domain: string;
  private clientId: string;
  private clientSecret: string;
  private audience: string;
  private managementClientId: string;
  private managementClientSecret: string;
  private managementAudience: string;
  //private scope: string;

  constructor() {
    this.domain = `${process.env.AUTH0_DOMAIN }`; 
    this.clientId = `${process.env.AUTH0_MGMT_CLIENT_ID }`; 
    this.clientSecret = `${process.env.AUTH0_MGMT_CLIENT_SECRET }`; 
    this.audience =  `${process.env.AUTH0_AUDIENCE}`;
    this.managementClientId = `${process.env.AUTH0_DOMAIN_MANAGEMENT_CLIENT_ID}`;
    this.managementClientSecret = `${process.env.AUTH0_DOMAIN_MANAGEMENT_CLIENT_SECRET}`;
    this.managementAudience = `${process.env.AUTHO_DOMAIN_MANAGEMENT_API_AUDIENCE}`;
   // this.scope = 'yesu111.yr@gmail.com';
  }

  public async login(code: string): Promise<Auth0TokenResponse> {
    // const response: AxiosResponse<Auth0TokenResponse> = await axios.post(
    //   `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    //     new URLSearchParams({
    //       grant_type: 'authorization_code',
    //       client_id: this.clientId,
    //       client_secret: this.clientSecret,
    //       code: code,
    //       redirect_uri: process.env.AUTH0_REDIRECT_URI!,
    //     }),
    //     {
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //     }
    // );
        const response: AxiosResponse<Auth0TokenResponse> = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        grant_type: 'authorization_code',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        audience: this.audience,
        redirect_uri: process.env.AUTH0_REDIRECT_URI!,
      },
      {
        headers: {
          'Content-Type': 'application/json', 
        },
      }
    );

    if (!response.data || !response.data.access_token) {
      throw new Error('Failed to retrieve access token from Auth0');
    }
    return response.data;
  }
 


  public async getManagementCredentialsToken(): Promise<string> {
   
     const response: AxiosResponse<Auth0TokenResponse> = await axios.post(
    `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    {
      grant_type: 'client_credentials',
      client_id: this.managementClientId!,
      client_secret: this.managementClientSecret!,
      audience: this.managementAudience!,
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );
   
    return response?.data?.access_token || '';
  } catch (error: any) {
    
    if (error.response) {
     
      console.error('Auth0 error response:', error.response.status, error.response.data);
      throw new Error(`Auth0 error: ${error.response.data.error_description || error.response.statusText}`);
    } else if (error.request) {
      
      console.error('No response from Auth0:', error.message);
      throw new Error('No response from Auth0 server');
    } else {
     
      console.error('Request setup error:', error.message);
      throw new Error('Error creating Auth0 request');
    }
  }
 
  public async getAuth0UserInfoWithRole(userId: string): Promise<any> {
  
    try {
      
      const token =  await this.getManagementCredentialsToken();

      const { data: response} = await axios.get<{ id: string }>(
          `https://${process.env.AUTHO_DOMAIN_MANAGEMENT_API}/users/${encodeURIComponent(userId)}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response;
      
    } catch (err: any) {
      console.error('Error getting:', err.response?.data || err.message);
      return err
    }

   }
  public async deleteAuth0User(userId: string): Promise<any> {
    
      try {
      const token =  await this.getManagementCredentialsToken(); // fetch Machine to Machine token

    const { data: response} = await axios.delete<void>(
        `https://${process.env.AUTHO_DOMAIN_MANAGEMENT_API}/users/${encodeURIComponent(userId)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          `Auth0 Management API error: [${error.response.status}]`,
          error.response.data
        );
        return error
      }
      console.error('Unexpected error calling Auth0 Management API:', error);
      throw new Error('Could not delete Auth0 user');
    }
  }


   public async assignRoleToUser(userId: string, roleName: string): Promise<any> {
    try {
      
      const token =  await this.getManagementCredentialsToken();

      const { data: roles } = await axios.get<{ id: string; name: string }[]>(
        `https://${process.env.AUTHO_DOMAIN_MANAGEMENT_API}/roles`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { name_filter: roleName },
        }
      );

      const role = roles.find(r => r.name === roleName);
      if (!role) {
        return { status: 404, message: `Role "${roleName}" not found.` }; 
      }

      const { data: currentRoles } = await axios.get<{ id: string }[]>(
        `https://${process.env.AUTHO_DOMAIN_MANAGEMENT_API}/users/${encodeURIComponent(userId)}/roles`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (currentRoles.some(r => r.id === role.id)) {
        return; 
      }

      // Assign the role to the user
      const { data: response } =  await axios.post(
        `https://${process.env.AUTHO_DOMAIN_MANAGEMENT_API}/users/${encodeURIComponent(userId)}/roles`,
        { roles: [role.id] },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
      return response
    } catch (err: any) {
      console.error('Error assigning role to user:', err.response?.data || err.message);
      return err
    }
   }
}



export default new UserService();
