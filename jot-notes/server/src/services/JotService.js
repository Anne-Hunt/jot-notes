import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";


class JotService {
    async getJotsByNotebook(notebookId) {
        const jots = await dbContext.Jot.find({ notebookIds: notebookId }).populate('creator notebooks')
        if (!jots) throw new Error('Unable to find jots')
        return jots
    }
    async getJot(jotId) {
        const jot = await dbContext.Jot.findById(jotId)
        if (!jot) throw new Error('Unable to find jot')
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
    async updateJot(jotdata, jotId) {
        const jotupdate = await dbContext.Jot.findById(jotId)
        if (!jotupdate) throw new Error('Did not find jot to update')
        // if (jotupdate.creatorId != accountId) throw new Error('You cannot updated what is not yours')
        jotupdate.name = jotdata.name ?? jotupdate.name
        jotupdate.body = jotdata.body ?? jotupdate.body
        jotupdate.tags = jotdata.tags ?? jotupdate.tags
        jotupdate.color = jotdata.color ?? jotupdate.color
        jotupdate.private = jotdata.private ?? jotupdate.private
        jotupdate.editedAt = jotdata.editedAt ?? jotupdate.editedAt
        jotupdate.notebookIds = jotdata.notebookIds ?? jotupdate.notebookIds
        jotupdate.populate('creator notebooks')
        await jotupdate.save()
        return jotupdate
    }
    async trashJot(jotId, accountId) {
        const trash = await dbContext.Jot.findById(jotId)
        if (!trash) throw new Error('Unable to find jot to delete')
        if (trash.creatorId != accountId) throw new Forbidden('You cannot delete what is not yours')
        await trash.deleteOne()
        return `Your jot ${trash.name} is deleted`
    }

}

export const jotService = new JotService()