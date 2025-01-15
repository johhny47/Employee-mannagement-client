import axios from "axios";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import AuthContext from "./AuthContext";
import auth from "../firebase/firebase.config";
import { useEffect, useState } from "react";








const AuthProvider = ({children}) => {
 
  const googleProvider = new GoogleAuthProvider()
  const [user,setUser] = useState(null)

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
     useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
       
            if(currentUser?.email){
              setUser(currentUser)
              const user={email:currentUser.email}
              axios.post(`${import.meta.env.VITE_API_URL}/jwt`,user,{
                withCredentials:true
              })
            }
            else{
              axios.post(`${import.meta.env.VITE_API_URL}/logout`,{},{
                withCredentials:true
              })
              .then(res=>console.log('logout',res.data))
              setUser(null)
            }
          return ()=>{
              unsubscribe 
          }
      })
    },[])
         

  const authInfo={
    handleRegister,
    handleLogin,
    mannageProfile,
    handleLogout,
    user,
    handleGoogleLogin
    }
    return (
        <AuthContext.Provider value={authInfo}>
           {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;