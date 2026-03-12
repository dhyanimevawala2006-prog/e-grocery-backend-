const productService=require('../services/productservice')

const addProduct=async(req,res)=>{
    try{
        const new_product={
            pname:req.body.pname,
            pic:req.file.filename,
            description:req.body.description,
            category:req.body.category,
            price:req.body.price
        }
        const addedProduct=await productService.add(new_product);
        res.status(200).json({message:"Product added successfully",data:addedProduct})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getAllProducts=async(req,res)=>{
    try{
        const allproducts=await productService.get();
        res.status(200).json({message:"All products",data:allproducts})
    }catch(err){
        res.status(500).json({message:err.message})

    }
}

const updateProduct=async(req,res)=>{
    try{

        const new_product={
            pname:req.body.pname,
            description:req.body.description,
            category:req.body.category,
            price:req.body.price
        }

        if(req.file){
            new_product.pic=req.file.filename
        }

        const product=await productService.update(req.params.id,new_product);

        res.status(200).json({message:"Product Updated",data:product})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getProductById=async(req,res)=>{
    try{
        const p=await productService.getbyid(req.params.id);
        res.status(200).json({message:"Product",data:p})
    }catch(err){
        res.status(500).json({message:err.message})

    }
}

const deleteProduct=async(req,res)=>{
    try{
        await productService.remove(req.params.id);
        res.status(200).json({message:"Product Delete"})
    }catch(err){
        res.status(500).json({message:err.message})

    }
}

module.exports={
    addProduct,getAllProducts,updateProduct,deleteProduct,getProductById
}