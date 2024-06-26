import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Jot } from '../models/Jot.js'
import { Notebook } from '../models/Notebook.js'
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

  async getAccountNotebooks() {
    const response = await api.get('account/notebooks')
    const userbooks = response.data.map(books => new Notebook(books))
    AppState.notebooks = userbooks
  }
}

export const accountService = new AccountService()
