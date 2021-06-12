let express = require('express');
let app = express();
let moneyRoute = express.Router();
let moneyModel = require('../model/MoneyModel');

// Get all money
moneyRoute.route('/').get((req, res) => {
  // console.log("error");
  moneyModel.find().sort({id:-1}).exec((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
        // console.log(data);
      }
    })
})

moneyRoute.route('/chart/:year').get((req, res) => {
  moneyModel.find({year: req.params.year}).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      // console.log(data);
      // console.log(data[0]);
      res.json(data)
    }
  })
})

// Get filter
moneyRoute.route('/filter').get((req, res) => {
  moneyModel.find({
    $or : [
      {month: req.params.month},
      {year: req.params.year},
      {room: req.params.room},
      {people: req.params.people},
      {status: req.params.status},
    ]
  }).sort({id:-1}).exec((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
})

// Get all people
moneyRoute.route('/people').get((req, res) => {
  // console.log("error");
  moneyModel.find().limit(5).sort({id:-1}).exec((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
        // console.log(data);
      }
    })
})

// Update catalog
moneyRoute.route('/edit/:id').put((req, res, next) => {
  moneyModel.findByIdAndUpdate(req.params.id, {
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

// Get one catalog
moneyRoute.route('/edit/:id').get((req, res) => {
  moneyModel.find({id: req.params.id}).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      // console.log(data);
      // console.log(data[0]);
      res.json(data[0])
    }
  })
})

// Add Catalog
moneyRoute.route('/create').post((req, res, next) => {
  // console.log(req.body);
  var total=req.body.electricity_bill*3000+req.body.water_bill*10000+req.body.room_bill;
  moneyModel.create({
    id:req.body.id,
    month:req.body.month,
    year:req.body.year,
    room:req.body.room,
    people:req.body.people,
    electricity_bill:req.body.electricity_bill*3000,
    water_bill:req.body.water_bill*10000,
    room_bill:req.body.room_bill,
    total:total,
    status:req.body.status,
  })
  res.json(req.body);
});

// search one people
moneyRoute.route('/search/:name').get((req, res) => {
  moneyModel.find({people:req.params.name }).sort({id: -1}).exec(function(error, data) {
    if (error) {
      return next(error)
    } else {
      // console.log(data);
      res.send(data);
    }
  })
})

// Delete people
moneyRoute.route('/delete/:id').delete((req, res, next) => {
  moneyModel.deleteOne({id: req.params.id}).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.send(data)
      // console.log("success delete");
    }
  })
})

// Update employee
moneyRoute.route('/update/:id').put((req, res, next) => {
  $old= moneyModel.find({id: req.params.id});
  // console.log($old);
  // console.log(req.body);
  moneyModel.updateOne($old , {$set: req.body}, (error, data) => {
    if (error) {
      return next(error);
      // console.log(error)
    } else {
      res.json(data)
      // console.log('Data updated successfully')
    }
  })
})


module.exports = moneyRoute;
