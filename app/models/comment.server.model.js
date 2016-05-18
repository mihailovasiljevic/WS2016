var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var commentSchema = new Schema({   
  mark: {
    type: String,        //AUTHOR_USERNAME+TASK_MARK+comment_counter
    requred: true
  } , 
	author: {
	  type: Schema.Types.ObjectId,
      ref: 'User',
      required:true
	},
	text: {
    type: String,
    required: 'You have to insert comment text.'
  },
  createdAt: {
      type: Date,
      default: Date.now,
   },
  updatedAt: {
  	type: Date,
  },
  ordinalNumber:{
    type:Number,
    default:0
  }
});

commentSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    this.ordinalNumber = this.ordinalNumber + 1;
	next();
});

var Comment = mongoose.model('Comment', commentSchema);