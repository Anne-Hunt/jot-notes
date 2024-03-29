import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'
import { Jot } from './models/Jots.js'
import { loadState, saveState } from './utils/Store.js'

class ObservableAppState extends EventEmitter {

  /**@type {import('./models/Jots.js').Jot[]} */
  jots = [
    /*new Jot({
      name: 'Testing',
      body: 'A book is worth a words',
      color: '#B10DC9',
      tags: 'candy',
    }),
    new Jot({
      name: 'Second test',
      body: 'words are what a book is',
      color: '#F012BE',
      tags: 'cookies'
    })*/
  ]

  activeJot = null

  noteCount = 0
}

export const AppState = createObservableProxy(new ObservableAppState())