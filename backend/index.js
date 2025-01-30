// server.js
const express = require('express');
const fs=require('fs');
const app = express();
const PORT = 8000;
const aliens=require("./aliens.json");
const cors=require('cors');
const bodyParser=require('body-parser');
app.use(cors({
  origin:"*"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
// define the route
app.get('/',(req, res) => {
      return res.json(aliens);
    });
app.get('/aliens', (req, res) => {
  const limit = parseInt(req.query.limit)||aliens.length; 
  const offset = parseInt(req.query.offset)||0;
if(isNaN(limit) && limit<=0){
  return res.status(400).json({error:"Limit must be a positive number."})
}
if(isNaN(offset) && offset<0){
  return res.status(400).json({error:"Offset must be a non-negative number."})
}
return res.json({
  data:aliens.slice(offset,offset+limit),
  length:aliens.length
  });
});
app.get('/api',async(req,res)=>{
  const text=req.query.name;
  const limit = parseInt(req.query.limit)||aliens.length; 
  const offset = parseInt(req.query.offset)||0;
if(isNaN(limit) && limit<=0){
  return res.status(400).json({error:"Limit must be a positive number."})
}
if(isNaN(offset) && offset<0){
  return res.status(400).json({error:"Offset must be a non-negative number."})
}
  const filteredItems = aliens.filter((item) => item.name.toLowerCase().includes(text.trim().toLowerCase()));
      
   return res.json({
     data:filteredItems.slice(offset,offset+limit),
     length:filteredItems.length
   });
  
})

app.listen(PORT,
    () => {
        console.log(
            `Server is listening at 
            http://localhost:${PORT}`
        );
    });