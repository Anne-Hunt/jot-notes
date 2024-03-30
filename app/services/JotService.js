import { AppState } from "../AppState.js";
import { JotController } from "../controllers/JotController.js";
import { Jot } from "../models/Jots.js";
import { getFormData } from "../utils/FormHandler.js";
import { saveState, loadState } from "../utils/Store.js";

class JotService {
  noteCount() {
    AppState.noteCount += AppState.jots.length
    // console.log(AppState.noteCount)
  }

  createJot(jotData) {
    // console.log('service passing data')
    let createdJot = new Jot(jotData)
    // console.log('serviced data', jotData)
    AppState.jots.push(createdJot)
    // console.log('created a jot', jotData)
    this.saveJots()
    this.setActiveJot(createdJot.id)
  }

  setActiveJot(id) {
    let activeJot = AppState.jots.find(jot => jot.id == id)
    // console.log('jot is found')
    AppState.activeJot = activeJot
    this.saveJots()
    // console.log('jot is active', activeJot)
  }

  updateJot(jotBody) {
    let activeJot = AppState.activeJot
    // console.log('jot is found for editing')
    activeJot.body = jotBody
    this.saveJots()
    // console.log('body is saved')
  }

  deleteJot(activeId) {
    const indexedJot = AppState.jots.findIndex(jot => jot.id == activeId)
    AppState.jots.splice(indexedJot, 1)
    // console.log('deleted', activeId)
    AppState.activeJot = null
    this.saveJots()
  }

  saveJots() {
    saveState('jots', AppState.jots)
  }

  loadJots() {
    const jotsLocal = loadState('jots', [Jot])
    AppState.jots = jotsLocal
  }
}

export const jotService = new JotService()