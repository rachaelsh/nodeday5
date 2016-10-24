var carsModel = require("./../models/carsModel")

module.exports = {
  read:function(req, res){
    CarModel.find(req.query)//don't have to query
    .exec(function(err, result){
      if(err){
        res.send(err);
      }else{
        res.send(result);
      }
    });
  },
  create: function(req, res){
    var car = new CarModel(req.body);
    car.save(function(err, result){
      if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  });

  },
  update: function(req, res){
    CarModel.findByIdAndUpdate(req.params.id, req.body, function(err, result){//req.params.id will only ever look in the right place because it's looking for the url for this specific id number
      if(err){
        res.send(err);
      }else{
        res.send(result);
      }
    });

  },
  destroyer: function(req, res){
    CarModel.findByIdAndRemove(rep.params.ir, req.body, function(err, result){
      if(err){
        res.send(err);
      }else{
        res.send(result);
      }
    });
  }
}//end of exports
