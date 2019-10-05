const express = require('express');
const mongoose = require('mongoose');

let app = express();

app.listen(9494,()=>{
  console.log("9494端口开启成功");});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',require('./routers/index'));

mongoose.connect("mongodb://localhost:27017/vuex",{ useNewUrlParser: true })
  .then(()=>{
    console.log("数据库连接成功");})
  .catch(()=>{
    console.log("数据路连接失败");})


