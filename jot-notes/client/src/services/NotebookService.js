import { AppState } from "../AppState.js"
import { Jot } from "../models/Jot.js"
import { Notebook } from "../models/Notebook.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class NotebookService {
    async getNotebookJots(notebookId) {
        const response = await api.get(`api/notebooks/${notebookId}/jots`)
        const jots = response.data.map(jotdata => new Jot(jotdata))
        AppState.jots = jots
        logger.log(jots)
    }
    async getNotebookById(notebookId) {
        const response = await api.get(`api/notebooks/${notebookId}`)
        const notebook = new Notebook(response.data)
        AppState.activeNotebook = notebook
    }
    async getPublicNotebooks() {
        const response = await api.get('api/notebooks')
        const book = response.data.map(bookdata => new Notebook(bookdata))
        AppState.notebooks = book
      }
      async editUserNotebook(bookdata) {
          const response = await api.put('api/notebooks', bookdata)
          const book = new Notebook(response.data)
          const index = AppState.notebooks.findIndex(notebook => book.id = notebook.id)
          AppState.notebooks.splice(index, 1)
          AppState.notebooks.push(book)
      }
  
      async createNotebook(bookdata, dateNow){
          bookdata.creatorId = AppState.account.id
          bookdata.createdAt = dateNow
          bookdata.editedAt = dateNow
          const response = await api.post('api/notebooks', bookdata)
          const book = new Notebook(response.data)
          AppState.notebooks.push(book)
      }
  
      async trashNotebook(notebookId){
          await api.delete(`api/notebooks/${notebookId}`)
          const trash = AppState.notebooks.findIndex(notebook => notebookId = notebook.id)
          AppState.notebooks.splice(trash, 1)
      }
}

export const notebookService = new NotebookService()