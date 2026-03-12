const pController=require('../controllers/productcontroller')
const express=require('express')

const router=express.Router()
const upload=require('../middleware/upload')

router.post('/add',upload.single('pic'),pController.addProduct);
router.get("/all",pController.getAllProducts);
router.get('/get/:id',pController.getProductById);
router.put('/update/:id',upload.single('pic'),pController.updateProduct);
router.delete('/delete/:id',pController.deleteProduct);

module.exports=router;
