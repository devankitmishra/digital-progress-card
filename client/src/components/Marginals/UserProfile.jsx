import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import useAuth from '../Auth/useAuth';

const UserProfile = (props) => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState("FirstName LastName");
  const [profilePic, setProfilePic] = useState("/media/images/user-profile.png");

  useEffect(() => {
    const fetchUserName = async () => {
      if (user && user.uid) {
        try {
          console.log("Fetching data for user:", user.uid);
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("Fetched user data:", userData);  // Log actual data
            setFullName(userData.name || "FirstName LastName");
            setProfilePic(userData.profilePic || "/media/images/user-profile.png");
          } else {
            console.log("No document found for this user.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("User is undefined or has no UID");
      }
    };

    if (user) fetchUserName();
  }, [user]);

  return (
    <div className='user-profile p-4 my-5'>
      <div className='grid w-max place-items-center'>
        <NavLink className={"profile-pic-wrap rounded"} to="/profile" onClick={props.toggleSidebar}> 
          <img 
          className='profile-pic rounded-full' 
          src={profilePic} 
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.target.src = "/media/images/user-profile.png"; // Fallback image
          }}
          alt="user profile" />
        </NavLink>

        <NavLink to="/profile" onClick={props.toggleSidebar}>
          <h3 className='text-center hover:underline'>{fullName}</h3>
        </NavLink>
      </div>
    </div>
  );
}

export default UserProfile;
