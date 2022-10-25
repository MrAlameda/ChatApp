import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken"
import loginUser from "./auth.controller";
import configure from "../config";

const uselogin=(req:Request,res:Response,next:NextFunction)=>{
    const {email,password}=req.body

    if(email&&password){
        loginUser(email,password)
            .then((result:any)=>{
                if(result){
                    const token=jwt.sign({
                        id:result.id,
                        email:result.email,
                        role:result.role
                    },
                    configure.JWTsecret as string
                    // "queso"
                    )
                    res.status(200).json({
                        message:"correct credential",
                        token
                    })
                    // res.status(200).redirect("/users/")
                }else{
                    res.status(401).json({messsage:"Invalid credentials"})
                }
            })
            .catch((err:Error)=>{res.status(400).json({message:err.message})})
    }else{
        res.status(400).json({message:"missing data"})
    }
}

export default uselogin