const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: {type: String, required: true},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    description: {type: String},
    status: {type: Boolean, required: true, default: true},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true, collection: 'groups', toJSON: {virtuals: true}, toObject: {virtuals: true}});

GroupSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Group', GroupSchema, "groups");