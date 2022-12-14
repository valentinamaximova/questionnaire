
const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const newRouter = function (collection) {

  const router = express.Router();
  

  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch(console.log("error"));
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch(console.log("error"));
  });

  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .deleteOne({ _id: ObjectID(id) })
      .then(() => collection.find().toArray())
      .then((docs) => res.json(docs))
      .catch(console.log("error"));
  });



  router.post('/', function(req, res){
    collection.insertMany( [req.body] , function(err, info){
      console.log(info.acknowledged)
      console.log("nz veche");
      console.log([req.body]);
      res.json(info.acknowledged)
    })
}) 


 router.put('/:id', (req, res) => {
    const itemId = req.params.id;
    const updatedItem = req.body;
    
    collection
    .findOneAndUpdate({ _id: ObjectID(itemId) }, { $set: updatedItem })
    .then(result => {
      res.json(result.value);
    })
    .catch(console.log("error"));
  });
  
  
  return router;

};

module.exports = newRouter;











