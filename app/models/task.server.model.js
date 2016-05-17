var mongoose = require('mongoose'),
    Project = require('mongoose').model('Project'),
    Schema = mongoose.Schema;

var taskSchema = new Schema({

  mark: {
    type: String,
    required: 'You have to insert mark',
	  unique: true,
  },
  title: {
	   type: String,
	   required: 'You have to insert title',
  },
  description: String,
  project: {
    type: Schema.Types.ObjectId,
	   ref: 'Project',
     required:'You have to pick a project.'
  },
  author: {
    type: Schema.Types.ObjectId,
	  ref: 'User',
	  require:'You have to insert author'
  },
  assignedFor: {
  	type: Schema.Types.ObjectId,
  	ref: 'User',
    required: 'You have to insert who is task assigned for.'
  },
  ordinalNumber: {
  	type: Number,
    default: 0
  },
  createdAt: {
  	type: Date,
  	default: Date.now,
  },
  updatedAt: {
  	type: Date,
  },
  finishedAt: {
  	type: Date,
  },

  comments: [{
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
	}
  }],

  priority: {
    type: String,
    enum: ['blocker', 'critical', 'major', 'minor', 'trivial']
  },

  status: {
    type: String,
    enum: ['todo', 'progress', 'verify', 'done']
  }

});

taskSchema.pre('save', function(next) {
	this.updatedAt = new Date();
  this.ordinalNumber = this.ordinalNumber + 1;
	next();
});

var Task = mongoose.model('Task', taskSchema);
