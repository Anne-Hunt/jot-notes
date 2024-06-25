import { generateId } from "../utils/GenerateId.js"


export class Notebook {

    //** @param {{id, name, body, tags, color}} data */

    constructor(data) {
        this.id = generateId()
        this.name = data.name
        this.body = data.body || ''
        this.tags = data.tags
        this.color = data.color
        this.createdAt = data.createdAt == undefined ? new Date() : new Date(data.createdAt)
        this.editedAt = data.editedAt == undefined ? new Date() : new Date(data.editedAt)
        this.private = data.private
    }
}