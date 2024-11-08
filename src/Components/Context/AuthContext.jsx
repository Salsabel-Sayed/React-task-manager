import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';

export const authConText = createContext();

function AuthConTextProvider({children}) {
    let [token,setToken]= useState(null) ; 
    let [decodId,setDecodeId]= useState(null) ; 

    useEffect(()=>{
        // console.log('refresh');
        const val = localStorage.getItem("token")
        if(val != null){
          setToken(val);
          decodeToken()
     
  
        }
      },[])

      function decodeToken(){
        const userDecode = jwtDecode(localStorage.getItem("token"))
        console.log("user decode",userDecode);
        setDecodeId(userDecode)

      }





  return (
    <authConText.Provider value={{myToken: token, setToken, decodId,decodeToken}}>
      {children}
    </authConText.Provider>
  )
}

export default AuthConTextProvider
