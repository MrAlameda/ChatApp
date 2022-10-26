import Participanst from "../models/participants.model"
import User from "../models/user.model"
const uuid = require("uuid")

export const getAllParticipants = async () => {
    const data = await Participanst.findAll()
    
    return data
}

export const getParticipantsById = async (id: string) => {
    const data = await Participanst.findOne({
        where: {
            id
        }
    })
    return data
}

export const getParticipantsByConversation = async (conversationId: string) => {
    const data = await Participanst.findAll({
        attributes:["id","userId"],
        include:{
            model:User,
            attributes:["firstName","id"]
        },
        where: {
            conversation_id: conversationId
        }
    })
    return data
}

export const createParticipants = async (data: any, id: any) => {
    await Participanst.create({
        id: uuid.v4(),
        conversationId: data,
        userId: id
    })
}


export const deleteParticipants = async (id: string) => {
    const result = Participanst.destroy({
        where: {
            id
        }
    })
    return result
}
