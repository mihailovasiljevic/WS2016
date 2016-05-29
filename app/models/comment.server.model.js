var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var commentSchema = new Schema({   
    author: {
      type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    title:{
      type: String,
      required: 'Please insert title'
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
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    }
});


var Comment = mongoose.model('Comment', commentSchema);