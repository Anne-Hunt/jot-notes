import { AppState } from "../AppState.js"
import { Notebook } from "../models/Notebook.js"
import { api } from "./AxiosService.js"


class NotebookService {
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
  
      async createNotebook(bookdata){
          bookdata.creatorId = AppState.account.id
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