var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({

  title: {
    type: String,
    required: true,
	  unique: true,
  },
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  }
  teamMembers: {
    type: [Schema.Types.ObjectId],
    ref: 'User'//,
    //require:true
  },
  taskNumber: Number //this is justa  fiel for counting tasks, it shouldn't represent real number of tasks(it won't decrease if task is deleted!)
  created:{
    type: Date,
    default: Date.now()
  }
});

projectSchema.pre('save', function(next) {
  console.log(this.project);
	this.taskNumber = 0;
	next();
});

var Project = mongoose.model('Project', projectSchema);
