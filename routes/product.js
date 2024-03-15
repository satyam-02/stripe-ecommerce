const router=require("express").Router();
const{
   createProduct,
   deleteProduct,
}=require("../controllers/productController")

const validateToken=require("../middleware/validateToken")

router.use(validateToken)

router.route('/').post(createProduct);
router.route('/:id').delete(deleteProduct);



module.exports=router