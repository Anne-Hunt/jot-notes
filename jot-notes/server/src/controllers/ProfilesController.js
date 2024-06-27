import { jotService } from '../services/JotService.js'
import { notebookService } from '../services/NotebookService.js'
import { profileService } from '../services/ProfileService.js'
import BaseController from '../utils/BaseController'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getProfiles)
      .get('/:id', this.getProfile)
      .get('/:profileId/jots', this.getProfileJots)
      .get('/:profileId/notebooks', this.getProfileNotebooks)
  }
  async getProfileNotebooks(request, response, next) {
    try {
      const profileId = request.params.profileId
      const notebooks = await notebookService.getProfileNotebooks(profileId)
      response.send(notebooks)
    } catch (error) {
      next(error)
    }
  }
  async getProfileJots(request, response, next) {
    try {
      const profileId = request.params.profileId
      const jots = await jotService.getProfileJots(profileId)
      response.send(jots)
    } catch (error) {
      next(error)
    }
  }

  async getProfiles(req, res, next) {
    try {
      const profiles = await profileService.findProfiles(req.query.name, req.query.offset)
      res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfileById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }
}
