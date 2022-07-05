const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    groups: [{type: Schema.Types.ObjectId, required: true, ref: 'Group'}],
    status: {type: Boolean, required: true, default: true},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true, collection: 'categories', toJSON: {virtuals: true}, toObject: {virtuals: true}});

CategorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Category', CategorySchema, "categories");