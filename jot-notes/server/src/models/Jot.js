import { Schema, VirtualType } from "mongoose";
export const JotSchema = new Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    body: { type: String, required: true, minLength: 15, maxLength: 100000 },
    tags: { type: [String], minLength: 1, maxLength: 500 },
    color: { type: String },
    private: { type: Boolean, default: false, required: true },
    createdAt: { type: Date, required: true },
    editedAt: { type: Date, required: true },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    notebookIds: { type: [Schema.ObjectId], ref: 'Notebook' }
}, {
    timestamps: true, toJSON: { virtuals: true }
})

JotSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

JotSchema.virtual('notebooks', {
    localField: 'notebookIds',
    ref: 'Notebook',
    foreignField: '_id',
    count: true
})