const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
.then(()=>{console.log("DB is ok!") })
.catch((e)=>{console.log("DB connection err: "+e)})




