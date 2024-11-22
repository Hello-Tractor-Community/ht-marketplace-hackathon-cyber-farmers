"use client";

import { useEffect, useState } from "react"
import Wangari from "./assets/wangari_image.jpg"
import { FaUserCircle } from "react-icons/fa"

//for displaying the user details at the top of the main screen
export function ProfileDisplay({userName,img}: {userName: string,img:string}){
    const [userNameState,setUserNameState] = useState("Login")
    const [imageState,setImageState] = useState(Wangari)
    
    useEffect(function(){
        if(userName != ""){
            setUserNameState(userName)
        }
        if(img != ""){
            setImageState(Wangari)
        }
    },[userName])
    
    return(
        <div className="w-auto flex gap-2 items-center justify-self-end">
            <div className="text-sm font-bold">{userNameState}</div>
            <div className="flex h-full items-center w-10 object-cover object-center">
                <FaUserCircle className="text-3xl text-blue-600"/>    
            </div>
        </div>
    )
}