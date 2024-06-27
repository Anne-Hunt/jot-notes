import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { notebookService } from '../services/NotebookService.js'
import { jotService } from '../services/JotService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.editUserAccount)
      .get('/jots', this.getAccountJots)
      .get('/notebooks', this.getAccountNotebooks)
  }
  async getAccountNotebooks(request, response, next) {
    try {
      const accountId = request.userInfo.id
      const notebooks = await notebookService.getUserNotebooks(accountId)
      response.send(notebooks)
    } catch (error) {
      next(error)
    }
  }
  async getAccountJots(request, response, next) {
    try {
      const accountId = request.userInfo.id
      const jots = await jotService.getUserJots(accountId)
      response.send(jots)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editUserAccount(req, res, next) {
    try {
      const accountId = req.userInfo.id
      req.body.id = accountId
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

}
