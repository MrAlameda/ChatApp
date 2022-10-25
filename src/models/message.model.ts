import db from "../utils/db.config";
import Conversation from "./conversation.model";
import User from "./user.model";

const { DataTypes } = require("sequelize");

const Message=db.define("Message",{
        id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        },
        userId:{
            type:DataTypes.UUID,
            allowNull:false,
            field:"sender_id",
            reference:{
                key:"id",
                model:User
            }
        },
        conversationId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'conversation_id',
            references: {
                key: 'id',
                model: Conversation
            },
        },
        message:{
            type:DataTypes.STRING,
            allowNull:false
        }
});

export default Message