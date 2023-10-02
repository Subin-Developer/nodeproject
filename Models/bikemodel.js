const mongoose=require('mongoose');
const bikeschema=mongoose.Schema(
    {
        name: {
            type:String,
            required:[true, "PLease enter a bike name"]
        },
       
        price:{
            type:Number,
            required:true,

        },     
    },
    {
        timestamps:true
    }
)
const bike=mongoose.model("bike",bikeschema);
module.exports=bike;