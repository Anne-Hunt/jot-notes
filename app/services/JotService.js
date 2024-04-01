import { AppState } from "../AppState.js";
import { JotController } from "../controllers/JotController.js";
import { Jot, Notebook } from "../models/Jots.js";
import { saveState, loadState } from "../utils/Store.js";

class JotService {
  sortByNotebooks() {
    for (let i = 0; i < AppState.notebooks.length; i++) {
      let notebookId = AppState.notebooks[i].id
    }
  }

  createJot(jotData) {
    // console.log('service passing data')
    let createdJot = new Jot(jotData)
    // console.log('serviced data', jotData)
    AppState.jots.push(createdJot)
    console.log('created a jot', jotData)
    this.saveAll()
    this.setActiveJot(createdJot.id)
    this.noteCount()
  }

  setActiveJot(id) {
    let activeJot = AppState.jots.find(jot => jot.id == id)
    activeJot.editedAt = new Date()
    // console.log('jot is found')
    this.saveAll()
    AppState.activeJot = activeJot
    this.characterCount()
    this.wordCount()
    this.createNotebookChanger()
    // console.log('jot is active', activeJot)
  }

  updateJot(jotBody) {
    let activeJot = AppState.activeJot
    // console.log('jot is found for editing')
    activeJot.body = jotBody
    this.saveAll()
    // console.log('body is saved')
  }

  updateJotName(nameChangerContent) {
    let activeJot = AppState.activeJot
    activeJot.name = nameChangerContent
    console.log('jot name updated', activeJot)
    this.saveAll()
  }

  updateJotColor(jotcolor) {
    let activeJot = AppState.activeJot
    activeJot.color = jotcolor
    console.log('jot color updated', activeJot)
    this.saveAll()
  }

  updateJotNotebook(notebook) {
    let activeJot = AppState.activeJot
    activeJot.notebook = notebook
    console.log('jot notebook updated', activeJot)
    this.saveAll()
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
    this.saveAll()
  }

  createNotebook(notebookData) {
    // console.log('service passing data')
    let createdNotebook = new Notebook(notebookData)
    // console.log('serviced data', jotData)
    AppState.notebooks.push(createdNotebook)
    // console.log('created a jot', jotData)
    this.saveAll()
    this.noteCount()
  }

  setActiveNotebook(id) {
    AppState.notebookListContent = ''
    let activeNotebook = AppState.notebooks.find(notebook => notebook.id == id)
    AppState.activeNotebook = activeNotebook
    console.log('found notebook', activeNotebook, AppState.activeNotebook)
    this.setActiveNotebookList(id)
    this.saveAll()
  }

  setActiveNotebookList(id) {
    console.log(AppState.activeNotebook.id, id)
    console.log(AppState.jots)

    AppState.notebookJotList = AppState.jots.filter(jot => jot.notebook == AppState.activeNotebook.id)
    console.log(AppState.notebookJotList)
    AppState.notebookJotList.forEach(jot => AppState.notebookJotListContent += jot.JotListTemplate)
    this.saveAll()
  }

  notebookCount() {
    AppState.notebooklistcount = AppState.notebooks.length
    console.log(AppState.notebooklistcount)
  }

  createNotebookChanger() {
    let notebookChangerContent = ''
    AppState.notebooks.forEach(notebook => notebookChangerContent += notebook.NotebookSelectOption)
    AppState.notebookChangerOptionList = notebookChangerContent
    this.saveAll()
  }

  deleteNotebook(notebookId) {
    const indexedJot = AppState.notebooks.findIndex(notebook => notebook.id == notebookId)
    AppState.notebooks.splice(indexedJot, 1)
    // console.log('deleted', activeId)
    AppState.activeNotebook = null
    this.saveAll()
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

  saveAll() {
    saveState('jots', AppState.jots)
    saveState('notebooks', AppState.notebooks)
    saveState('activeJot', AppState.activeJot)
    saveState('activeNotebook', AppState.activeNotebook)
  }

  loadAll() {
    const jotsLocal = loadState('jots', [Jot])
    AppState.jots = jotsLocal
    const notebooksLocal = loadState('notebooks', [Notebook])
    AppState.notebooks = notebooksLocal
    const activeLocal = loadState('activeJot', [Jot])
    AppState.activeJot = activeLocal
    const activeNLocal = loadState('activeNotebook', [Notebook])
    AppState.activeNotebook = activeNLocal
  }
}

export const jotService = new JotService()