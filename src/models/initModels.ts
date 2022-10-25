import Conversation from "./conversation.model"
import Message from "./message.model"
import User from "./user.model"
import Participanst from "./participants.model"

const initModel=()=>{
    User.hasMany(Conversation,{foreiKey:"conversation_Id"})
    User.hasMany(Message,{foreiKey:"message_id"})
    
    Conversation.belongsTo(User) /* foreiKey*/
    Conversation.hasMany(Participanst)
    Conversation.hasMany(Message)
    
    Participanst.belongsTo(User)

    Message.belongsTo(User) /* foreiKey*/
    Message.belongsTo(Conversation) /* foreiKey*/
}

export default initModel