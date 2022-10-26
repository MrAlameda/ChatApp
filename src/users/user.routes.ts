import express from "express"
import * as userServises from "./user.services"
import * as conversationServices from "../conversation/conversation.services"
import * as messageServices from "../messages/messages.services"

import passport from "passport"

import authMiddleware from "../middleware/auth.middleware";
import adminValidate from "../middleware/admin.medddleware";


authMiddleware(passport)

const router = express.Router()

// ! home

router.get("/",
    passport.authenticate(
        "jwt", { session: false }
    ),
    userServises.allUsers)



// ! ONE CONVERSATION

router.route("/conversations")
    .get(passport.authenticate(
        "jwt", { session: false }
    ),
        conversationServices.allConversation
    )
    .post(passport.authenticate(
        "jwt", { session: false }
    ),
        conversationServices.conversationAdd
    )

router.route("/conversations/:conversation_id")
    .get(passport.authenticate(
        "jwt", { session: false }
    ),
        conversationServices.conversationById
    )
    .delete(passport.authenticate(
        "jwt", { session: false }
    ),
        conversationServices.conversationDelet
    )
    .patch(passport.authenticate(
        "jwt", { session: false }
    ),
        conversationServices.conversationPatch
    )

// ! messages

router.route("/conversations/:conversation_id/message")
    .get(passport.authenticate(
        "jwt", { session: false }
    ),
        messageServices.allMessage
    )
    .post(passport.authenticate(
        "jwt", { session: false }
    ),
        messageServices.messageAdd
    )

router.route("/conversations/:conversation_id/message/:message_id")
    .get(passport.authenticate(
        "jwt", { session: false }
    ),
        messageServices.messageById
    )
    .delete(passport.authenticate(
        "jwt", { session: false }
    ),
        messageServices.messageDelet
    )

//! participants

router.get("/conversations/:conversation_id/participants",
    passport.authenticate(
        "jwt", { session: false }
    ),
    conversationServices.porticipantsByIdConversation
)

// ? MY INFO

router.route("/me")
    .get(
        passport.authenticate("jwt", { session: false }),
        userServises.getMyUser)
    .delete(
        passport.authenticate("jwt", { session: false }),
        userServises.deleteMyUser)
    .patch(
        passport.authenticate("jwt", { session: false }),
        userServises.updateMyUser
    )

// ? GET USERS

router.route("/:id")
    .get(userServises.userById)
    .patch(
        passport.authenticate("jwt", { session: false }),
        adminValidate,
        userServises.userPatch)
    .delete(
        passport.authenticate("jwt", { session: false }),
        adminValidate,
        userServises.userDelet)

export default router


