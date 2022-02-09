const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const path = require('path');
const {data} = require('./data');


const app= express();
// middleware 
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors())
// get 

app.get('/', (req, res)=>{
    res.json(data.Templates)
})
app.get('/template/:id', (req, res)=>{
    const {id}= req.params;
    data.Templates.map((temp)=>{
        if(temp.id ===id){
             res.json(temp)
        }
    }) 
   res.status(404).json({success:false, err:'cant find with this id'})
})
app.get('/download/:id', async(req, res)=>{
    const {id} =  req.params;
    try{

        data.Templates.forEach(temp=>{
            
            if(temp.id === id){
               
                return res.download(path.resolve(temp.download))
            }
            
            
        })
    }
    catch(err){
       res.send("hellloooo")
    }

});

app.listen(process.env.PORT  || 5000, ()=>{
    console.log("App is listening to port 5000")
})



