import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";


class JotService {
    async getJot(jotId, accountId) {
        const jot = await dbContext.Jot.findById(jotId)
        if (!jot) throw new Error('Unable to find jot')
        if (jot.private = true && jot.creatorId != accountId) throw new Forbidden('You cannot access private data that is not yours')
        jot.populate('creator notebooks')
        return jot
    }
    async createJot(jotdata) {
        const jot = await dbContext.Jot.create(jotdata)
        jot.populate('creator')
        return jot
    }
    async getUserJots(accountId) {
        const jots = await dbContext.Jot.find({ creatorId: accountId }).populate('creator notebooks')
        if (!jots) throw new Error('Cannot find jots')
        return jots
    }
    async getProfileJots(profileId) {
        const jots = await dbContext.Jot.find({ creatorId: profileId, private: false }).populate('creator notebooks')
        if (!jots) throw new Error('Cannot find jots')
        return jots
    }
    async getPublicJots() {
        const jots = await dbContext.Jot.find({ private: false }).populate('creator notebooks')
        if (!jots) throw new Error('Cannot find public jots')
        return jots
    }
    async updateJot(body, jotId) {
        throw new Error("Method not implemented.");
    }
    async trashJot(jotId) {
        throw new Error("Method not implemented.");
    }

}

export const jotService = new JotService()