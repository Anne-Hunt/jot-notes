import { AppState } from "../AppState.js"
import { Jot } from "../models/Jot.js"
import { Notebook } from "../models/Notebook.js"
import { Profile } from "../models/Profile.js"
import { api } from "./AxiosService.js"


class ProfileService {
    async getProfileNotebooks(profileId) {
        const response = await api.get(`api/profile/${profileId}/notebooks`)
        const profilebooks = response.data.map(books => new Notebook(books))
        AppState.notebooks = profilebooks
    }

    async getProfileJots(profileId) {
        const response = await api.get(`api/profile/${profileId}/jots`)
        const profilejots = response.data.map(jots => new Jot(jots))
        AppState.jots = profilejots
    }

    async getProfile(profileId){
        const response = await api.get(`api/profile/${profileId}`)
        const profile = new Profile(response.data)
        AppState.activeProfile = profile
    }

}

export const profileService = new ProfileService()