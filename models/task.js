const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    serviceId: {type: Schema.Types.ObjectId, ref: 'Service'},
    parent: {type: Schema.Types.ObjectId, ref: 'Task'},
    name: {type: String, required: true},
    description: {type: String},
    startDate: {type: Schema.Types.Date},
    endDate: {type: Schema.Types.Date},
    remarks: {type: String},
    assignTo: {type: Schema.Types.ObjectId, ref: 'User'},
    partner: {type: Schema.Types.ObjectId},
    notification: {type: Boolean, default: false},
    isPublic: {type: Boolean, default: false},
    files: {type: [String], default: []},
    status: {type: Number, required: true, default: 0},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true, collection: 'tasks', toJSON: {virtuals: true}, toObject: {virtuals: true}});

TaskSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Task', TaskSchema, "tasks");