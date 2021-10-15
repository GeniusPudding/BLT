import { useState, useEffect } from "react";
import Router from 'next/router'

export default function useLoginRoute(){
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        console.log('Login BLT to dashboard')
        if(isLogin ){
            Router.push('/dashboard')
        }
      },[isLogin]);

   return [showModal, setShowModal, setIsLogin]  
}
