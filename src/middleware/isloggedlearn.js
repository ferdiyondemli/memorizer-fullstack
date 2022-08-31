

const isloggedlearn=(req, res, next)=>{

   
     if(req.session.email) {

    
         res.render('learn', {fullname: req.session.fullname, deckslist:["lkjşl","ljkl"], layout:  './layouts/yenilayout'})

    } else next();


 
    }
    


    module.exports=isloggedlearn;
    