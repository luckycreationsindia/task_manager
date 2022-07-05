import {ObjectId} from "mongoose"

export type Group = {
    _id: ObjectId,
    name: string,
    users: string,
    description: string,
    status: boolean,
    createdBy: ObjectId
}

export type Category = {
    _id: ObjectId,
    name: string,
    description: string,
    groups: Array<ObjectId>,
    status: boolean,
    createdBy: ObjectId
}

export type Project = {
    _id: ObjectId,
    category: ObjectId,
    groups: Array<ObjectId>,
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    status: boolean,
    createdBy: ObjectId
}

export type Task = {
    _id: ObjectId,
    project: ObjectId,
    parent: ObjectId,
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    assignees: Array<ObjectId>,
    notification: boolean,
    files: Array<string>,
    remarks: string,
    status: boolean,
    createdBy: ObjectId
}