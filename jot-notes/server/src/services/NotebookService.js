import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";


class NotebookService {

    async getNotebook(notebookId) {
        const notebook = await dbContext.Notebook.find({ _id: notebookId }).populate('creator jots')
        if (!notebook) throw new Error('Notebook not found')
        return notebook
    }
    async getPublicNotebooks() {
        const notebooks = await dbContext.Notebook.find({ private: false }).populate('creator jots')
        if (!notebooks) throw new Error('No public notebooks found')
        return notebooks
    }
    async getUserNotebooks(accountId) {
        const notebooks = await dbContext.Notebook.find({ creatorId: accountId }).populate('creator jots')
        if (!notebooks) throw new Error('Create your first notebook')
        return notebooks
    }
    async getProfileNotebooks(profileId) {
        const notebooks = await dbContext.Notebook.find({ creatorId: profileId, private: false }).populate('creator jots')
        if (!notebooks) throw new Error('No public notebooks found for this user')
        return notebooks
    }
    async createNotebook(notebookData) {
        const notebook = await dbContext.Notebook.create(notebookData)
        return notebook
    }
    async updateNotebook(accountId, notebookData, notebookId) {
        const bookupdate = await dbContext.Notebook.findById(notebookId)
        if (!bookupdate) throw new Error('Did not find notebook to update')
        if (bookupdate.creatorId != accountId) throw new Error('You cannot updated what is not yours')
        bookupdate.name = notebookData.name ?? bookupdate.name
        bookupdate.body = notebookData.body ?? bookupdate.body
        bookupdate.coverImg = notebookData.coverImg ?? bookupdate.coverImg
        bookupdate.tags = notebookData.tags ?? bookupdate.tags
        bookupdate.color = notebookData.color ?? bookupdate.color
        bookupdate.private = notebookData.private ?? bookupdate.private
        bookupdate.editedAt = notebookData.editedAt ?? bookupdate.editedAt
        bookupdate.jotIds = notebookData.jotIds ?? bookupdate.jotIds
        bookupdate.populate('creator jots')
        await bookupdate.save()
        return bookupdate
    }
    async trashNotebook(notebookId, accountId) {
        const trash = await dbContext.Notebook.findById(notebookId)
        trash.populate('creator')
        if (!trash) throw new Error('Unable to delete what is not found')
        if (trash.creatorId != accountId) throw new Forbidden('You cannot delete what is not yours')
        await trash.deleteOne()
        return `notebook ${trash.name} is deleted`
    }

}

export const notebookService = new NotebookService()