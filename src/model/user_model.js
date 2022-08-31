const mongoose=require("mongoose");

const schema=mongoose.Schema;

const userschema= new schema({
    fullname:    {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 15
    },
    email:    {
        type: String,
        required: true,
        unique:true,
        trim: true,
        minLength: 3,
        maxLength: 35,
        lowercase:true
    },

    password:   {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 15
    }


})

module.exports=User=mongoose.model("ankiusers", userschema)
