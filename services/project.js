let Model = require('../models/project');
let APIError = require('../commons/APIError');
let ObjectId = require('mongoose').Schema.Types.ObjectId

/**
 * @typedef { import("../commons/types").Project } Project
 */

/**
 * Add to Database
 * @param {Project} data - Project information to Add in Database
 * @returns {Promise.<Project>} On Success will return the Project added to Database in Promise
 */
let add = (data) => {
    return new Promise((resolve, reject) => {
        let model = new Model(data);
        model.save().then((result) => {
            resolve(result)
        }).catch((err) => {
            if (err) {
                if (err['code'] === 11000) {
                    reject(new APIError("Already Exist", 400))
                }
                reject(new APIError(err['message'], 500))
            }
        });
    });
}

/**
 * Update Database
 * @param {ObjectId} id - ID of Item to update in database
 * @param {Project} data - Project information to Update in Database
 * @returns {Promise.<Project>} On Success will return the Project updated in Database in Promise
 */
let update = (id, data) => {
    return new Promise((resolve, reject) => {
        Model.findByIdAndUpdate(id, data, {new: true}).then((result) => {
            resolve(result)
        }).catch((err) => {
            if (err) reject(new APIError(err['message'], 500))
        });
    });
}

/**
 * Load from Database
 * @param {Object} [filters] - Map of filters to apply on loading
 * @param {Object} [projection] - Projection to apply for returning data
 * @param {Object} [options] - Other options
 * @returns {Promise.<Array<Project>>} On Success will return list of Project in Database as per parameters provided in Promise
 */
let load = (filters = {}, projection = {}, options = {}) => {
    return new Promise((resolve, reject) => {
        Model.find(filters, projection, options).then((result) => {
            resolve(result)
        }).catch((err) => {
            if (err) reject(new APIError(err['message'], 500))
        });
    });
}

/**
 * Delete Item from Database
 * @param {ObjectId} id - ID of Item to delete from database
 * @returns {Promise.<boolean>} - On Success will return true in Promise
 */
let remove = (id) => {
    return new Promise((resolve, reject) => {
        Model.findByIdAndDelete(id).then((result) => {
            resolve(true)
        }).catch((err) => {
            if (err) reject(new APIError(err['message'], 500))
        });
    });
}

module.exports = {
    add,
    update,
    load,
    remove
}