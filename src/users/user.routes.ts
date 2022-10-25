import express from "express"
import * as userServises from "./user.services"
import * as conversationServices from "../conversation/conversation.services"

import passport from "passport"

import authMiddleware from "../middleware/auth.middleware";
import adminValidate from "../middleware/admin.medddleware";


authMiddleware(passport)

const router = express.Router()

router.get("/",
    passport.authenticate(
        "jwt", { session: false }
    ),
    userServises.allUsers)

router.get("/conversations",
    passport.authenticate(
        "jwt", { session: false }
    ),
    conversationServices.allConversation
)

router.get("/conversations/:id",
    passport.authenticate(
        "jwt", { session: false }
    ),
    conversationServices.conversationById
)

router.post("/conversations",
    passport.authenticate(
        "jwt", { session: false }
    ),
    conversationServices.conversationAdd
)

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


