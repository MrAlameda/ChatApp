import { Response, Request } from "express";
import * as conversationController from "./conversation.controller"
import { createParticipants } from "../participants/participants.controller";

export const allConversation = (req: Request, res: Response) => {
    conversationController.getAllConversation()
        .then((result: any) => {
            if(result[0]){
                res.status(200).json(result)
            }else{
                res.status(200).json({message:"sin conversaciones"})
            }
        }) 
        .catch((err: Error) => {
            res.status(400).json({ message: "no hay nada", Error: err.message })
        })
}

export const conversationById = (req: Request, res: Response) => {
    const id = req.params.id
    conversationController.getConversationById(id)
        .then((result: any) => {
            res.status(200).json(result)
        })
        .catch((err: Error) => {
            res.status(400).json({ message: "Id not found", Error: err.message })
        })
}

export const conversationAdd =(req: any, res: Response) => {
    const id = req.user.id
    const data = req.body
    console.log(data)
    if (
        data.title
        && data.image_url
    ) {
        conversationController.createConversation(data, id)
            .then(async(result: any) => {
                console.log(result.id,id,data.anotherUser)
                await createParticipants(result.id,data.anotherUser)
                await createParticipants(result.id,id)
                res.status(200).json(result.id)
            })
            .catch((err: Error) => {
                console.error(err);
            })
    } else {
        res.status(400).json({
            message: "hiciste algo mal",
            checa: {
                title: 'string',
                imageId: 'string',
                anotherUser:'string'
            }
        })
    }
}



export const userDelet = (req: Request, res: Response) => {
    const id = req.params.id
    conversationController.deleteConversation(id)
        .then((data: any) => {
            if (data) {
                res.status(204).json(data)
            } else {
                res.status(404).json({ message: "invalid Id" })
            }
        })
        .catch((err: Error) => {
            res.status(400).json({ message: err.message })
        })
}

