const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    client: {type: Schema.Types.ObjectId},
    category: {type: Schema.Types.ObjectId},
    serviceType: {type: Schema.Types.ObjectId},
    name: {type: String, required: true},
    description: {type: String},
    startDate: {type: Schema.Types.Date},
    endDate: {type: Schema.Types.Date},
    deliveryManager: {type: Schema.Types.ObjectId},
    partner: {type: Schema.Types.ObjectId},
    status: {type: Number, required: true, default: 0},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true, collection: 'services', toJSON: {virtuals: true}, toObject: {virtuals: true}});

ServiceSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Service', ServiceSchema, "services");