import BaseController from "../utils/BaseController.js";


export class JotController extends BaseController {
    constructor() {
        super('api/jots')
        this.router
            .get('', this.getPublicJots)
            .post('', this.createJot)
            .put('/:jotId', this.updateJot)
            .delete('/:jotId', this.trashJot)
    }
    async createJot(request, response, next) {
        throw new Error("Method not implemented.");
    }
    async getPublicJots(request, response, next) {
        throw new Error("Method not implemented.");
    }
    async updateJot(request, response, next) {
        throw new Error("Method not implemented.");
    }
    async trashJot(request, response, next) {
        throw new Error("Method not implemented.");
    }

}