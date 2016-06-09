var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({ //defining UserScehma object using Schema constructor

    username: {
        type: String,
        required: 'Username is required!',
        unique: 'Username is already taken.',
        trim: true
    },
    password: {
      type: String,
      validate:[
        function(password){
          return password && password.length > 7;
        }, 'Password must be at least 8 characters. '
      ]
    },
    salt: {
      type: String,
    },
    provider: { //what strategy is used to make a user (default : local)
      type: String,
      required: 'Provider is required'
    },
    providerId: String, //user identifire for authentication strategy
    providerData:{}, //used to store user object retrieved from OAuth providers
    created:{
      type: Date,
      default: Date.now
    },
    email: {
        type: String,
        required: true,
        unique: 'Email is already taken.',
        //this regex is made to validate email addresses by RFC2822 guidlines
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email']
    },
    firstName: String,
    lastName: String,
    role: {
        type: String,
        enum: ['admin', 'user']
    },
    projects:[{
      type: Schema.Types.ObjectId,
      ref: 'Project'//,      
    }],
    tasks:[{
      type: Schema.Types.ObjectId,
      ref: 'Project'//,      
    }]
});

UserSchema.virtual('fullName').get(function(){
  return this.firstName + ' ' + this.lastName;
}).set(function(fullName){
  var splitName = fullName.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName = splitName[1] || '';
});

UserSchema.pre('save', function(next){
  if(this.password){
    //create salt as a random 16 bytes add encrypt it with base64 encryption
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    // this.password is actually hashed password!
    this.password = this.hashPassword(this.password);
    // call the next method in chain
    next();
  }
})

UserSchema.methods.hashPassword = function(password){
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
  //using some crypting algorithm to hash password and return it back as string encoded wth base64 encryption
};

UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

UserSchema.methods.isAdmin = function() {
  if(this.role === 'admin') return true;
  else return false;
};

//this method is used to find a new unique username for new usersignu
UserSchema.statics.findUniqueUsername = function(username, suffic, callback){
  var that = this;
  var possibleUsername = username + (suffix || '');

  that.findOne({
    username: possibleUsername
  }, function(err, user){
    if(!err){
      if(!user){
        callback(possibleUsername);
      }else{
        return that.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    }else{
      callback(null);
    }
  });
};

UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

mongoose.model('User', UserSchema); //using Schema instance to define User model.
