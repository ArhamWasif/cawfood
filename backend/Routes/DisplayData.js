const express = require('express')
const router =express.Router()
const Product = require('../models/Product')
const mongoose = require('mongoose');
const multer = require("multer");
const path = require("path");

// const checkFileType = function (file, cb) {
//   //Allowed file extensions
//   const fileTypes = /jpeg|jpg|png|gif|svg/;

//   //check extension names
//   const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

//   const mimeType = fileTypes.test(file.mimetype);

//   if (mimeType && extName) {
//     return cb(null, true);
//   } else {
//     cb("Error: You can Only Upload Images!!");
//   }
// };

// const storageEngine = multer.diskStorage({
//     destination: "./images",
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}--${file.originalname}`);
//     },
//   });

//   const upload = multer({
//     storage: storageEngine,
//     limits: { fileSize: 10000000 },
//     fileFilter: (req, file, cb) => {
//       checkFileType(file, cb);
//     },
//   });
const storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, Date.now() + extension);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(null, true);
      console.log("Image téléchargé avec succès"); // success message
    } else {
      callback(null, false);
      console.log("Seulement du fichier de type png, jpg ou jpeg"); // error message
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});
router.post('/foodData',(req,res)=>{
    try{
        // console.log(global.food_items,foodCategory)

        res.send([global.food_items,global.foodCategory])

    }catch(error){
        console.log(error.message)
        res.send("Server Error" )
    }
});

router.post("/create/product", async (req, res) => {
  console.log('req.body', req.body); // This will log the request body

  try {
      const data = await Product.create({
          name: req.body.name,
          category: req.body.category,
          description: req.body.description,
          img: req.body.img,
          options: req.body.options
      });
      res.json({ success: true, data: data });
  }
  catch (error) {
      console.log(error);
      res.json({ success: false });
  }
});



router.delete("/delete/product/:id", async (req, res) => {
    try {
       const data = await Product.findByIdAndDelete(req.params.id)
        res.json({ success: true, message: "deleted successfully" })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false })
    }
})

router.get("/get/product", async (req, res) => {
    try {
        const fetched_data = await mongoose.connection.db.collection("products");
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const product = await Product.find()
        await foodCategory.find().toArray(function (err, catData) {
        if (err) console.log(err);
        else {
          res.json({ success: true, data: [product, catData] })
        }
    })}
    catch (error) {
        console.log(error)
        res.json({ success: error.response })
    }
})

router.get("/get/product/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
          res.json({ success: true, data: product })
    }
    catch (error) {
        console.log(error)
        res.json({ success: error.response })
    }
})

module.exports=router;