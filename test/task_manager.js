let expect = require("chai").expect;
require('../app');
let ObjectId = require("mongoose").mongo.ObjectId
let CategoryService = require("../services/category");

describe("Task Manager - Automated Test", function () {
    describe("Testing Category Service", function () {
        let Category = {"name": "Test Category", "description": "Test Description"}
        it("Add Category", function (done) {
            CategoryService.add(Category).then((result) => {
                setTimeout(function () {
                    Category['_id'] = result['_id']
                    expect(result).to.have.property('_id')
                    done()
                }, 2000)

            }).catch(done);
        });
        it("Update Category", function (done) {
            CategoryService.update(ObjectId(Category['_id']), {"description": "Test Description Updated"}).then((result) => {
                expect(result.description).equal('Test Description Updated');
                setTimeout(function () {
                    done()
                }, 1000);
            }).catch(done);
        });
        it("Load Categories", function (done) {
            CategoryService.load().then((result) => {
                setTimeout(function () {
                    expect(result).to.have.length.gt(0);
                    expect(result[0]).to.have.property('_id');
                    done()
                }, 1000);
            }).catch(done);
        });
        it("Delete Category", function (done) {
            CategoryService.remove(ObjectId(Category['_id'])).then((result) => {
                setTimeout(function () {
                    expect(result).equal(true);
                    done()
                }, 1000);
            }).catch(done);
        });
    });
});