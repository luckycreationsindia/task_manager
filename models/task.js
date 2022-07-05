const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    project: {type: Schema.Types.ObjectId, ref: 'Project'},
    parent: {type: Schema.Types.ObjectId, ref: 'Task'},
    name: {type: String, required: true},
    description: {type: String},
    startDate: {type: Schema.Types.Date},
    endDate: {type: Schema.Types.Date},
    assignees: {type: [{type: Schema.Types.ObjectId, ref: 'User'}], default: []},
    notification: {type: Boolean, default: true},
    files: {type: [String], default: []},
    remarks: {type: String},
    status: {type: Boolean, required: true, default: false},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true, collection: 'tasks', toJSON: {virtuals: true}, toObject: {virtuals: true}});

TaskSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Task', TaskSchema, "tasks");