import db from "../utils/db.config";
import User from "./user.model";

const { DataTypes } = require("sequelize");

const Conversation = db.define("conversation", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "created_by",
        reference: {
            key: "id",
            model: User
        }
    }
});

export default Conversation