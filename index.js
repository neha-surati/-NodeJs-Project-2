const express = require('express');

const port = 8081;

const app = express();

app.use(express.urlencoded());

app.set("view engine", "ejs");

let taskData = [
    
]

app.get('/', (req, res) => {
    return res.render('form',{
        user : taskData
    })
    
});

let index=1
app.post('/insertData',(req,res)=>{
    // console.log(req.body)
    
    let obj={
        id:index++,
        taskId:req.body.taskId,
    }
    taskData.push(obj);
    return res.redirect('back')
})
app.get('/deleteData',(req,res)=>{
    let Id=req.query.id;
    let data=taskData.filter((val)=>{
        return val.id != Id;
    })
    console.log(data);
    taskData=data
    return res.redirect('back');
})

app.post('/editData',(req,res)=>{
    // console.log(req.body);
    let editId = req.body.editid; 
    let taskId = req.body.taskId;
    let editdata = taskData.filter((curdata) => {
        if (curdata.id == editId) { 
            curdata.taskId = taskId;
            console.log(curdata);  
        }
          
        return curdata;
    });
    console.log(editdata);
    
    taskData = editdata;
    return res.redirect('/');
})

app.get('/editData',(req,res)=>{
    let Id=req.query.id
     let data=taskData.filter((curdata)=>{
        return curdata.id==Id
     })
    
     return res.render('editData',{
        taskData:data[0]
     })
})

app.listen(port, (err) => {
    if (err) {
        console.log("server is not start in port");
        return false;
    }
    console.log("server http://localhost:" + port);
});