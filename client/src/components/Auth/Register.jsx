import React from 'react'
import useAuth from './useAuth'
import {ArrowRight} from 'lucide-react'

const Register = ({toggleLogin, setLogin}) => {

  const {
    email, setEmail,
    password, setPassword,
    fullName, setFullName,
    error,
    handleGoogleLogin,
    handleEmailRegister,
  } = useAuth();

  return (
    <>
    <section>
    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <div className="mb-2 flex justify-center">
        <img className='object-cover w-24 h-24 rounded' src="/media/images/dpc-logo.png" alt="brand logo" />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Already have an account?{' '}
          <em
            onClick={toggleLogin}
            className="font-medium text-black transition-all duration-200 hover:underline cursor-pointer"
          >
            Sign In
          </em>
        </p>
        <form onSubmit={handleEmailRegister} className="mt-8">
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="text-base font-medium text-gray-900">
                {' '}
                Full Name{' '}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Full Name"
                  id="name"
                  value={fullName}
                  onChange={(e)=> setFullName(e.target.value)}
                  required
                ></input>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="text-base font-medium text-gray-900">
                {' '}
                Email address{' '}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  required
                ></input>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-base font-medium text-gray-900">
                  {' '}
                  Password{' '}
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  required
                ></input>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
              >
                Create Account <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
          </div>
        </form>
        <div className="mt-3 space-y-3">
          <button
            type="button"
            onClick={()=>handleGoogleLogin(true)}
            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
          >
               <span className="mr-2 inline-block">
                 <img className='w-8 h-8 rounded-full' src="/media/images/Google.svg" alt="Google icon" />
               </span>
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  </section>
    </>
  )
}

export default Register