import { AppState } from "../AppState.js"
import { Jot } from "../models/Jot.js"
import { api } from "./AxiosService.js"


class ProfileService {

    async getProfileJots(profileId) {
        const response = await api.get(`api/profile/${profileId}/jots`)
        const profilejots = response.data.map(jots => new Jot(jots))
        AppState.jots = profilejots
    }

}

export const profileService = new ProfileService()