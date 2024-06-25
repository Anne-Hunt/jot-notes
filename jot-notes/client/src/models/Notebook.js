import { generateId } from "../utils/GenerateId.js"


export class Notebook {

    //** @param {{id, name, body, tags, color}} data */

    constructor(data) {
        this.id = generateId()
        this.name = data.name
        this.body = data.body || ''
        this.coverImg = data.coverImg
        this.color = data.color
        this.tags = data.tags
        this.private = data.private
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.jotsId = data.jotsId
        this.jots = data.jots
        this.createdAt = data.createdAt == undefined ? new Date() : new Date(data.createdAt)
        this.editedAt = data.editedAt == undefined ? new Date() : new Date(data.editedAt)
    }
}