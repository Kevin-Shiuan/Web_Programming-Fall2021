// import mongoose from 'mongoose';
import Card from "../../models/ScoreCard.js";

const createCard = async (name, subject, score) => {
    // const existing = await Card.findOne({ name });
    // if (existing) throw new Error(`data ${name} exists!!`); 
    try {
        const newCard = new Card({ name, subject, score });
        console.log("Created card", newCard);
        return newCard.save();
    } 
    catch (e) {console.log("Card creation error: " + e); }
};

const deleteCard = async () => {
    try {
        await Card.deleteMany({});
        console.log("Database deleted");
    }
    catch (e) { throw new Error("Database deletion failed"); }
};
  

export default{ createCard, deleteCard }