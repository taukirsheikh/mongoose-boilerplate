require('dotenv').config();
const mongoose = require('mongoose');4
const {personSchema} = require('./schemas/personSchema');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
let Person=mongoose.model('Person',personSchema);
const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["pizza", "tacos"]
  });

  newPerson.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data); // If successful, return the saved document
  });
};
const arrayOfPeople = [
  { name: "Jane Doe", age: 25, favoriteFoods: ["burgers", "fries"] },
  { name: "Mike Doe", age: 35, favoriteFoods: ["spaghetti", "meatballs"] }
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return console.error(err);
    done(null, data); // If successful, return the saved documents
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, function (err, data) {
    if (err) return console.error(err);
    console.log(data);
    done(null, data); // If successful, return the saved documents
  })

};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return done(err);
    done(null , data);
    console.log(data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return done(err);
    done(null , data);
  })
};

const findEditThenSave = (personId, done) => {
   // Find the person by ID
   Person.findById(personId, (err, person) => {
    if (err) {
      return done(err); // Pass the error to the callback
    }

    if (!person) {
      return done(new Error("Person not found")); // Handle case where no document is found
    }

    // Add "hamburger" to favoriteFoods
    person.favoriteFoods.push("hamburger");

    // Save the updated document
    person.save((err, updatedPerson) => {
      if (err) {
        return done(err); // Pass the error if save fails
      }
      done(null, updatedPerson); // Pass the updated document to the callback
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
