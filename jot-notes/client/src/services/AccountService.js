import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Jot } from '../models/Jot.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getAccountJots() {
    const response = await api.get('account/jots')
    const userjots = response.data.map(jots => new Jot(jots))
    AppState.jots = userjots
  }
}

export const accountService = new AccountService()
