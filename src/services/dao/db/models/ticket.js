import mongoose from 'mongoose';

const collectionName = 'ticket';

const ticketSchema = new mongoose.Schema({
    
    code: {type : String },
    purchase_datatime: { type: Date, default: Date.now },
    amount: {type : Number },
    purchaser: {type : String }
    
});

const ticketModel = mongoose.model(collectionName, ticketSchema);

export default ticketModel;