let express = require('express');
let peopleRoute = express.Router();
let peopleModel = require('../model/peopleModel');

// Get all money
peopleRoute.route('/').get((req, res) => {
  peopleModel.find().sort({id:-1}).exec((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
})

// Add People
peopleRoute.route('/create').post((req, res, next) => {
  // console.log(req.body);
  peopleModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Delete people
peopleRoute.route('/delete/:id').delete((req, res, next) => {
  peopleModel.deleteOne({id: req.params.id}).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.send(data)
      // console.log("success delete");
    }
  })
})

// Delete people
peopleRoute.route('/deleteUserFromName/:name').delete((req, res, next) => {
  peopleModel.deleteOne({name: req.params.name}).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.send(data)
      // console.log("success delete");
    }
  })
})

// Get one catalog
peopleRoute.route('/edit/:id').get((req, res) => {
  peopleModel.find({id: req.params.id}).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      // console.log(data);
      // console.log(data[0]);
      res.json(data[0])
    }
  })
})

// Update employee
peopleRoute.route('/update/:id').put((req, res, next) => {
  $old= peopleModel.find({id: req.params.id});
  // console.log($old[0]);
  peopleModel.updateOne($old , {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})


module.exports = peopleRoute;
