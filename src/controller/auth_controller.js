 const User=require("../model/user_model")
 const Ddeck=require("../model/deck_model")
 const mongoose=require("mongoose")

const home=(req, res, next)=>{

    res.redirect("/login")
}

const loginform=async(req, res, next)=>{




     res.render('login');


}

const registerform=(req, res, next)=>{
    res.render('register');


}

const forgotform=(req, res, next)=>{
    res.render('forgot');


}

const login= async(req, res, next)=>{


   const newlogger= await User.findOne({email:req.body.email})
if(newlogger){
    if(newlogger.password==req.body.password) {
req.session.email = newlogger.email;
req.session.fullname = newlogger.fullname;
res.redirect("/learn")

}
else {console.log("password is wrong: "+req.body.password)
res.redirect("/login")

}

}else {console.log("No user with this email: " +req.body)
res.redirect("/login")
}





}
const createnewdatabase= async(email)=>{
let a, b;

var Deck=mongoose.model(email, Ddeck)

 var MongoClient = require('mongodb').MongoClient;


a=await MongoClient.connect(process.env.MONGODB_CONNECTION_STRING)
 .then(async function(db) {
   var dbo = db.db("test");
     await dbo.collection("firstdecks").find({}).toArray(function(err, result) {
    if (err) throw err;
    // console.log(result);
    db.close();
 let i=0
     result.forEach(async (el)=>{
       i++
        if(i<101){
            const newdeck=new Deck ({
            question: el["Word"],
            answer:   el["Content"],
            duedate:10

         })
        await newdeck.save();
        }
        
     })

 
  });
  })
.catch(function (err){console.log(err)})


}

const register= async (req, res, next)=>{
try {
	    const newuser=new User({
	fullname:req.body.fullname,
	email:req.body.email,
	password:req.body.password,
	    }) 
 



	   await newuser.save()
       await  createnewdatabase(req.body.email);

	    res.redirect("/login")

} catch (error) {
     res.redirect("/register")

}


}

const forgot=(req, res, next)=>{


}

const logout=async(req, res, next)=>{
 
	    await req.session.destroy();
       res.redirect("/login")


}

const firstdeck=async(req, res, next)=>{
    var Deck=mongoose.model(req.session.email, Ddeck)
    var now=1+Date.now();
    var fiveminnow=1+Date.now()+300000;
    var onedaynow=1+Date.now()+ 86400000
    var threedaysnow=1+Date.now()+ 259200000

    let word=await Deck.findOne({duedate: {$lt: now }})
    let words=await Deck.find({duedate: {$lt: now }})
let realnow=words.length;
console.log("<%-realnow  %> :"+realnow)
let sayi=await Deck.find({duedate: {$lt: 15 }})
let el=sayi.length

let fiveminword=await Deck.find({duedate: {$lt: fiveminnow }})
let fivemin=fiveminword.length
let onedayword=await Deck.find({duedate: {$lt: onedaynow }})
let oneday=onedayword.length
let threedaysword=await Deck.find({duedate: {$lt: threedaysnow }})
let threedays=threedaysword.length
if(word==null){
    res.render('deck', {version:0, fullname: req.session.fullname,  elem:"Most Common 100 Words", firstq:'word["question"]', firsta:'word["answer"]', el:el, oneday:oneday, fivemin:fivemin,realnow:realnow, threedays:threedays,  layout:  './layouts/yenilayout'})
}else{
 res.render('deck', {version:1, fullname: req.session.fullname,  elem:"Most Common 100 Words", firstq:word["question"], firsta:word["answer"], el:el, oneday:oneday, fivemin:fivemin,realnow:realnow, threedays:threedays,  layout:  './layouts/yenilayout'})
 
    
}
console.log("word: "+ word +" el: "+ el+ "  fivemin :"+ fivemin+" oneday :"+oneday +" threedays :"+threedays)
   

 
}
 
    const getnewitemü=  (req, res)=>{

        var MongoClient = require('mongodb').MongoClient;
         MongoClient.connect(process.env.MONGODB_CONNECTION_STRING, function(err, db) {
          if (err) throw err;
          var dbo = db.db("test");
          var now=1+Date.now()
        //   duedate: {$lt: 55}
          dbo.collection("firstdecks").findOne({duedate: {$lt: now }}, function(err, result) {
            if (err) throw err;
             result;
         
            db.close(); 
 
            res.json(result)

          });
        });
       } 
       

  
   

//çalışan hespine bişey ekleme kodu, query girmeyince olmadı nedens
const getnewitem=  (req, res)=>{
    var newvalues
    var MongoClient = require('mongodb').MongoClient;
     MongoClient.connect(process.env.MONGODB_CONNECTION_STRING, function(err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      const d = 1+Date.now()
         newvalues = { $set: {duedate: 10} };
        var myquery = {Word: { $regex: /./ } };

      dbo.collection("firstdecks").updateMany(myquery, newvalues,function(err, res) {
        if (err) throw err;
         db.close();
  
      });

     
    });

  res.json(newvalues)
   } 
   
 

const update5min=async (req, res)=>{
        let a, b;
    
      var myquery = {"question" :req.body.Word };
      var de=1+Date.now()+300000
      var newvalues = {"$set":{ duedate:de} };
     
      var Deck=mongoose.model(req.session.email, Ddeck)
      var now=1+Date.now();
  
      let ww=await Deck.updateMany(myquery, newvalues)
          
         
        
           var now=1+Date.now();
           var fiveminnow=1+Date.now()+300000;
           var onedaynow=1+Date.now()+ 86400000
           var threedaysnow=1+Date.now()+ 259200000
       
           let words=await Deck.find({duedate: {$lt: now }})
       let realnow=words.length;
       console.log("<%-realnow  %> :"+realnow)
       let sayi=await Deck.find({duedate: {$lt: 15 }})
       let el=sayi.length
       
       let fiveminword=await Deck.find({duedate: {$lt: fiveminnow }})
       let fivemin=fiveminword.length
       let onedayword=await Deck.find({duedate: {$lt: onedaynow }})
       let oneday=onedayword.length
       let threedaysword=await Deck.find({duedate: {$lt: threedaysnow }})
       let threedays=threedaysword.length
       
   
       let word=await Deck.findOne({duedate: {$lt: now }})
      
       if(word==null){word={"content":0,"el":el, "realnow":realnow,"fivemin":fivemin,"oneday":oneday,"threedays":threedays }
    
       
    
    }
       else{
           Object.keys(word).map(
               function(object){
                   word[object]["el"]=el,
                   word[object]["realnow"]=realnow,
                   word[object]["fivemin"]=fivemin,
                   word[object]["oneday"]=oneday,
                   word[object]["threedays"]=threedays
       
             });
            }
       
           res.json(word)  

     
   
    } 


    const update1day=async (req, res)=>{
        let a, b;
    
      var myquery = {"question" :req.body.Word };
      var de=1+Date.now()+86400000
      var newvalues = {"$set":{ duedate:de} };
     
    var Deck=mongoose.model(req.session.email, Ddeck)
    var now=1+Date.now();

    let ww=await Deck.updateMany(myquery, newvalues)
  
      
         var now=1+Date.now();
         var fiveminnow=1+Date.now()+300000;
         var onedaynow=1+Date.now()+ 86400000
         var threedaysnow=1+Date.now()+ 259200000
     
         let words=await Deck.find({duedate: {$lt: now }})
     let realnow=words.length;
     console.log("<%-realnow  %> :"+realnow)
     let sayi=await Deck.find({duedate: {$lt: 15 }})
     let el=sayi.length
     
     let fiveminword=await Deck.find({duedate: {$lt: fiveminnow }})
     let fivemin=fiveminword.length
     let onedayword=await Deck.find({duedate: {$lt: onedaynow }})
     let oneday=onedayword.length
     let threedaysword=await Deck.find({duedate: {$lt: threedaysnow }})
     let threedays=threedaysword.length
     
   
     let word=await Deck.findOne({duedate: {$lt: now }})
     if(word==null){word={"content":0,"el":el, "realnow":realnow,"fivemin":fivemin,"oneday":oneday,"threedays":threedays }
  
    
  
  }
     else{
         Object.keys(word).map(
             function(object){
                 word[object]["el"]=el,
                 word[object]["realnow"]=realnow,
                 word[object]["fivemin"]=fivemin,
                 word[object]["oneday"]=oneday,
                 word[object]["threedays"]=threedays
     
           });
          }
     
         res.json(word)  

     
   
    }
    const update3days=async (req, res)=>{
        let a, b;
    
      var myquery = {"question" :req.body.Word };
      var de=1+Date.now()+259200000
      var newvalues = {"$set":{ duedate:de} };
     
      var Deck=mongoose.model(req.session.email, Ddeck)
      var now=1+Date.now();
  
      let ww=await Deck.updateMany(myquery, newvalues)
    if(ww!=null){  console.log("gitti"+ww["question"])
  
            
           }
  
     
         
        
           var now=1+Date.now();
           var fiveminnow=1+Date.now()+300000;
           var onedaynow=1+Date.now()+ 86400000
           var threedaysnow=1+Date.now()+ 259200000
       
           let words=await Deck.find({duedate: {$lt: now }})
       let realnow=words.length;
       console.log("<%-realnow  %> :"+realnow)
       let sayi=await Deck.find({duedate: {$lt: 15 }})
       let el=sayi.length
       
       let fiveminword=await Deck.find({duedate: {$lt: fiveminnow }})
       let fivemin=fiveminword.length
       let onedayword=await Deck.find({duedate: {$lt: onedaynow }})
       let oneday=onedayword.length
       let threedaysword=await Deck.find({duedate: {$lt: threedaysnow }})
       let threedays=threedaysword.length
       
       let word=await Deck.findOne({duedate: {$lt: now }})
       if(word==null){word={"content":0,"el":el, "realnow":realnow,"fivemin":fivemin,"oneday":oneday,"threedays":threedays }
    
      
    
    }
       else{
           Object.keys(word).map(
               function(object){
                   word[object]["el"]=el,
                   word[object]["realnow"]=realnow,
                   word[object]["fivemin"]=fivemin,
                   word[object]["oneday"]=oneday,
                   word[object]["threedays"]=threedays
       
             });
            }
       
           res.json(word)  
     

     
   
    }
 
   
module.exports={
    home,
    loginform,
    registerform,
    forgotform,
    login,
    register,
    forgot,
    logout,
    firstdeck,
    getnewitem,
    update5min,
    update1day,
    update3days,
     


}

 