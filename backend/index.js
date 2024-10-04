//   const express = require('express')
//   const app = express()
//   var bodyParser = require('body-parser')

//   const port = 5000
//   const mongoDB = require("./db")
//   mongoDB();
//   app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   next();
//   })
//   app.use(bodyParser.urlencoded({ extended: true }))

// // parse application/json
// app.use(bodyParser.json())

// // app.use(function (req, res) {
// //   res.setHeader('Content-Type', 'text/plain')
// //   res.write('you posted:\n')
// //   res.end(JSON.stringify(req.body, null, 2))
// // })

//   app.use('/api',require('./Routes/CreateUser'));
//   app.use('/api',require('./Routes/DisplayData'));
//   app.use('/api',require('./Routes/OrderData'));
 
//   app.post("/api/create/pro", async (req,  res) => {
//     console.log('req',req.body)
//     return null
// })
//   app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

//   app.listen(port, () => {
//     console.log(`Example app listening on http://localhost:${port}`)
//   })
  
const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./models/Product');

const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 5000;
const mongoDB = require('./db');

mongoDB();

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
  },
});

const upload = multer({ storage });

// Body parsing middleware for JSON
app.use(bodyParser.json());

// Routes for CreateUser, DisplayData, and OrderData - Adjust these based on your requirements
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

// Allow Access-Control-Allow-Headers for Content-Type
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/image/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, './uploads', imageName);
  res.sendFile(imagePath);
});

app.post('/api/create/pro', upload.single('img'), async (req, res) => {
  try {
    console.log('req', req.body, req.file);
    const data = await Product.create({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      img: req.file ? req.file.path : null,
      options: JSON.parse(req.body.options),
    });

    res.json({ message: 'Data and file received successfully!', data: data });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
});

app.put('/api/update/product/:id', upload.none(), async (req, res) => {
  try {
    console.log('req.body', req.body);
    const data = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        options:JSON.parse(req.body.options),
      },
      {
        new: true,
      }
    );
    res.json({ success: true, data: data });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
