const { Router }=require('express');
const router=Router();
const shopControllers=require('../controllers/shopControllers.js');



router.get('/books',shopControllers.filterBooksByAuthors)


 
module.exports=router;