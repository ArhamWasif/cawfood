const mongoose = require('mongoose');
// const mongoURI='mongodb://localhost:27017'



const mongoDB = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/cawfood', { useNewUrlParser: true, useFindAndModify:false, useUnifiedTopology: true }, async (err, result) => {
    if (err) console.log("---", err)
    else {
      console.log("connected");
      const fetched_data = await mongoose.connection.db.collection("products");
      fetched_data.find({}).toArray(async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        foodCategory.find({}).toArray(function (err, catData) {
          if (err) console.log(err);

          else {
            global.products = data;
            global.foodCategory = catData;
            // console.log(global.food_items);
          }








        })


        //   if(err) console.log(err);

        // else {
        //   global.food_items=data;
        //   // console.log(global.food_items);
        // }
      })




    }






  });




}
module.exports = mongoDB;

