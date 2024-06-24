import { reactive } from 'vue'
import { Jot } from './models/Jot.js'
import { Notebook } from './models/Notebook.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /**@type {Jot[]} */
  jots =[],

  /**@type {Notebook[]} */
  notebooks =[],

  /**@type {Jot[]} */
  notebookJotList =[],

  notebookJotListContent = '',

  notebooklistcount = 0,

  notebookChangerOptionList = '',

  notebookListContent = '',

  activeNotebook = null,

  activeJot = null,

  intervalID = null,

  noteCount = 0,

  characterCount = 0,

  wordCount = 0

}
})