var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({

  title: {
    type: String,
    required: true,
	  unique: true,
  },
  teamMembers: {
    type: [Schema.Types.ObjectId],
    ref: 'User'//,
    //require:true
  },
  taskNumber: Number,

});

projectSchema.pre('save', function(next) {
	this.taskNumber = 0;
	next();
});

var Project = mongoose.model('Project', projectSchema);
