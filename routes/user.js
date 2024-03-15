const router=require("express").Router();
const{
    updateUser,
    deleteUser
}=require("../controllers/userController")

const validateToken=require("../middleware/validateToken")

router.use(validateToken)

router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);


module.exports=router