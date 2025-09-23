import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Settings from "./Settings";
import { NavLink } from "react-router-dom";
import { ArrowBigLeftDash } from "lucide-react";

const Account = () => {
  // Initial email and phone number
  const initialEmail = "username@gmail.com";
  const initialProfileImage = "../../media/images/user-profile.png";

  // State variables for email, phone number, password, theme, mode, and OTP
  const [email, setEmail] = useState(initialEmail);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [theme, setTheme] = useState("default");
  const [mode, setMode] = useState("light");
  const [newEmail, setNewEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [editEmail, setEditEmail] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(initialProfileImage);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const fileInputRef = useRef(null);

  // Function to handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  // Function to trigger file input click
  const handleEditImage = () => {
    fileInputRef.current.click();
  };

  // Function to handle saving the selected image
  const handleSaveImage = () => {
    if (selectedFile) {
      // Code to save the image, e.g., upload to the server
      console.log("Image saved:", selectedFile);
      setSelectedFile(null); // Reset selected file after saving
    } else {
      // Code to show error message if no file is selected
      console.error("No file selected to save.");
    }
  };

  // Function to handle saving new email and sending OTP
  const handleSaveEmail = () => {
    // Code to send OTP to the new email address
    // Assuming otp is received after sending request
    const generatedEmailOtp = "123456"; // This should be generated dynamically
    setEmailOtp(generatedEmailOtp);
  };

  // Function to handle submitting email OTP and changing email
  const handleChangeEmail = () => {
    // Verify email OTP
    if (emailOtp === "123456") {
      // Replace '1234' with the actual OTP received
      setEmail(newEmail);
      setNewEmail("");
      setEmailOtp("");
      setEditEmail(false);
      // Code to show success message
    } else {
      // Code to show error message for invalid OTP
    }
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };

  const handleSavePassword = () => {
    // Here you can add logic to save the new password to the backend
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    setOldPassword(""); // Reset the old password field after saving
    setNewPassword(""); // Reset the new password field after saving
    setIsChangingPassword(false); // Close the password change input fields
  };

  const handleDeleteAccount = () => {
    // Code to handle account deletion
    console.log("Account deleted.");
    // Add logic to delete account from backend
  };

  return (
    <div className="flex h-screen">
      <div className="hidden sm:block w-auto">
        <Settings />
      </div>

      <div className="m-auto p-4 sm:w-3/4 ac-settings">
        <h1 className="text-2xl font-bold mb-4">Account</h1>
        <div>
          {/*----------------------Profile Image-------------------------*/}
          {/* <div className="flex-1 flex flex-col items-center gap-4 m-auto mb-4 ">
          <img
          src={profileImage}
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover "
            />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            style={{ zIndex: -1 }}
            />
            <div className="flex gap-4">
            <button
              className="bottom-0 rounded-md btn"
              onClick={handleEditImage}
            >
              Change Profile
            </button>
            <button
              className="bottom-0 btn rounded-md"
              onClick={handleSaveImage}
            >
              Save
            </button>
          </div>
        </div> */}
          {/* -------------------here---------------- */}
          <div className="item-center flex-1">
            {/* Change Email */}
            <div className="mb-4">
              {!editEmail ? (
                <div className="flex gap-4 items-center">
                  <p className="">
                    <strong>Email:</strong> {email}
                  </p>
                  <button
                    className="text-blue-500"
                    onClick={() => setEditEmail(true)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <button
                      className="btn rounded-md w-1/3"
                      onClick={handleSaveEmail}
                    >
                      Send OTP
                    </button>

                    <input
                      type="text"
                      className="border p-4 rounded-md w-2/3"
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value)}
                      placeholder="Enter OTP Sent to Old Email"
                    />
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="email"
                      className="border p-4 rounded-md w-2/3"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="Enter New Email"
                      autoComplete="off"
                      required
                    />
                    <button
                      className="btn rounded-md w-1/3"
                      onClick={handleChangeEmail}
                    >
                      Change Email
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Change Password */}
            {isChangingPassword ? (
              <>
                <div className="flex flex-col sm:flex-row gap-4 ">
                  <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                    className="border p-4 rounded-md"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    className="border p-4 rounded-md"
                  />
                  <button
                    onClick={handleSavePassword}
                    className="btn rounded-md "
                  >
                    Save Password
                  </button>
                </div>
              </>
            ) : (
              <div className="">
                <strong>Password: </strong>
                <button
                  onClick={handleChangePassword}
                  className="blue-btn"
                >
                  Change Password
                </button>
              </div>
            )}

            {/* Delete Account */}
            <div className="mt-8">
              <h3 className="mt-4">
                <strong>Delete Account</strong>
              </h3>
              <p className="mt-4">
                If you delete your account, your personal information will be
                wiped from DPC's servers, all of your tasks and reward-histories
                will be deleted. This action cannot be undone!
              </p>
              <button
                className="btn bg-red-600 rounded-md mt-4"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Account
              </button>
              {showDeleteConfirm && (
                <div className="mt-4 p-4 border border-red-600 rounded-md  ">
                  <p>
                    Are you sure you want to delete your account? This action
                    cannot be undone.
                  </p>
                  <div className="flex gap-4 mt-4">
                    <button
                      className="btn bg-red-600 rounded-md"
                      onClick={handleDeleteAccount}
                    >
                      Confirm Delete
                    </button>
                    <button
                      className="btn bg-gray-600 text-white rounded-md"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <NavLink
          to="/settings"
          className="sm:hidden flex w-32 mt-2 rounded-md  px-3 py-2 text-gray-600"
        >
          <h2 className="text-xl font-semibold">Go Back</h2>
          
        </NavLink>
      </div>
      
    </div>
  );
};

export default Account;
