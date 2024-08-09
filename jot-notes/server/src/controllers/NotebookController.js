import { jotService } from "../services/JotService.js";
import { notebookService } from "../services/NotebookService.js";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";


export class NotebookController extends BaseController {
    constructor() {
        super('api/notebooks')
        this.router
            .get('', this.getPublicNotebooks)
            .get('/:notebookId', this.getNotebook)
            .get('/:notebookId/jots', this.getNotebookJots)
            .post('', this.createNotebook)
            .put('/:notebookId', this.updateNotebook)
            .delete('/:notebookId', this.trashNotebook)
    }
    async getNotebook(request, response, next) {
        try {
            const bookId = request.params.notebookId
            const notebook = await notebookService.getNotebook(bookId)
            logger.log('notebook', notebook)
            response.send(notebook)
        } catch (error) {
            next(error)
        }
    }
    async getPublicNotebooks(request, response, next) {
        try {
            const notebooks = await notebookService.getPublicNotebooks()
            response.send(notebooks)
        } catch (error) {
            next(error)
        }
    }

    async getNotebookJots(request, response, next) {
        try {
            const notebookId = request.params.notebookId
            const jots = await jotService.getJotsByNotebook(notebookId)
            response.send(jots)
        } catch (error) {
            next(error)
        }
    }
    async createNotebook(request, response, next) {
        try {
            const jot = await notebookService.createNotebook(request.body)
            response.send(jot)
        } catch (error) {
            next(error)
        }
    }

    async updateNotebook(request, response, next) {
        try {
            const accountId = request.userInfo.id
            const notebookId = request.params.notebookId
            const jot = await notebookService.updateNotebook(accountId, request.body, notebookId)
            response.send(jot)
        } catch (error) {
            next(error)
        }
    }
    async trashNotebook(request, response, next) {
        try {
            const accountId = request.userInfo.id
            const notebookId = request.params.notebookId
            const jot = await notebookService.trashNotebook(notebookId, accountId)
            response.send(jot)
        } catch (error) {
            next(error)
        }
    }

}