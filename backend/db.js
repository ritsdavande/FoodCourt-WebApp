const mongoose = require("mongoose");

const mongoURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://ritsdavande:Rits%400104@cluster0.joksybr.mongodb.net/FoodCourtmern?retryWrites=true&w=majority&appName=Cluster0";


const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected");

    const fetched_data = mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();
    const foodCategory = mongoose.connection.db.collection("foodCategory");
    const catData = await foodCategory.find({}).toArray();

    // Patch for broken image
    data.forEach((item) => {
      if (item.name === "Mix Veg Pizza") {
        item.img =
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
      }
    });

    global.food_items = data;
    //console.log(global.food_items);
    global.foodCategory = catData;
  } catch (err) {
    console.log("---", err);
  }
};

module.exports = mongoDB;
