const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: {type: String, required: true},
    status: {type: Boolean, required: true, default: true},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true, collection: 'comments', toJSON: {virtuals: true}, toObject: {virtuals: true}});

CommentSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Comment', CommentSchema, "comments");