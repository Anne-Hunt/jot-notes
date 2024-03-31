import { AppState } from "../AppState.js";
import { JotController } from "../controllers/JotController.js";
import { Jot } from "../models/Jots.js";
import { getFormData } from "../utils/FormHandler.js";
import { saveState, loadState } from "../utils/Store.js";

class JotService {

  createJot(jotData) {
    // console.log('service passing data')
    let createdJot = new Jot(jotData)
    // console.log('serviced data', jotData)
    AppState.jots.push(createdJot)
    // console.log('created a jot', jotData)
    this.saveJots()
    this.setActiveJot(createdJot.id)
    this.noteCount()
  }

  setActiveJot(id) {
    let activeJot = AppState.jots.find(jot => jot.id == id)
    activeJot.editedAt = new Date()
    // console.log('jot is found')
    this.saveJots()
    AppState.activeJot = activeJot
    this.characterCount()
    this.wordCount()
    // console.log('jot is active', activeJot)
  }

  updateJot(jotBody) {
    let activeJot = AppState.activeJot
    // console.log('jot is found for editing')
    activeJot.body = jotBody
    this.saveJots()
    // console.log('body is saved')
  }

  updateJotName(nameChangerContent) {
    let activeJot = AppState.activeJot
    activeJot.name = nameChangerContent
    console.log('jot name updated', activeJot)
    this.saveJots()
  }

  updateJotColor(jotcolor) {
    let activeJot = AppState.activeJot
    activeJot.color = jotcolor
    console.log('jot color updated', activeJot)
    this.saveJots()
  }

  noteCount() {
    AppState.noteCount = AppState.jots.length
    // console.log(AppState.noteCount)
  }

  characterCount() {
    let countable = AppState.activeJot.body
    let count = countable.split('')
    AppState.characterCount = count.length
    console.log('count', countable, count, count.length)
  }

  wordCount() {
    let countable = AppState.activeJot.body
    let count = countable.split(' ')
    AppState.wordCount = count.length
    console.log('count', countable, count, count.length)
  }

  deleteJot(activeId) {
    const indexedJot = AppState.jots.findIndex(jot => jot.id == activeId)
    AppState.jots.splice(indexedJot, 1)
    // console.log('deleted', activeId)
    AppState.activeJot = null
    this.saveJots()
  }

  autoSaveOn() {
    if (AppState.intervalID != null) {
      // @ts-ignore
      AppState.intervalID = setInterval(JotController.autoUpdateJot, 10000)
    }
  }

  autoSaveOff() {
    AppState.intervalID = clearInterval(AppState.intervalID)
    AppState.intervalID = null
  }

  saveJots() {
    saveState('jots', AppState.jots)
    saveState('activeJot', AppState.activeJot)
  }

  loadJots() {
    const jotsLocal = loadState('jots', [Jot])
    AppState.jots = jotsLocal
    // const activeLocal = loadState('activeJot', AppState.activeJot)
    // AppState.activeJot = activeLocal
  }
}

export const jotService = new JotService()