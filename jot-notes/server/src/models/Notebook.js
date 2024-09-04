import mongoose, { Schema, VirtualType } from "mongoose";
export const NotebookSchema = new Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    body: { type: String, required: true, minLength: 15, maxLength: 100000 },
    coverImg: { type: String },
    tags: { type: [String], minLength: 1, maxLength: 500 },
    color: { type: String },
    private: { type: Boolean, default: false, required: true },
    createdAt: { type: Date, required: true },
    editedAt: { type: Date, required: true },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    jotIds: { type: [Schema.ObjectId], ref: 'Jot' }
}, {
    timestamps: true, toJSON: { virtuals: true }
})

NotebookSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

NotebookSchema.virtual('jots', {
    localField: 'jotIds',
    ref: 'Jot',
    foreignField: '_id',
})

NotebookSchema.virtual('jotCount', {
    localField: 'jotIds',
    ref: 'Jot',
    foreignField: '_id',
    count: true
})