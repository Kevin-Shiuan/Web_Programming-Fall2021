  import mongoose from 'mongoose';
  const { Schema } = mongoose;

  const cardSchema = new Schema(
    {
    name:  String, // String is shorthand for {type: String}
    subject: String,
    score:   Number,
    }
  );

  const scoreCard = mongoose.model('scoreCard', cardSchema);

  export default scoreCard;