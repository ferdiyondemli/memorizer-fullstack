 
const islogged=(req, res, next)=>{

   
     if(req.session.email) {

        res.redirect("/learn")
    } else {
        next()

}
 
    }
    


    module.exports=islogged;
    