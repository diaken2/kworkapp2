const {Schema,model}=require('mongoose')
const schema = new Schema({
    login:{
        type:String
    },
    password:{
        type:String
    },
    project:{
        type:Array
    }
})
module.exports=model("User",schema)