'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'src/context/AuthContext';

const withAuth = (WrappedComponent: React.FC) => {
   
  return () => {
   const { user, isAuthenticated, loading, login } = useAuth();
    const router = useRouter();
    console.log(user);
    // useEffect(() => {
    //   if (!loading && !isAuthenticated) {
    //     router.replace('/')
       
    //   }
  
    // }, [loading, isAuthenticated]);

    //if (loading || !isAuthenticated)  return null;
    
    return <WrappedComponent />;
  };
};

export default withAuth;
