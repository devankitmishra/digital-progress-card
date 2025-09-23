import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import Layout from './components/Layout'
import Login from './components/Auth/Login'
import Dashboard from './components/Dashboard/Dashboard'
import TaskPage from './components/Tasks/TaskPage'
import CreateTask from './components/Tasks/CreateTask'
import InvalidPage from './components/InvalidPage'
import Profile from './components/Profile/Profile'
import Settings from './components/Settings/Settings'
import Account from './components/Settings/Account'
import Personalize from './components/Settings/Personalize'
import Rewards from './components/Tasks/Rewards'
import ContactPage from './components/Contact/ContactPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Dashboard />}/>
      <Route path='login' element={<Login />}/>
      <Route path='task' element={<TaskPage />}/>
      <Route path='create-task' element={<CreateTask />}/>
      <Route path='rewards' element={<Rewards />}/>
      <Route path='profile' element={<Profile />}/>
      <Route path='contact-us' element={<ContactPage />}/>
      <Route path='settings' element={<Settings />}/>
      <Route path='settings/account' element={<Account />}/>
      <Route path='settings/personalize' element={<Personalize />}/>
      <Route path='*' element={<InvalidPage />}/>
    </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
