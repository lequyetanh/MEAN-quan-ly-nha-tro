let express = require('express');
let roomRoute = express.Router();
let roomModel = require('../model/roomModel');

// Get all money
roomRoute.route('/').get((req, res) => {
  roomModel.find().sort({id:-1}).exec((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
})

// get one room
roomRoute.route('/get/:room').get((req, res) => {
  roomModel.find({room: req.params.room}).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data[0])
    }
  })
})

// Add People
roomRoute.route('/create').post((req, res, next) => {
  // console.log(req.body);
  roomModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});



// update room
roomRoute.route('/update/:id').put((req, res, next) => {
  $old= roomModel.find({id: req.params.id});
  // console.log($old[0]);
  roomModel.updateOne($old , {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      // console.log(error)
    } else {
      res.json(data)
      // console.log('Data updated successfully')
    }
  })
})

// Delete people
roomRoute.route('/delete/:room').delete((req, res, next) => {
  roomModel.deleteOne({room: req.params.room}).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.send(data)
      // console.log("success delete");
    }
  })
})

module.exports = roomRoute;
