import * as messageController from "./messages.controller"

import { Response, Request } from "express";

export const allMessage = (req: Request, res: Response) => {
    const id=req.params.conversation_id
    messageController.getAllMessage(id)
        .then((result: any) => {
            if (result[0]) {
                res.status(200).json(result)
            } else {
                res.status(200).json({ message: "sin mensajes" })
            }
        })
        .catch((err: Error) => {
            res.status(400).json({ message: "no hay nada", Error: err.message })
        })
}

export const messageById = (req: Request, res: Response) => {
    const id = req.params.message_id
    messageController.getMessageById(id)
        .then((result: any) => {
            res.status(200).json(result)
        })
        .catch((err: Error) => {
            res.status(400).json({ message: "Id not found", Error: err.message })
        })
}

export const messageAdd = (req: any, res: Response) => {
    const user_id = req.user.id
    const conversation_id = req.params.conversation_id
    const data=req.body
    if (
        data.message
    ) {
        messageController.createMessage(data, user_id,conversation_id)
            .then(async (result: any) => {
                res.status(200).json(result)
            })
            .catch((err: Error) => {
                console.error(err);
            })
    } else {
        res.status(400).json({
            message: "hiciste algo mal",
            checa: {
                message: 'string'
            }
        })
    }
}

export const messageDelet = (req: Request, res: Response) => {
    const id = req.params.message_id
    messageController.deleteMessage(id)
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

