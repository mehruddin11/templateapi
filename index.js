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
    const page = parseInt(req.query.page);
    const limit =parseInt(req.query.limit);
   if(limit > data.Templates.length){
        res.status(404).json(" page limit Exceded ")
    }
    const startIndex = (page-1) *limit;
    const endIndex = page * limit;
   
    if(endIndex  <data.Templates.length){

        next = {
            page:page+1,
            limit:limit
        }
    }
    if(startIndex > 0){

        previos = {
            page:page-1,
            limit:limit
        }
    }
    res.json(data.Templates.slice(startIndex, endIndex));
   
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
                return res.sendFile(path.resolve(temp.download))
               
              
            }
            
            
        })
    }
    catch(err){
       res.send("hellloooo")
    }

});
app.use('/search',  (req, res)=>{
	const filters = req.query;
    const filterTemplate = data.Templates.filter((template)=>{
         
		let isvalid= true;
		for( key in filters){
			// console.log(key, template[key], filters[key]);
			isvalid =isvalid && template[key] == filters[key];
		}
		return isvalid;
	});
    let  results = {}
	results = results.results= filterTemplate;
    res.json(results)
    
	

});

app.listen(process.env.PORT  || 5000, ()=>{
    console.log("App is listening to port 5000")
})



