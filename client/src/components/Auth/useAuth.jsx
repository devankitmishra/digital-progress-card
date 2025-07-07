import { useState, useEffect } from 'react';
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    sendPasswordResetEmail, 
    signOut, 
    sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../../../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const googleProvider = new GoogleAuthProvider();

// Monitor Auth State Changes
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if(currentUser){
          console.log("curr user:",currentUser)
            setUser(currentUser);
            saveUserData(currentUser);
            setEmail(currentUser.email);
            setPhone(currentUser.phoneNumber);
            setFullName(currentUser.displayName);
        }
    });
    return () => unsubscribe(); // Cleanup on unmount
    }, []);

//   Saving User Data 
  const saveUserData = async (user) => {
    console.log("Saving user data for:",user.uid);
    try {
      const profilePic = user.photoURL || "/media/images/user-profile.png";
      const existingUserDoc = await getDoc(doc(db, "users", user.uid));
      const existingData = existingUserDoc.exists() ? existingUserDoc.data() : {};

      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName || fullName,
        email: user.email,
        uid: user.uid,
        profilePic:profilePic,
        phone: existingData.phone || user.phoneNumber || "Not Provided",
      },{ merge:true });
      console.log("User data saved successfully");

    } catch (err) {
      console.error("Error saving user data:", err);
    }
  };

//   Handles Google Login 
  const handleGoogleLogin = async (isRegistering) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;
      console.log(isRegistering ? 'Account created with Google!' : 'Signed in with Google!');
      saveUserData(loggedInUser);
    } catch (err) {
      setError(err.message);
      alert('Oops! Something went wrong!');
    }
  };
//   Handles Email Login 
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;
      if (!loggedInUser.emailVerified) { // Check if email is verified
        alert('Please verify your email before logging in.');
        await signOut(auth); // Sign out to prevent unverified login
        return;
      }
      saveUserData(loggedInUser);
    } catch (err) {
      setError(err.message);
      alert('Invalid access!');
    }
  };
//   Handles Email Registration 
const handleEmailRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      
      await updateProfile(newUser, {
        displayName: fullName,
      });
      
      await sendEmailVerification(newUser);
      alert('Account created! A verification email has been sent. Please verify before logging in.');
      await signOut(auth);
      saveUserData(newUser);
    } catch (err) {
      console.log(err.message)
      setError(err.message);
      alert('Oops! Something went wrong!');
    }
  };
//   Handles Password Reset 
  const handlePasswordReset = async () => {
    console.log("reset email attempt from useAuth:", user?.email);
    const resetEmail = user?.email || email;
    console.log("useauth reset email:",resetEmail);
    if (!resetEmail) {
      alert('Please enter your email first!');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert('Password reset email sent! Check your inbox!');
    } catch (err) {
      setError(err.message);
      alert('Oops! Something went wrong!');
    }
  };

  // Handles logout function
  const logout = async () => {
    const isConfirmed = window.confirm("Are you sure you want to logout?");
    if(isConfirmed){
        try {
          await signOut(auth);
          alert("You have successfully logged out.");
        } catch (err) {
          console.error("Logout error: ", err.message);
          alert("An error occurred while logging out.");
        }
    }
  };

  return {
    user,
    phone, setPhone,
    email, setEmail,
    password, setPassword,
    fullName, setFullName,
    error, setError,
    handleGoogleLogin,
    handleEmailLogin,
    handleEmailRegister,
    handlePasswordReset,
    logout,
  };
};

export default useAuth;
