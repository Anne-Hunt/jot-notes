import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'
import { Jot } from './models/Jots.js'
import { loadState, saveState } from './utils/Store.js'

class ObservableAppState extends EventEmitter {

  /**@type {import('./models/Jots.js').Jot[]} */
  jots = []

  /**@type {import('./models/Jots.js').Notebook[]} */
  notebooks = []

  notebooklistcount = 0

  notebookChangerOptionList = ''

  activeNotebook = null

  activeJot = null

  intervalID = null

  noteCount = 0

  characterCount = 0

  wordCount = 0

}

export const AppState = createObservableProxy(new ObservableAppState())