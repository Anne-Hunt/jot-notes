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
    async createNotebook(request, response, next) {
        throw new Error("Method not implemented.");
    }
    async getPublicNotebooks(request, response, next) {
        throw new Error("Method not implemented.");
    }
    async updateNotebook(request, response, next) {
        throw new Error("Method not implemented.");
    }
    async trashNotebook(request, response, next) {
        throw new Error("Method not implemented.");
    }

}