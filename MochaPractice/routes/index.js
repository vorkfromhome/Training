var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/sc';


/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index', { result: 'Sample test' });
});


/* GET home page. */
router.get('/mobileregister', function(req, res, next) {
var otpdigits = Math.floor(Math.random()*100000+1);
var items = {
      "mobilenum" : req.query.mobilenum,
      "password" : req.query.password,
      "name" : req.query.name,
      "email" : req.query.email,
      "secure_question" : req.query.secure_question,
      "secure_answer" : req.query.secure_answer,
      "country" : req.query.country,
      "state" : req.query.state,
      "zip" : req.query.zip,
      "doorno" : req.query.doorno,
      "floor" : req.query.floor,
      "addressone" : req.query.addressone,
      "addresstwo" : req.query.addresstwo,
      "taluk" : req.query.taluk,
      "busname" : req.query.busname,
      "tin" : req.query.tin,
      "licensenum" : req.query.licensenum,
      "vat" : req.query.vat,
      "fax" : req.query.fax,
      "busphone" : req.query.busphone,
      "busmail" : req.query.busmail,
      "otp" : req.query.otpdigits,
      "create_date" :  req.query.datenow,
      "status" : req.query.status,
      "busmobactive" : "0",
      "active" : "0"
   };
   console.dir(items);
var insertDocument = function(db, callback) {
   db.collection('userdata').insertOne( items, function(err, result) {
    assert.equal(err, null);
    res.json({"status":"Success",'items':items});
    callback();
  });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
});

});


/* GET home page. */
router.get('/profileregister', function(req, res, next) {
var items = {
      "name" : req.query.name,
      "email" : req.query.email,
      "secure_question" : req.query.secure_question,
      "secure_answer" : req.query.secure_answer,
      "country" : req.query.country,
      "state" : req.query.state,
      "zip" : req.query.zip,
      "doorno" : req.query.doorno,
      "floor" : req.query.floor,
      "addressone" : req.query.addressone,
      "addresstwo" : req.query.addresstwo,
      "taluk" : req.query.taluk,
   };
var conditions = { "mobilenum" : req.query.mobilenum };

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  db.collection('userdata').updateOne(conditions,{
        $set: items,
        $currentDate: { "lastModified": true }
      }, function(err, result) {
    assert.equal(err, null);
    res.json({"status": items});
  });
});
});


/* GET home page. */
router.get('/profiletworegister', function(req, res, next) {
var items = {
      "busname" : req.query.busname,
      "tin" : req.query.tin,
      "licensenum" : req.query.License,
      "vat" : req.query.vat,
      "fax" : req.query.FAX,
      "busphone" : req.query.busmobile,
      "busmail" : req.query.email
   };
var conditions = { "mobilenum" : req.query.mobilenum };

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  db.collection('userdata').updateOne(conditions,{
        $set: items,
        $currentDate: { "lastModified": true }
      }, function(err, result) {
    assert.equal(err, null);
    res.json({"status":"success","items":items});
  });
});
});


//GET home page. 
router.get('/checkmobnum', function(req, res, next) {

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  var conditions = { 
    "mobilenum" : req.query.mobilenum,
    "status" : "1"
    };

    db.collection('userdata').find(conditions).toArray(function(err,result){
    assert.equal(err, null);
    if(result!=null){
      var count = result.length
      res.json({"count":count});
    }else
    {
      res.json({"count":"0"});
    }
  });    
      
});

});


//GET home page. 
router.get('/otpchecking', function(req, res, next) {

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  var conditions = { 
    "mobilenum" : req.query.mobilenum,
    "otp" : req.query.otpcheck,
    "status" : "1",
    "active" : "0"
    };
  var items = {
      "active" : "1"
   };
    db.collection('userdata').find(conditions).toArray(function(err,result){
    assert.equal(err, null);
    if(result!=null){
      var count = result.length
      if(count>0)
      {
        var update = db.collection('userdata').updateOne(conditions,{
        $set: items,
        $currentDate: { "lastModified": true }
         }, function(err, result) {
          assert.equal(err, null);
         res.json({"status":update,"items":items});
         });
      }
      res.json({"count":count,"items":conditions});
    }else
    {
      res.json({"count":"0"});
    }

  });

});

});



//GET home page. 
router.get('/createotpagain', function(req, res, next) {

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  var conditions = { 
    "mobilenum" : req.query.mobilenum,
    "status" : "1",
    "active" : "0"
    };
  var items = {
      "otp" : req.query.otpagain
   };
    var update = db.collection('userdata').updateOne(conditions,{
        $set: items,
        $currentDate: { "lastModified": true }
      }, function(err, result) {
          assert.equal(err, null);
          res.json({"status":update,"items":items});
         });

});

});



router.get('/userlogin', function(req, res, next) {

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  var conditions = { 
    "mobilenum" : req.query.username,
    "password" : req.query.password,
    "status" : "1",
    "active" : "1"
    };
   
   db.collection('userdata').find(conditions).toArray(function(err,result){
    assert.equal(err, null);
    if(result!=null){
      var count = result.length
      res.json({"loginstatus":count,"items":conditions});
    }else
    {
      res.json({"loginstatus":"0"});
    }

  });
});

});


router.get('/forgetpass', function(req, res, next) {

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  var conditions = { 
    "mobilenum" : req.query.username,
    "secure_question" : req.query.securityquestion,
    "secure_answer" : req.query.qustnanswer,
    "status" : "1",
    "active" : "1"
    };
  var items = {
      "password" : "87654321"
   };
    db.collection('userdata').find(conditions).toArray(function(err,result){
    assert.equal(err, null);
    if(result!=null){
      var count = result.length
      if(count>0)
      {
        var update = db.collection('userdata').updateOne(conditions,{
        $set: items,
        $currentDate: { "lastModified": true }
      }, function(err, result) {
          assert.equal(err, null);
           res.json({"status":conditions,"items":items});
         });
      }
    }else
    {
      res.json({"count":"0"});
    }

  });

});

});




module.exports = router;
