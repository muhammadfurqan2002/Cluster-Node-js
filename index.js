const express=require('express');
const cpu=require('process');
const app=express();



app.get('/',(req,res)=>{
    return res.json({msg:`Hello from express server ${process.pid}`});
});


app.listen(8080,()=>{
    console.log('Server Started');
});