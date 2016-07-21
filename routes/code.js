var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Code = require('../models/code');



/*function checkCode (code){
  var pattern = '[A-Z][0-1]';
  var result = pattern.test(code);
}

console.log(result); // true
*/

/* GET Codes. */
router.get('/:code', function(req, res, next) {

  Code.findOne({ 'code': req.params.code}, function(err, code) {
    if(err){
        res.send(err);
    }else if(code === null){
      res.send({success: false, msg: 'Can\'t find code.'});
    }else{
      res.send({success: true, data: code});
    }
  });
});

router.post('/', function(req, res, next) {

  if (!req.body.code) {
    res.send({success: false, msg: 'Please code required.'});
  } /*else if () {

  }*/
   else {
//console.log(req.body);
    var code = req.body.code;
    var newCode = new Code({
      code: req.body.code,
      status: false
    });
    // save the equipment
    newCode.save(function(err, code) {
    	console.log(err);
      if (err) {
        return res.send({success: false, msg: 'The code already exist.'});
      }
      res.send({success: true, msg: 'Successful created new promotional code.', id: code.id, code: code.code});
    });
  }



});

router.put('/:code', function(req, res, next) {

  // use our bear model to find the bear we want
  Code.findOne({ 'code': req.params.code }, function(err, code) {

      if (err)
          res.send(err);

        if(!code){
          //equipment = new Equipment();
          res.send({success: false, msg: 'Code doesn\'t exist.'});
        } else{
          if (!req.body.status) {
            res.send({success: false, msg: 'Please status required.'});
          }
           else {
            //console.log('actual equipment name in db :' + req.body.name)
            code.status = req.body.status;
            code.update.addToSet(new Date);

              // save the bear
              code.save(function(err) {
                  if (err) {
                    return res.send({success: false, msg: 'Equipment already exists.'});
                  }else{
                    return res.send({success: true, msg: 'Code updated!'});
                  }
              });
          }
        }
  });
});

module.exports = router;
