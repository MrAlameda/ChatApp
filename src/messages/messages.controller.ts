
const uuid=require("uuid")

import Message from "../models/message.model"
import User from "../models/user.model"

export const getAllMessage=async()=>{
    const data=await Message.findAll({
        attributes:["message","id"],
        include:{
            model:User,
            attributes:["id","firstName"]
        }
    })
    return data
}

export const getMessageById=async(id:string)=>{
    const data = await Message.findOne({
            where:{
                id
            }
        })
    return data
}

export const createMessage=async(data:any,user_id:string,conversation_id:string)=>{
    const newMessage=await Message.create({
        id:uuid.v4(),
        userId: user_id,
        conversationId: conversation_id,
        message: data.message
    })
    return newMessage
}


export const deleteMessage=async (id:string) => {
    const result= await Message.destroy({
        where:{
            id
        }
    })
    return result
}
