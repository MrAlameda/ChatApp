
const uuid=require("uuid")

import Conversation from "../models/conversation.model"

export const getAllConversation=async(id:string)=>{
    const data=await Conversation.findAll({
        where:{
            userId:id
        }
    })
    return data
}

export const getConversationById=async(id:string)=>{
    const data = await Conversation.findOne({
            where:{
                id
            }
        })
    return data
}

export const createConversation=async(data:any,id:any)=>{
    const newConversation=await Conversation.create({
        id:uuid.v4(),
        title: data.title,
        image_url: data.image_url,
        userId: id
    })
    return newConversation
}


export const deleteConversation=async (id:string) => {
    const result=Conversation.destroy({
        where:{
            id
        }
    })
    return result
}

export const patchConversation=async (data:any,id:string) => {
    const result=await Conversation.update(data,{
        where:{
            id
        }
    })
    return result
}