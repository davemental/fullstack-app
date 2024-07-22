import React from 'react'
import useAuth from '../Hooks/useAuth'
import PrimaryButton from './PrimaryButton';
import useLogout from '../Hooks/useLogout';

export const Header = () => {
    const { auth } = useAuth();
    const logout = useLogout();

    const signOut = async () => { 
        await logout();
    }

  return (
      <div className='p-2 w-full h-12 bg-gray-50 border border-slate-200 rounded-md flex justify-between'>
          <h1>Welcome, <span className='capitalize font-medium'>{auth.user}</span></h1>
          <PrimaryButton onClick={() =>  signOut()}>Sign Out</PrimaryButton>
    </div>
  )
}
