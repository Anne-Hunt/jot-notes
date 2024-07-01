import { AppState } from "../AppState.js";
import { Jot } from "../models/Jot.js";
import { api } from "./AxiosService.js";


class JotService {
    async setActiveJot(jotId) {
        const response = await api.get(`api/jots/${jotId}`)
        const jotresponse = new Jot(response.data)
        AppState.activeJot = jotresponse
    }
    async getPublicJots() {
      const response = await api.get('api/jots')
      const jotresponse = response.data.map(jotdata => new Jot(jotdata))
      AppState.jots = jotresponse
    }
    async editUserJot(jotdata) {
        const response = await api.put('api/jots', jotdata)
        const jotresponse = new Jot(response.data)
        const index = AppState.jots.findIndex(jot => jotresponse.id = jot.id)
        AppState.jots.splice(index, 1)
        AppState.jots.push(jotresponse)
    }

    async createJot(jotdata, dateNow){
        jotdata.creatorId = AppState.account.id
        jotdata.createdAt = dateNow
        jotdata.editedAt = dateNow
        const response = await api.post('api/jots', jotdata)
        const jotresponse = new Jot(response.data)
        AppState.jots.push(jotresponse)
    }

    async trashJot(jotId){
        await api.delete(`api/jots/${jotId}`)
        const trash = AppState.jots.findIndex(jot => jotId = jot.id)
        AppState.jots.splice(trash, 1)
    }
}

export const jotService = new JotService()