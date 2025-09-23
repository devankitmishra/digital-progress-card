import React from 'react'

const InvalidPage = () => {
  return (
    <div className='invalid-page grid place-items-center'>
        <h1 className='text-center p-4'>Oops! <br />Invalid Address</h1>
        <a className='rounded' href="/">Go Back</a>
    </div>
  )
}

export default InvalidPage