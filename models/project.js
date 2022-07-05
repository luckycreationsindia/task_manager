const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    groups: [{type: Schema.Types.ObjectId, required: true}],
    name: {type: String, required: true},
    description: {type: String},
    startDate: {type: Schema.Types.Date},
    endDate: {type: Schema.Types.Date},
    status: {type: Number, required: true, default: 0},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true, collection: 'projects', toJSON: {virtuals: true}, toObject: {virtuals: true}});

ProjectSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Project', ProjectSchema, "projects");