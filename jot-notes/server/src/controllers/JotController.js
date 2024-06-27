import { jotService } from "../services/JotService.js";
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
        try {
            const jot = await jotService.createJot(request.body)
            response.send(jot)
        } catch (error) {
            next(error)
        }
    }
    async getPublicJots(request, response, next) {
        try {
            const jot = await jotService.getPublicJots()
            response.send(jot)
        } catch (error) {
            next(error)
        }
    }
    async updateJot(request, response, next) {
        try {
            const jotId = request.params.jotId
            const jot = await jotService.updateJot(request.body, jotId)
            response.send(jot)
        } catch (error) {
            next(error)
        }
    }
    async trashJot(request, response, next) {
        try {
            const jotId = request.params.jotId
            const jot = await jotService.trashJot(jotId)
            response.send(jot)
        } catch (error) {
            next(error)
        }
    }

}