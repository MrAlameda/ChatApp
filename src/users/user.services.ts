import { Response,Request } from "express";
import { UserInfo } from "../model";
import * as userController from "./user.controller"

export const allUsers=(req:Request,res:Response)=>{
    userController.getAllUser()
        .then((result:any)=>{
            res.status(200).json(result)
        })
        .catch((err:Error)=>{
            res.status(400).json({Error:err.message})
        })
}

export const userById=(req:Request,res:Response)=>{
    const id =req.params.id
    userController.getUserById(id)
        .then((result:any)=>{
            res.status(200).json(result)
        })
        .catch((err:Error)=>{
            res.status(400).json({message:"Id not found",Error:err.message})
        })
}

export const userAdd=(req:Request,res:Response)=>{
    const data:UserInfo=req.body
    console.log(data)
    if(
           data.phone
        && data.birthday
        && data.country
        && data.email
        && data.firstName
        && data.gender
        && data.lastName
        && data.password
        ){
            userController.createUser(data)
            .then((result:any)=>{
                res.status(200).json(result)
            })
            .catch((err:Error)=>{
                console.error(err);
            })
        }else{
            res.status(400).json({
                message:"hiciste algo mal",
                checa:{
                    firstName: 'string',
                    lastName: 'string',
                    email: 'example@example.com',
                    password: 'string',
                    phone: '+521231231231',
                    birthday: 'YYYY/MM/DD'
                }
            })
        }
}


export const userPatch=(req:Request,res:Response)=>{
    const id=req.params.id
    const data:Exclude<UserInfo,"id"|"email"|"birthday"|"password">=req.body

    userController.updateUser(id,data)
        .then((data:any)=>{
            if (data[0]) {
                res.status(200).json({message:`User with id:${id} has ben modify`})
            } else {
                res.status(404).json({message:"Invalid Id"})
            }
        })
        .catch((err:Error)=>{
            res.status(400).json({message:err.message})
        })
}

export const userDelet=(req:Request,res:Response)=>{
    const id = req.params.id
    userController.deleteUser(id)
    .then((data:any)=>{
        if(data){
            res.status(204).json(data)
        }else{
            res.status(404).json({message:"invalid Id"})
        }
    })
    .catch((err:Error)=>{
        res.status(400).json({message:err.message})
    })
}

export const getMyUser=(req:any,res:Response)=>{
    const id = req.user.id
    
    userController.getUserById(id)
        .then((result:any)=>{
            res.status(200).json(result)
        })
        .catch((err:Error)=>{
            console.error(err)
        })   
}

export const deleteMyUser=(req:any,res:Response)=>{
    const id=req.user.id
    userController.updateUser(id,{status:`inactive`})
        .then((result)=>{
            res.status(204).json(result)
        })
        .catch((err:Error)=>{
            res.status(400).json({message:err.message})
        })
}

export const updateMyUser=(req:any,res:Response)=>{
    const id=req.user.id
    const {firstName,lastName,phone,birthday,gender,country}=req.body
    userController.updateUser(id,{firstName,lastName,phone,birthday,gender,country})
        .then(()=>{
            res.status(202).json({message:`successful modification`})
        })
        .catch((err:Error)=>{
            res.status(404).json({message:err.message})
        })
}
