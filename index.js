const express=require('express')
const app=express()
const mongoose=require('mongoose')
const User=require("./model/User")
const Admin=require("./admin/Admin")
const Instruc=require("./instructions/Instruc")
const path=require("path")
app.use(function(req, res, next) {


    res.header("Access-Control-Allow-Origin","*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    
  
    
    });
const PORT=process.env.PORT || 5000

app.use(express.json({extended:true}))

const start=async() =>{
    try{
mongoose.connect('mongodb+srv://admin:RY1ATripui6$@cluster0.8znhtvr.mongodb.net/?retryWrites=true&w=majority',{})
app.listen(PORT,()=>{
    console.log("Server has been launched on PORT " + PORT)
})
    }
    catch(e){
        console.log(e.message)
    }
}
start()


app.post('/getInstruc',async(req,res)=>{
const instruc=await Instruc.find({})
res.json(instruc[0])
})
app.post('/createAccount',async(req,res)=>{
    const {login,pass}=req.body
    const candidate = await User.findOne({ login })
  
      if (candidate) {
        return res.status(201).json({ message: 'Такой пользователь уже существует' })
      }
  
      
      const user = new User({ login, password:pass, project:[] })
  console.log(user)
      await user.save()
  
      res.status(201).json({ message: 'Пользователь создан' })
})
app.post('/signAccount',async(req,res)=>{
    const {login,password}=req.body
    console.log(req.body)
    const user = await User.findOne({ login })
  
    if (!user) {
        console.log("Ошибка с логином")
      return res.status(201).json({ message: 'Пользователь не найден' })
    }
    console.log(user)

    const isMatch = password==user.password

    if (!isMatch) {
        console.log("Ошибка с паролем")
      return res.status(201).json({ message: 'Неверный пароль, попробуйте снова' })
    }

    

    res.json(user)

})





app.post('/adminSign', async(req,res)=>{
    const {login,password}=req.body
    console.log(req.body)
    const user = await Admin.findOne({ login })
  
    if (!user) {
        console.log("Ошибка с логином")
      return res.status(201).json({ message: 'Пользователь не найден' })
    }
    console.log(user)

    const isMatch = password==user.password

    if (!isMatch) {
        console.log("Ошибка с паролем")
      return res.status(201).json({ message: 'Неверный пароль, попробуйте снова' })
    }

    

    res.json("isActive")


})


app.post('/createProject', async (req,res)=>{
    console.log(req.body)
   const {user, titleProject,tags,whereCollect,whatCollect,amountOfPages,prox,loading,isReady,download}=req.body
    const candidate = await User.findOne({login:user})
    console.log(candidate)
    let newObject={
      titleProject, tags, whereCollect, whatCollect, amountOfPages, prox, loading, isReady,download
      
    }
    let A=candidate.project
    A.push(newObject)
    User.updateOne({login:user},{project:A},()=>{
        console.log('успешно изменено')
    })
    const candidate2 = await User.findOne({user})
    res.json(candidate)
})
app.get('/allTasks',async(req,res)=>{
    const users = await User.find({})
    res.json(users)
})




app.post("/loadingUpdate", async(req,res)=>{
    console.log(req.body)
    const user = await User.findOne({login:req.body.user})
    console.log(user)
    let A=[]
    user.project.find((e)=>{
if (e.titleProject==req.body.projecto){
    const objectChange={
    titleProject:e.titleProject,
      tags:e.tags,
      whereCollect:e.whereCollect,
      whatCollect:e.whatCollect,
      amountOfPages:e.amountOfPages,
      prox:e.prox,
      loading:req.body.loader,
      isReady:e.isReady,
      download:e.download
    }
    A.push(objectChange)
}
else{
   
        A.push({
            titleProject:e.titleProject,
              tags:e.tags,
              whereCollect:e.whereCollect,
              whatCollect:e.whatCollect,
              amountOfPages:e.amountOfPages,
              prox:e.prox,
              loading:req.body.loader,
              isReady:e.isReady,
              download:e.download
            })
    
}
    })
    User.updateOne({login:req.body.user},{project:A},()=>{
        console.log('успешно изменено')
    })
    const user2 = await User.findOne({login:req.body.user})
    res.json({
        body:req.body.loader,
        user2:user2
    })
})



















app.post('/ready',async(req,res)=>{
    console.log(req.body)
    const user = await User.findOne({login:req.body.obje})
    console.log(user)
    let A=[]
    user.project.find((e)=>{
if (e.titleProject==req.body.inf){
    const objectChange={
    titleProject:e.titleProject,
      tags:e.tags,
      whereCollect:e.whereCollect,
      whatCollect:e.whatCollect,
      amountOfPages:e.amountOfPages,
      prox:true,
      loading:e.loading,
      isReady:true,
      download:req.body.linkReady
    }
    A.push(objectChange)
}
else{
    A.push(e)
}
    })
    User.updateOne({login:req.body.obje},{project:A},()=>{
        console.log('успешно изменено')
    })
    const user2 = await User.find({})
    res.json(user2)
})

