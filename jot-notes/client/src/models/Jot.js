
export class Jot {

    //** @param {{id, name, body, tags, color, notebook}} data */

    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.body = data.body
        this.tags = data.tags
        this.color = data.color
        this.private = data.private
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.notebookIds = data.notebookIds
        this.notebook = data.notebook
        this.createdAt = data.createdAt == undefined ? new Date() : new Date(data.createdAt)
        this.editedAt = data.editedAt == undefined ? new Date() : new Date(data.editedAt)
    }
}