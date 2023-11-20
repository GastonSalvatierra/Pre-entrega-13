import mongoose from 'mongoose';

const collectionName = 'messages';

const messageSchema = new mongoose.Schema({
    
    user: {type : String, required: true},
    message: {type : String, required: true}
    
});

const messageModel = mongoose.model(collectionName, messageSchema);

export default messageModel;