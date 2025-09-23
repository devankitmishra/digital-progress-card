import React from 'react'

const RewardProgress = () => {
  return (
    <>
    <div className='rewardProg sm:w-1/2 w-4/5 px-5 rounded-xl shadow-xl'>
    <div className='reward py-5 px-1'>
        <div className='reward-check'>
        </div>
        <h1 className='select-none'>Reward 1</h1>
    </div>
    <div className='reward py-5 px-1'>
        <div className='reward-check'>
        </div>
        <h1 className='select-none'>Reward 2</h1>
    </div>
    <div className='reward py-5 px-1'>
        <div className='reward-check'>
        </div>
        <h1 className='select-none'>Reward 3</h1>
    </div>
    <div className='reward py-5 px-1'>
        <div className='reward-check'>
        </div>
        <h1 className='select-none'>Reward 4</h1>
    </div>
    <a className='select-none m-1 underline' href="#">more...</a>
    </div>
    </>
  )
}

export default RewardProgress