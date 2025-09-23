import React from 'react'
import Statistics from './Statistics'
import RewardProgress from './RewardProgress'

const Dashboard = () => {
  return (
    <>
    <div className='stats grid sm:grid-cols-3 gap-2 place-items-center'>
    <Statistics />
    <RewardProgress />
    </div>
    <form className='progress-form sm:w-max w-4/5 rounded p-3 shadow-inner' action="/" method="post">
        <input autoComplete='off' type="text" name="prod-input" id="prod-input" placeholder='Total work done today'/>
        <button type="submit">Submit</button>
    </form>
    </>
  )
}

export default Dashboard