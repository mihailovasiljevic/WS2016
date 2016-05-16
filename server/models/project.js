var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({

  title: {
    type: String,
    required: true,
	unique: true,
  },
  taskNumber: Number,

});

projectSchema.pre('save', function(next) {
	
	this.taskNumber = 0;
	next();
});

var Project = mongoose.model('Project', projectSchema);
module.exports = Project;