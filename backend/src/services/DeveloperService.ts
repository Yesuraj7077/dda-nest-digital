import DeveloperModel, { Developer } from '../models/Developer';
import UserService from './UserService';

interface QueryParams {
  skills?: string;
  location?: string;
  name?: string;
  experience?: number;
  search?: {},
  userId?: string;
  page?: number;
  limit?: number;
}


export default class DeveloperService {


  static async getDeveloperByUserId(userId: string): Promise<Developer | null> {
    const developer = await DeveloperModel.findOne({ userId: userId });
    return developer;
  }


  static async getDevelopers(query: QueryParams) {
    const {
      skills,
      location,
      experience,
      name,
      search,
      page = 1,
      limit,
    } = query;

    const filter: Record<string, any> = {};

    const fields: (keyof QueryParams)[] = ['skills', 'location', 'userId'];
    const numericFields: (keyof QueryParams)[] = ['experience'];

    fields.forEach(field => {
      const value = query[field];
      if (typeof value === 'string' && value.trim() !== '') {
        filter[field] = { $regex: value.trim(), $options: 'i' };
      }
    });

    numericFields.forEach(field => {
      const value = query[field];
      if (value !== undefined) {
        const numValue = Number(value);
        if (!isNaN(numValue)) {
          filter[field] = numValue;
        }
      }
    });
    if (search) {
      const safeSearch = search.toString().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      filter.$or = [
        { name: { $regex: safeSearch, $options: 'i' } },
        { skills: { $regex: safeSearch, $options: 'i' } }, 
        { userId: { $regex: safeSearch, $options: 'i' } }, 
       // { location: { $regex: safeSearch, $options: 'i' } },
        // { email: { $regex: safeSearch, $options: 'i' } },
      ];
    }

    return DeveloperModel.paginate(filter, {
      page: Number(page),
      limit: Number(limit),
      sort: { createdAt: -1 },
    });
  }



  static async createDeveloper(data: Partial<Developer>, userId: string) {

    //Assign the 'user' role to the user if not already assigned
    await UserService.assignRoleToUser(userId, 'user');
    const dev = new DeveloperModel({ ...data, userId });
    return dev.save();
  }

  static async updateDeveloper(userId: string,  data: Partial<Developer>) {
    const dev = await DeveloperModel.findOne({ userId: userId });
    if (!dev) return;
    if (dev.userId !== userId) {
      return { status: 403, message: 'Access denied to update the developer profile' };
    }

   
    Object.assign(dev, data);
    return dev.save();
  }

  static async deleteDeveloper(userId: string) {

    
    const result = await DeveloperModel.findOneAndDelete({ userId: userId });
    if (!result) throw new Error('Developer not found');
    return result;
  }
}
