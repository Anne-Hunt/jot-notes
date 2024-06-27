import { notebookService } from "../services/NotebookService.js";
import BaseController from "../utils/BaseController.js";


export class NotebookController extends BaseController {
    constructor() {
        super('api/notebooks')
        this.router
            .get('', this.getPublicNotebooks)
            .post('', this.createNotebook)
            .put('/:notebookId', this.updateNotebook)
            .delete('/:notebookId', this.trashNotebook)
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
            const notebookId = request.params.notebookId
            const jot = await notebookService.updateNotebook(request.body, notebookId)
            response.send(jot)
        } catch (error) {
            next(error)
        }
    }
    async trashNotebook(request, response, next) {
        try {
            const notebookId = request.params.notebookId
            const jot = await notebookService.trashNotebook(notebookId)
            response.send(jot)
        } catch (error) {
            next(error)
        }
    }

}