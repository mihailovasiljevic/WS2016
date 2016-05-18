var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({

  title: {
    type: String,
    required: 'Title cannot be blank.',
	  unique: true,
    trim: true
  },
  teamMembers: {
    type: [Schema.Types.ObjectId],
    ref: 'User'//,
    //require:true
  },
  taskNumber: Number,
  created: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  tasks: {
    type: [Schema.ObjectId],
    ref: 'Task'
  }

});

projectSchema.pre('save', function(next) {
	this.taskNumber = 0;
	next();
});

var Project = mongoose.model('Project', projectSchema);
