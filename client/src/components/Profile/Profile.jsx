import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import useAuth from "../Auth/useAuth";
import { db } from "../../../firebaseConfig";
import UserProfile from "../Marginals/UserProfile";
import "../../styles/settings.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faPenToSquare, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Profile = () => {
  const { user, handlePasswordReset, logout } = useAuth();
  const [address, setAddress] = useState("N/A");
  const [gender, setGender] = useState("N/A");
  const [age, setAge] = useState("N/A");
  const [about, setAbout] = useState("N/A");
  const [email, setEmail] = useState("N/A");
  const [phone, setPhone] = useState("N/A");
  const [isEditing, setIsEditing] = useState(false);
  const [ageError, setAgeError] = useState("");
  
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    // Fetch user data from Firestore on component mount
    const fetchUserProfile = async () => {
      if (user && user.uid) {
        console.log("Fetching data for user:", user.uid);
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          console.log("User data from Firestore:", userDoc.data());
          const userData = userDoc.data();
          setOriginalData(userData);  // Save the original data for cancel functionality
          setAddress(userData.address || "Not provided");
          setGender(userData.gender || "Not provided");
          setAge(userData.age || "Not provided");
          setAbout(userData.about || "Not provided");
          setEmail(userData.email || "Not provided");
          setPhone(userData.phone || "Not provided")
        } else {
          console.log("No user data found in Firestore for this UID");
        }
      }
    };
    fetchUserProfile();
  }, [user]);

  const handleEdit = () => {
    setIsEditing((edit) => !edit);
  };

  const handleCancel = () => {
    // Reset form data to the original values
    setAddress(originalData.address || "Not provided");
    setGender(originalData.gender || "Not provided");
    setAge(originalData.age || "Not provided");
    setAbout(originalData.about || "Not provided");
    setPhone(originalData.phone || "Not provided");
    setIsEditing(false);
    setAgeError("");
  };

  // Update the age value with validation
  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setAge("");
      setAgeError("");
      return;
    }

    const ageNumber = Number(value);
    if (ageNumber >= 1 && ageNumber <= 180) {
      setAge(ageNumber);
      setAgeError("");
    } else {
      setAgeError("Age must be between 1 and 180");
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        address,
        gender,
        age,
        about,
        phone,
      }, { merge: true });
    }
  };

  const confirmPasswordReset = () => {
    const isConfirmed = window.confirm("Are you sure you want to reset your password?");
    if (isConfirmed) {
      console.log("reset email:",email);
      handlePasswordReset();
    }
  };

  return (
    <div className="profilePage p-4 h-screen flex flex-col sm:flex-row justify-center gap-4 items-center">
      {/* Profile Block 1 */}
      <div className="shadow-lg rounded-lg h-auto sm:h-96 w-full sm:w-1/2 leading-7">
        <div className="flex justify-center items-center">
          <UserProfile />
        </div>
        <div className="flex justify-between m-4">
          <div>
            <p>
              <strong>Email:</strong> {email}
            </p>
            {isEditing ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 px-2 py-1 border rounded ml-4"
                placeholder="Phone Number"
              />
            ) : (
              <p>
                <strong>Phone:</strong> {phone}
              </p>
            )}
            <p>
              <strong>Password: </strong>
              <button
                onClick={confirmPasswordReset}
                className="text-blue-600"
              >
                Reset Password
              </button>
            </p>
          </div>
          <div className="mt-16 sm:mt-0">
            <button onClick={logout} className="btn rounded-md ">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
            <span className="absolute -top-6 -right-2 bg-gray-700 text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Log Out
            </span>
          </div>
        </div>
      </div>
      {/* Profile Block 2 */}
      <div className="shadow-lg rounded-lg sm:h-96 w-full sm:w-1/2 leading-7">
        {isEditing ? (
          <>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-4 px-2 py-1 border rounded ml-4"
              placeholder="Address"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-2 px-2 py-1 border rounded ml-4"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="number"
              value={age}
              onChange={handleAgeChange}
              className="mt-2 px-2 py-1 border rounded ml-4"
              placeholder="Age"
            />
            {ageError && <p style={{ color: "red" }}>{ageError}</p>}
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="editAbout px-2 py-1 border rounded m-4 h-40"
              placeholder="About"
            />
            <button
              onClick={handleSave}
              className="btn m-4 rounded-md"
            >
              <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
            <button
              onClick={handleCancel}
              className="btn m-4 rounded-md"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <div className="m-4 flex justify-between">
              <div>
                <p className="mt-4">
                  <strong>Address:</strong> {address}
                </p>
                <p>
                  <strong>Gender:</strong> {gender}
                </p>
                <p>
                  <strong>Age:</strong> {age}
                </p>
              </div>
              <div className="right-0 mt-4 md:mt-0 relative">
                <button
                  onClick={handleEdit}
                  className="btn rounded-md"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />{" "}
                </button>
              </div>
            </div>
            <div className="p-4">
              <strong>About:</strong> {about}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
