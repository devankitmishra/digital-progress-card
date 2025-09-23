import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/createTask.css";
import { createTask } from "../../services/api";
import useAuth from "../Auth/useAuth";

function CreateTask() {
  const {user} =useAuth();
  const [taskName, setTaskName] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("select");
  const [rewards, setRewards] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTaskSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      userId:user.uid,
      name: taskName,
      target: target,
      unit: unit,
      rewards: rewards,
    };
    console.log(taskData)
    console.log("userId:", taskData.userId,"name:", taskData.name,"target:", taskData.target,"unit:", taskData.unit,"rewards:", taskData.rewards);
    try {
      const response = await createTask(taskData);
      console.log("Task created:", response);
      navigate('/');
    } catch (err) {
      setError("Failed to create task");
      console.error("Error creating task:", err);
    }
  };

  const addReward = () => {
    setRewards([...rewards, { unit: "select", name: "" }]);
  };

  const handleRewardChange = (index, field, value) => {
    const updatedRewards = [...rewards];
    updatedRewards[index][field] = value;
    setRewards(updatedRewards);
  };

  const handleTargetChange = (e) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(value) && Number(value) >= 1)) {
      setTarget(value);
    }
  };

  return (
    <div className="create-task-wrapper">
    <div className="container shadow-lg rounded-lg">
      <div className="main-section">
        <div className="section-label">
          <h3>Create Task</h3>
        </div>
      <form onSubmit={handleTaskSubmit}>
      <div className="task-input-name">
          <label htmlFor="task-name">Task</label>
          <input 
          type="text" 
          id="task-name" 
          placeholder="Task Name" 
          value={taskName}
          onChange={(e)=> setTaskName(e.target.value)}
          required />
        </div>

        <div className="task-input-field">
          <div className="target-input">
            <label htmlFor="task-target">Target</label>
            <input
              type="number"
              id="task-target"
              placeholder="Like 1,2,3..."
              value={target}
              onChange={handleTargetChange}
              required
            />
          </div>
          <div className="unit-input">
            <label htmlFor="task-unit">Unit</label>
            <select 
            id="task-unit" 
            name="task-unit" 
            value={unit}
            onChange={(e)=>setUnit(e.target.value)}
            required>
              <option value="select">Select</option>
              <option value="kg">Kilogram (kg)</option>
              <option value="g">Gram (g)</option>
              <option value="lb">Pound (lb)</option>
              <option value="hr">Hour (hr)</option>
              <option value="time">time</option>
              <option value="min">Minutes (min)</option>
            </select>
          </div>
          <button className="btn add-reward-btn rounded-md" type="button" onClick={addReward}>
            Add Reward
          </button>
        </div>
        <div id="reward-container">
          {rewards.map((reward, index) => (
            <div className="reward-input-field" key={index}>
              <select
                value={reward.unit}
                onChange={(e) => handleRewardChange(index, 'unit', e.target.value)}
                name="task-unit"
              >
                <option value="select">Select</option>
                <option value="10%">10%</option>
                <option value="20%">20%</option>
                <option value="30%">30%</option>
                <option value="40%">40%</option>
                <option value="50%">50%</option>
                <option value="60%">60%</option>
                <option value="70%">70%</option>
                <option value="80%">80%</option>
                <option value="90%">90%</option>
                <option value="100%">100%</option>
              </select>
              <input
                type="text"
                placeholder="Reward Name"
                value={reward.name}
                onChange={(e) => handleRewardChange(index, 'name', e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* <div className="additional-input">
          <textarea className="comment-input" placeholder="Enter your comment"></textarea>
          <input type="file" className="image-input" accept="image/*" />
        </div> */}
        <div className="task-btn-wrapper flex flex-row justify-evenly m-auto gap-4">
            <button className="btn cancel-task-btn rounded-md" type="button" onClick={()=> navigate('/')}>Cancel</button>
            <button className="btn create-task-btn rounded-md" type="submit">Create Task</button>
        </div>
      </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
    </div>
  );
}

export default CreateTask;
