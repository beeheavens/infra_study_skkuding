
import express from "express"
import path from "path"
import os from "os"
const app = express()
const port = 3000
const __dirname = path.resolve()
app.use(express.json())

let users = []

app.get('/', (req, res) => {
  res.sendFile(__dirname+"/w2.html")
})

app.post('/api/signup',(req,res)=>{
    try{
      let user_data = {}
      user_data['username'] = req.body.username
      user_data['password'] = req.body.password
      user_data['email'] = req.body.email
      users.push(user_data)
      console.log(users)
      console.log("username and password saved")
      res.send(201,"success")
    }
    catch{
      console.log("Error has occured while signup")
    }  
})

app.get('/api/users',(req,res)=>{
  let ret_data = []
  console.log("users in!")
  users.forEach((data)=>{
    let temp_data = {}
    temp_data['username'] = data.username
    temp_data['email'] = data.email
    ret_data.push(temp_data)
  })
  let ret_json = JSON.stringify(ret_data)
  res.setHeader('Content-Type', 'application/json')
  res.send(ret_json)
})

app.post('/api/login',(req,res)=>{
  let input_username = req.body.username
  let input_password = req.body.password
  let flag = 0
  users.forEach((data)=>{
    if(data.username == input_username){
      if(data.password == input_password){
        flag = 1
      }
    }
  })
  if (flag == 1){
    res.send(200,"login success")
  }
  else{
    res.send(401,"login failed")
  }
})

app.get('/api/os',(req,res)=>{
  let ret_data = {} // []과 {}의 차이?
  ret_data['type'] = os.type()
  ret_data['hostname'] = os.hostname()
  ret_data['cpu_num'] = os.cpus().length
  ret_data['total_mem'] = os.totalmem()
  let ret_json = JSON.stringify(ret_data)
  res.setHeader('Content-Type', 'application/json')
  res.send(ret_json)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})