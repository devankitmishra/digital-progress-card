import React, {useState, useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import Header from './Marginals/Header'
import Footer from './Marginals/Footer'
import {Outlet, useNavigate} from 'react-router-dom'
import '../styles/index.css'
import Login from './Auth/Login'

function Layout() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
      setLoggedIn(!!user);
      setUser(user)
      if(user){
        navigate('/');
      }
    });
    return()=> unsubscribe();
  }, [navigate]);

  const setLogin= () =>{
    setLoggedIn((login)=>!login)
  }
  return (
    <>
    {loggedIn? (
    <>
    <div className='full-page'>
      <Header user={user}/>
      <Outlet/>
    </div>
      <Footer />
    </>
      ):(
      <Login setLogin={setLogin} />
    )}
    </>
  )
}

export default Layout