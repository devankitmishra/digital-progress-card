import React, { useState } from 'react'
import useAuth from './useAuth'
import {ArrowRight} from 'lucide-react'
import Register from './Register'

const Login = ({setLogin}) => {
  const [isRegistered, setIsRegistered] = useState(true);
  const {
    email, setEmail,
    password, setPassword,
    error,
    handleGoogleLogin,
    handleEmailLogin,
    handlePasswordReset,
  } = useAuth();
  
  const toggleLogin= () =>{
    setIsRegistered((isRegistered)=>!isRegistered);
  }
  return (
    <>
    {isRegistered?
       <section>
       <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
         <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
           <div className="mb-2 flex justify-center">
           <img className='object-cover w-24 h-24 rounded' src="/media/images/dpc-logo.png" alt="brand logo" />
           </div>
           <h2 className="text-center text-2xl font-bold leading-tight text-black">
             Sign in to your account
           </h2>
           {/* remove the comment to add email login  */}
           <p className="mt-2 text-center text-sm text-gray-600 ">
             Don&apos;t have an account?{' '}
             <em
               onClick={toggleLogin}
               className="cursor-pointer font-semibold text-black transition-all duration-200 hover:underline"
             >
               Create a free account
             </em>
           </p>
           <form onSubmit={handleEmailLogin} className="mt-8">
             <div className="space-y-5">
               <div>
                 <label htmlFor="" className="text-base font-medium text-gray-900">
                   {' '}
                   Email address{' '}
                 </label>
                 <div>
                   <input
                     className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                     type="email"
                     placeholder="Email"
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                     required
                   ></input>
                 </div>
               </div>
               <div>
                 <div className="flex items-center justify-between">
                   <label htmlFor="" className="text-base font-medium text-gray-900">
                     {' '}
                     Password{' '}
                   </label>
                   <button type='button' onClick={handlePasswordReset} className="text-sm font-semibold text-black hover:underline">
                     {' '}
                     Forgot password?{' '}
                   </button>
                 </div>
                 <div>
                   <input
                     className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                     type="password"
                     placeholder="Password"
                     value={password}
                     onChange={(e)=> setPassword(e.target.value)}
                     required
                   ></input>
                 </div>
               </div>
               {error && <p>{error}</p>}
               <div>
                 <button
                   type="submit"
                   className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                 >
                   Get started <ArrowRight className="ml-2" size={16} />
                 </button>
               </div>
             </div>
           </form>
           <div className="mt-3 space-y-3">
             <button
             onClick={handleGoogleLogin}
               type="button"
               className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
             >
               <span className="mr-2 inline-block">
                 <img className='w-8 h-8 rounded-full' src="/media/images/Google.svg" alt="Google icon" />
               </span>
               Sign in with Google
             </button>
           </div>
         </div>
       </div>
     </section>
    :
      <Register toggleLogin={toggleLogin} setLogin={setLogin}/>
    }

    </>
  )
}

export default Login