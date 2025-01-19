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

   const checkIfUserFired = async (userEmail) => {
    const { data } = await axios.get('http://localhost:5000/firedUser');
    return data.some(employee => employee.email === userEmail);
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
          // Proceed with issuing the JWT
          await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email: currentUser.email }, { withCredentials: true }).catch(() => {});
        const isFired = await checkIfUserFired(currentUser.email).catch(() => false); // Ignore errors here
        
        if (isFired) {
          console.log('User logged out due to being fired.');
          await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true }).catch(() => {});
          setUser(null);
          handleLogout();
         
        } else {
          setUser(currentUser);
          // Proceed with issuing the JWT
          await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email: currentUser.email }, { withCredentials: true }).catch(() => {});
        }
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true }).catch(() => {});
        console.log('User logged out.');
        setUser(null);
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
