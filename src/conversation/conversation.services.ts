import { Response, Request } from "express";
import * as conversationController from "./conversation.controller"
import { createParticipants, getAllParticipants,getParticipantsByConversation } from "../participants/participants.controller";

export const allConversation = (req: any, res: Response) => {
    const id =req.user.id
    conversationController.getAllConversation(id)
        .then((result: any) => {
            if (result[0]) {
                res.status(200).json(result)
            } else {
                res.status(200).json({ message: "sin conversaciones" })
            }
        })
        .catch((err: Error) => {
            res.status(400).json({ message: "no hay nada", Error: err.message })
        })
}

export const allParticipants = (req: Request, res: Response) => {
    getAllParticipants()
        .then(result => {
            if (result[0]) {
                res.status(200).json(result)
            } else {
                res.status(200).json({ message: "sin conversaciones" })
            }
        })
        .catch((err: Error) => {
            res.status(400).json({ message: "no hay nada", Error: err.message })
        })
}

export const porticipantsByIdConversation=(req:Request,res:Response)=>{
    const id =req.params.conversation_id
    getParticipantsByConversation(id)
    .then(result => {
        if (result[0]) {
            res.status(200).json(result)
        } else {
            res.status(200).json({ message: "sin participantes" })
        }
    })
    .catch((err: Error) => {
        res.status(400).json({ message: "no hay nada", Error: err.message })
    })
}

export const conversationById = (req: Request, res: Response) => {
    const id = req.params.conversation_id
    conversationController.getConversationById(id)
        .then((result: any) => {
            res.status(200).json(result)
        })
        .catch((err: Error) => {
            res.status(400).json({ message: "Id not found", Error: err.message })
        })
}

export const conversationAdd = (req: any, res: Response) => {
    const id = req.user.id
    const data = req.body
    console.log(data)
    if (
        data.title
        && data.image_url
    ) {
        conversationController.createConversation(data, id)
            .then(async (result: any) => {
                await createParticipants(result.id, data.anotherUser)
                await createParticipants(result.id, id)
                res.status(200).json(result)
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
                anotherUser: 'string'
            }
        })
    }
}

export const conversationDelet = (req: Request, res: Response) => {
    const id = req.params.conversation_id
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

export const conversationPatch=(req:Request,res:Response)=>{
    const id =req.params.conversation_id
    const {title,image_url}=req.body
    conversationController.patchConversation({title,image_url},id)
        .then((result)=>{
            res.status(202).json({message:`se modifico con exito`,
        result})
        })
        .catch((err:Error)=>{
            res.status(404).json({message:err.message})
        })
    
}