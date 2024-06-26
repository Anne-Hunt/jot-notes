import { AppState } from "../AppState.js";
import { Jot } from "../models/Jot.js";
import { api } from "./AxiosService.js";


class JotService {
    async editUserJot(jotdata) {
        const response = await api.put('api/jot', jotdata)
        const jotresponse = new Jot(response.data)
        const index = AppState.jots.findIndex(jot => jotresponse.id = jot.id)
        AppState.jots.splice(index, 1)
        AppState.jots.push(jotresponse)
    }
}

export const jotService = new JotService()