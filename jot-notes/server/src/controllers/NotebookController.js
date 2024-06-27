import { notebookService } from "../services/NotebookService.js";
import BaseController from "../utils/BaseController.js";


export class NotebookController extends BaseController {
    constructor() {
        super('api/notebooks')
        this.router
            .get('', this.getPublicNotebooks)
            .get('/:notebookId', this.getNotebook)
            .post('', this.createNotebook)
            .put('/:notebookId', this.updateNotebook)
            .delete('/:notebookId', this.trashNotebook)
    }
    async getNotebook(request, response, next) {
        try {
            const accountId = request.userInfo.id
            const notebookId = request.params.notebookId
            const notebook = await notebookService.getNotebook(notebookId, accountId)
            response.send(notebook)
        } catch (error) {
            next(error)
        }
    }
    async getPublicNotebooks(request, response, next) {
        try {
            const jot = await notebookService.getPublicNotebooks()
            response.send(jot)
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