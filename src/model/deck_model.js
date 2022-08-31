const mongoose=require("mongoose");

const schema=mongoose.Schema;

const deckschema= new schema({
    question:    {
        type: String,
        required: true,
        trim: true,
         maxLength: 15000
    },
    answer:    {
        type: String,
        required: true,
        trim: true,
         maxLength: 1500000
    },

    duedate:   {
        type: Number
    }


})

// module.exports=Deck=mongoose.model("ankiusers", userschema)
module.exports=deckschema

