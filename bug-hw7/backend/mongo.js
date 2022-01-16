import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
// import API from './routes/api/create-card.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then((res) => {
    console.log("mongo db connection created");
})

// API.createCard("test", "tes2", 99);


 