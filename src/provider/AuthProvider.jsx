import axios from "axios";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import AuthContext from "./AuthContext";
import auth from "../firebase/firebase.config";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);


 const handleGoogleLogin =()=>{
     
    return signInWithPopup(auth, googleProvider)
    
  }
const handleRegister =(email,password)=>
  {
    return createUserWithEmailAndPassword(auth,email,password)
   
  }        
  const handleLogin = (email,passward)=>{
    return signInWithEmailAndPassword(auth,email,passward)
  }
  const mannageProfile =(name,image)=>{
           
    return updateProfile(auth.currentUser,{
        displayName:name,photoURL:image
       
    } 
  )
  
  }
  const handleLogout=()=>{
    signOut(auth)
   }

  // Check if user is fired
  const checkIfUserFired = async (userEmail) => {
    try {
      const { data } = await axios.get('http://localhost:5000/firedUser');
      return data.some(employee => employee.email === userEmail);
    } catch (error) {
      console.error('Error fetching fired users:', error);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Check if the user has been fired first
          const isFired = await checkIfUserFired(currentUser.email);
          
          if (isFired) {
            
            console.log('User logged out due to being fired.');
            await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true });
            setUser(null); 
          } else {
            setUser(currentUser);
            await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email: currentUser.email }, { withCredentials: true });
          }
        } catch (error) {
          console.error('Error checking user status or logging in:', error);
          setUser(null);
        }
      } else {
      
        try {
          await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true });
          console.log('User logged out.');
          setUser(null);
        } catch (error) {
          console.error('Error logging out:', error);
        }
      }
    });
  
   
    return () => unsubscribe();
  }, []);
  

  const authInfo = {
    handleRegister,
    handleLogin,
    mannageProfile,
    handleLogout,
    user,
    handleGoogleLogin,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
