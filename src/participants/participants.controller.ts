import Participanst from "../models/participants.model"

const uuid=require("uuid")

export const getAllParticipants=async()=>{
    const data=await Participanst.findAll()
    return data
}

export const getParticipantsById=async(id:string)=>{
    const data = await Participanst.findOne({
            where:{
                id
            }
        })
    return data
}

export const createParticipants=async(data:any,id:any)=>{
    const newParticipants=await Participanst.create({
        id:uuid.v4(),
        conversationId: data.id,
        userId: id
    })
    return newParticipants
}


export const deleteParticipants=async (id:string) => {
    const result=Participanst.destroy({
        where:{
            id
        }
    })
    return result
}
