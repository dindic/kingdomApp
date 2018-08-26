const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

//-----------------------
//      SCHEMA
//-----------------------

var UserSchema = new mongoose.Schema( {
    _id:{ required: true, type: mongoose.Schema.Types.ObjectId},
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

//-----------------------
//   INSTANCE METHODS
//-----------------------
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email', 'name']);
}


UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET, { expiresIn: (60*60*24) }).toString();

    user.tokens.push({ access, token });
    console.log(user.tokens);
    return user.save().then( () => {
        return token;
    })
};

UserSchema.methods.removeToken = function (token) {
    var user = this;
    return user.update({
        $pull: {
            tokens: {
                token: token
            }
        }
    });
}

//-----------------------
//     MODEL METHODS
//-----------------------

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {

        decoded = jwt.verify(token, process.env.JWT_SECRET);

    } catch (e) {
        console.log(e);
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token' : token,
        'tokens.access': 'auth'
    });
    
};

UserSchema.statics.findByCredentials = function (email, password) {

    var User = this;
    
    return User.findOne({email: email}).then( (user) => {
       
        if(!user) {
            return Promise.reject(new Error('404'));
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err,res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject(new Error('401'));
                }
            })
            
        })
    })
}

//-----------------------
//     MIDDLEWARE
//-----------------------
UserSchema.pre('save', function (next){
    var user = this;

    if(user.isModified('password')) {
          
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

//-----------------------
//      EXPORTS
//-----------------------

var User = mongoose.model('User', UserSchema)

module.exports = {User};