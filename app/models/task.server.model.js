var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({

  mark: {
    type: String,
    required: true,
	unique: true,
  },
  title: {
	type: String,
	required: true,
  },
  description: String,
  project: {
    type: Schema.Types.ObjectId,
	ref: 'Projekat',
  },
  author: {
    type: Schema.Types.ObjectId,
	ref: 'Korisnik',
	require:true
  },
  assignedFor: {
	type: Schema.Types.ObjectId,
	ref: 'Korisnik'
  },
  ordinalNumber: {
	type: Number,
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
      ref: 'Korisnik',
      require:true
	},
	text: String,
	createdAt: {
	  type: Date,
	  default: Date.now,
	}
  }],

  priority: {
    type: Array,
    default: ['blocker', 'critical', 'major', 'minor', 'trivial']
  },

  status: {
    type: Array,
    default: ['todo', 'progress', 'verify', 'done']
  },

});

taskSchema.pre('save', function(next) {

	this.updatedAt = new Date();
	next();
});

var Task = mongoose.model('Task', taskSchema);
