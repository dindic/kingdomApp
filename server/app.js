require('./config/config');

var { ObjectID } = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash');

var {mongoose} = require('../db/mongoose');
var {User} = require('../db/models/user-model');
var {Kingdom} = require('../db/models/kingdom-model');
var {City} = require('../db/models/city-model');
var {District} = require('../db/models/district-model');
var {Authenticate} = require('./middleware/authenticate');


var app = express();
console.log(process.env.PORT + '---' + process.env.NODE_ENV + '----' + process.env.MONGODB_URI);
const port = process.env.PORT || 9890;

//MiddleWare
app.use(bodyParser.json());
// app.set('trust proxy');



app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, x-auth, Content-Type, Accept');

  // Headers you want to expose
  res.setHeader('Access-Control-Expose-Headers', 'x-auth');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();

});



//CRUD Operations

//GET METHODS
//getAll
app.get('/kingdoms' , Authenticate, (req,res,next) => {

  Kingdom.find().then((kingdom) => {
    //console.log(kingdom);
    res.send(kingdom);
  }, (err) => {
    res.status(400).send(e);
  })
})


//
app.get('/kingdoms/:creator',  Authenticate, (req,res,next) => {

  var id = req.params.creator;
  console.log('/kingdoms/:creator' + id);
  Kingdom.find({
    _creator: id //req.user._id
  }).then((kingdoms) => {
    console.log(kingdoms);
    res.send(kingdoms);
  }, (err) => {
    res.status(400).send(e);
  })
})

app.get('/kingdom/:id' ,  Authenticate, (req,res,next) => {

  var id = req.params.id;
  console.log('/kingdom/:id' + id);
  Kingdom.findOne({
    _id: id //req.user._id
  }).then((kingdom) => {
    console.log('kingdom OK');
    res.send(kingdom);
  }, (err) => {
    res.status(400).send(e);
  })
})

app.get('/kingdom/:creator/:name' ,  Authenticate, (req,res,next) => {

    var id = req.params.creator;
    var name = req.params.name;
    console.log('/kingdom/:creator' + id);
    Kingdom.findOne({
        _creator: id, //req.user._id
        name: name
    }).then((kingdom) => {
        //console.log(kingdom);
        res.send(kingdom);
    }, (err) => {
        res.status(400).send(e);
    })
})


//POST METHODS

//New User
app.post('/signup', (req, res,next) => {

    var newUser = new User(
        _.pick(req.body, [
            'name',
            'email',
            'password'
        ])
    );

    console.log(newUser);

    newUser.save().then( () => {
        return newUser.generateAuthToken();
    }).then((token) => {
        console.log(token);
        res.header('x-auth', token).send(newUser);
    }).catch( (e) => {
        console.log(e);
        res.status(400).send(e);
    })
    
});

app.post('/signin', (req, res,next) => {
   
    var body = _.pick(req.body, ['email','password']);
    //console.log(body.email + '<--->' +body.password);
    User.findByCredentials(body.email, body.password).then( (user) => {

        return user.generateAuthToken().then((token) => {

            res.header('x-auth', token).send(user);
        });
    }).catch( (e) => {
        console.log(e);
        if(e.message === '404'){
            res.status(404).send(e);
        }else{
            res.status(401).send(e);
        }
    })
        
})

//New Kingdom
app.post('/kingdoms/:creator', (req, res,next) => {

    var creator = req.params.creator;
    let newKingdom =  _.pick(req.body, ['name','size', 'alignment', 'capital', 'ruler',
                                        'unrest','bps',
                                        'promotion', 'taxation', 'holiday'
                                        , 'economy', 'loyalty', 'stability',
                                        'leaders',
                                        'cities']);
    console.log(newKingdom);
    var kingdom = new Kingdom(newKingdom);
    kingdom._creator = creator;

    kingdom.save().then( (doc) => {
        console.log(doc);
        res.send(doc);
    }, (e) => {
        console.log(e);
        res.status(400).send(e);
    })

})


//PUT METHODS

//Put kingdom
app.put('/kingdom/:id/:idc', (req, res,next) => {
  var id = req.params.id;
  var idc = req.params.idc;
  console.log('BODY:::'+id + ' creator: ' + idc);

  let body =  _.pick(req.body, ['size','unrest','bps', 'promotion', 'taxation', 'holiday', 'economy', 'loyalty', 'stability']);
  //body = JSON.stringify(body);
  console.log(body);

  if (!ObjectID.isValid(id)) {
      return res.status(404).send();
  }

  if (body) {
    Kingdom.findOneAndUpdate({
        _id: id,
        _creator: idc //req.user._id
    },
    {
        $set: body
    },
    {
        new: true
    }).then((kingdom) => {
        if (!kingdom) {
            return res.status(404).send();
        }
        console.log('Sending kingdom');
        console.log(kingdom);
        res.send(kingdom);
    }).catch((e) => {
        console.log('Update kingdom error');
        console.log(e);
        return res.status(400).send();
    });
  }
})


//PATCH METHODS
app.patch('/kingdom/leaders/:id/:idc', (req, res,next) => {
  var id = req.params.id;
  var idc = req.params.idc;
  for (let index = 0; index < req.body.length; index++) {
    console.log(req.body[index]);

  }
  console.log('BODY:::patch');
  // var body = _.pick(req.body, ['leaders'])
  // console.log('id' + id);
 const leaders = {"leaders" : req.body};
 console.log(JSON.stringify(leaders));
  if (!ObjectID.isValid(id)) {
      return res.status(404).send();
  }

  if (req.body) {
    Kingdom.findOneAndUpdate({
        _id: id,
        _creator: idc //req.user._id
    },
    {
        $set: leaders
    },
    {
        new: true
    }).then((kingdom) => {
        if (!kingdom) {
            return res.status(404).send();
        }
        const leaders = kingdom.leaders;
        res.send({kingdom});
    }).catch((e) => {
        return res.status(400).send();
    });
  }
})

app.patch('/kingdom/districts/:id/:idc', (req, res,next) => {
    var id = req.params.id;
    var idc = req.params.idc;
   
    console.log('BODY:::District: ' + idc);
    //var body = _.pick(req.body, ['districts'])
    //console.log(body);
    const districts = req.body; //{ "<array>.$" : value }
    console.log(JSON.stringify(districts, 2));
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
  
    if (req.body) {
        Kingdom.findById(id, function (e, data) {
            //data.firstTierComment.id(_id1).secondTierComment.id(_id2).field = req.body.something;
            //console.log(data);
            data.cities[idc].districts = districts;
            data.save();
        }).then((kingdom) => {
            if (!kingdom) {
                return res.status(404).send();
            }
            res.send({kingdom});
        }).catch((e) => {
            return res.status(400).send();
        });
    }
  })

app.patch('/kingdom/cities/:id/:idc', (req, res,next) => {
  var id = req.params.id;
  var idc = req.params.idc;

  console.log('BODY:::');
  // var body = _.pick(req.body, ['leaders'])
  // console.log('id' + id);
 const cities = {"cities" : req.body};
 console.log(JSON.stringify(cities));
  if (!ObjectID.isValid(id)) {
      return res.status(404).send();
  }
  //return;
  if (req.body) {
    Kingdom.findOneAndUpdate({
        _id: id,
        _creator: idc //req.user._id
    },
    {
        $set: cities
    },
    {
        new: true
    }).then((kingdom) => {
        if (!kingdom) {
            return res.status(404).send();
        }
        const cities = kingdom.cities;
        res.send({cities});
    }).catch((e) => {
        return res.status(400).send();
    });
  }
})

app.patch('/kingdom/improvements/:id/:idc', (req, res,next) => {
  var id = req.params.id;
  var idc = req.params.idc;
  for (let index = 0; index < req.body.length; index++) {
    console.log(req.body[index]);
  }
  console.log('BODY:::');
  // var body = _.pick(req.body, ['leaders'])
  // console.log('id' + id);
 const improvements = {"improvements" : req.body};
 console.log(JSON.stringify(improvements));
  if (!ObjectID.isValid(id)) {
      return res.status(404).send();
  }

  if (req.body) {
    Kingdom.findOneAndUpdate({
        _id: id,
        _creator: idc //req.user._id
    },
    {
        $set: improvements
    },
    {
        new: true
    }).then((kingdom) => {
        if (!kingdom) {
            return res.status(404).send();
        }
        const leaders = kingdom.leaders;
        res.send({kingdom});
    }).catch((e) => {
        return res.status(400).send();
    });
  }
})


//DELETE METHODS


//OTHER METHODS

app.listen(port, ()=> {
    console.log(`Started on port ${port}`);
});


module.exports = {app};
