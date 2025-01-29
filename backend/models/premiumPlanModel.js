const { default: mongoose } = require("mongoose");

const premiumPlans = mongoose.Schema({
    price:{
        type:Number,
        required:[true,"Plan price is required"]
    },
    role:{
        type:String,
        enum:[
            "flatemate",
            "owner"
        ]
    },
    
})