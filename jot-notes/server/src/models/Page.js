import { Schema } from "mongoose";


export const PageSchema = new Schema({
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    jotId: { type: Schema.ObjectId, required: true, ref: 'Jot' },
    notebookId: { type: Schema.ObjectId, required: true, ref: 'Notebook' }
},
    { timestamps: true, toJSON: { virtuals: true } })

PageSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

PageSchema.virtual('notebook', {
    localField: 'notebookId',
    ref: 'Notebook',
    foreignField: '_id',
    justOne: true
})

PageSchema.virtual('jot', {
    localField: 'jotId',
    ref: 'Jot',
    foreignField: '_id',
})