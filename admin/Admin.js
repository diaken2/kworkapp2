const {Schema,model}=require('mongoose')
const schema = new Schema({
    login:{
        type:String
    },
    password:{
        type:String
    }
})
module.exports=model("Admin",schema)