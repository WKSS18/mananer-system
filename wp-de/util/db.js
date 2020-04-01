const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/wopin');
let db  = mongoose.connection;
db.on('open',()=>{
    console.log('open...........');
})
db.on('error',()=>{
    console.log('error...........');
})
module.exports = mongoose;