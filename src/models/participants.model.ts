import db from "../utils/db.config";
import Conversation from "./conversation.model";
import User from "./user.model";

const { DataTypes } = require("sequelize");

const Participanst=db.define("participans",{
        id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        },
        conversationId:{
            type:DataTypes.UUID,
            allowNull:false,
            field:"conversation_id",
            reference:{
                key:"id",
                model:Conversation
            }
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'user_id',
            references: {
                key: 'id',
                model: User
            },
        }
});

export default Participanst