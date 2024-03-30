import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'
import { Jot } from './models/Jots.js'
import { loadState, saveState } from './utils/Store.js'

class ObservableAppState extends EventEmitter {

  /**@type {import('./models/Jots.js').Jot[]} */
  jots = []

  //** @param {{id, name, body, tags, color, createdAt, editedAt}} data */

  activeJot = null

  intervalID = null

  noteCount = 0

}

export const AppState = createObservableProxy(new ObservableAppState())