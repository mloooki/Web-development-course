const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});



const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"Please Check Your Data Entry , No Name for this fruit specified!"]
  },
  rating: {
    type: Number,
    min:1,
    max:10
  },
  review: String
});

const Fruit = mongoose.model("Fruit",fruitSchema);

const fruit = new Fruit({
  //name: "Apple",
  rating: 10,
  review: "Pretty solid"
});

const peopleSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const People = mongoose.model("People",peopleSchema);



const pineapple = new Fruit({
  name: "Pineapple",
  rating: 9,
  review: "Wooow"
});
pineapple.save();

const people = new People({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple

});

people.save();
//fruit.save();

// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 10,
//   review: "The Best!"
// });
// const kiwi2 = new Fruit({
//   name: "Kiwi",
//   rating: 10,
//   review: "The Best!"
// });
// const kiwi3 = new Fruit({
//   name: "Kiwi",
//   rating: 10,
//   review: "The Best!"
// });


// Fruit.insertMany([kiwi,kiwi2,kiwi3],function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Successed");
//   }
// });


Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  } else{
    mongoose.connection.close();
    fruits.forEach(function(element){
      console.log(element.name);
    });
  }
});

// Fruit.updateOne({_id:"60001ede8c27a7494000e19c"},{name:"Peach"},function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Update Successed");
//   }
// });

Fruit.deleteOne({name:"Peach"},function(err){
  if(err){
    console.log(err);
  } else{
    console.log("Deleted Succssed");
  }
});
