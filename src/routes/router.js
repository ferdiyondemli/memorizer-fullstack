const router=require("express").Router();
const controller=require("..//controller/auth_controller")
 const islogged=require("../middleware/middleware")
 const isloggedlearn=require("../middleware/isloggedlearn")
 const isloggedusual=require("../middleware/middleware_usual")



router.get("/learn", isloggedlearn, controller.home );

router.get("/login", islogged, controller.loginform );
router.post("/login", controller.login)

router.get("/register", islogged, controller.registerform );
router.post("/register", controller.register)


router.get("/forgot", controller.forgotform );
router.post("/forgot", controller.forgot)

router.get("/logout",  controller.logout)

router.get("/firstdeck", isloggedusual, controller.firstdeck)

router.get("/getnewitem",  controller.getnewitem)
router.post("/deckupdate5min", controller.update5min)
router.post("/deckupdate1day", controller.update1day)
router.post("/deckupdate3days", controller.update3days)


router.use( (req, res)=>res.redirect("/register"))




module.exports=router