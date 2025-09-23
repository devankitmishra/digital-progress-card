import React from 'react'
import { Link } from 'react-router-dom'

const Statistics = () => {
  return (
    <div className='place-holder-stat sm:col-span-2 sm:w-4/5 w-11/12 grid place-items-center'>
      <div className='select-none grid place-items-center text-center'>
      <Link to="/create-task">
        <div className="add-tsk rounded-full grid place-items-center text-3xl">+</div>
        </Link>
        Enter tasks to access
        </div>
        <select defaultValue={"weekly"} className='filter' name="filter" id="sort">
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
    </div>
  )
}

export default Statistics