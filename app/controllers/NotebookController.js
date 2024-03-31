import { AppState } from "../AppState.js"
import { jotService } from "../services/JotService.js"
import { Jot } from "../models/Jots.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"

export class JotController {
  constructor() {
    // console.log('JotController has awakened')
    AppState.on('jots', this.drawJotList, this.drawNoteCount)
    AppState.on('activeJot', this.drawActiveJot)
    AppState.on('wordCount', this.drawActiveJot)
    jotService.loadAll()
    this.drawNoteCount()
    this.drawJotListBtn()
    this.drawActiveJot()
  }

  createJot() {
    event.preventDefault()
    // console.log('controller accessing formdata')
    const form = event.target
    console.log(FormData)
    let jotData = getFormData(form)
    // console.log('data processed in service', jotData)
    jotService.createJot(jotData)
    this.drawJotListBtn()
    this.drawNoteCount()
    // @ts-ignore
    form.reset()
  }

  updateJot() {
    event.preventDefault()
    const textBodyElem = event.target
    // console.log('controller updating jot data')
    // @ts-ignore
    const bodyContent = textBodyElem.value
    // console.log('sending textbody to service', bodyContent)
    jotService.updateJot(bodyContent)
  }

  autoUpdateJot() {
    const textBodyElem = document.getElementById('body')
    // console.log('controller updating jot data')
    // @ts-ignore
    const bodyContent = textBodyElem.value
    // console.log('sending textbody to service', bodyContent)
    jotService.updateJot(bodyContent)
    console.log(bodyContent)
  }

  updateJotColor(colorchangervalue) {
    event.preventDefault()
    // const jotColorPickerElem = event.target
    // @ts-ignore
    const jotColorContent = colorchangervalue
    jotService.updateJotColor(jotColorContent)
    this.drawActiveJot()
  }

  updateJotName(namechangervalue) {
    event.preventDefault()
    // const nameChangerElem = event.target
    // @ts-ignore
    const nameChangerContent = namechangervalue
    jotService.updateJotName(nameChangerContent)
    this.drawActiveJot()

  }

  updateJotNotebook(jotNotebook) {

  }

  createNotebook() {
    event.preventDefault()
    // console.log('controller accessing formdata')
    const form = event.target
    console.log(FormData)
    let notebookData = getFormData(form)
    // console.log('data processed in service', jotData)
    jotService.createNotebook(notebookData)
    this.drawNotebookList()
    this.drawJotListBtn()
    this.drawNoteCount()
    // @ts-ignore
    form.reset()
  }

  setActiveJot(id) {
    // console.log('setting active in controller', id)
    jotService.setActiveJot(id)
  }

  drawNotebookList() {
    // console.log('accessing notebook draw')
    let notebooks = AppState.notebooks
    let NotebookListContent = ''
    notebooks.forEach(notebook => NotebookListContent += notebook.NotebookListTemplate)
    let notebookELem = document.getElementById('notebook-list')
    notebookELem.innerHTML = NotebookListContent
  }


  drawNoteCount() {
    jotService.noteCount()
    let noteCountElem = document.getElementById('note-count')
    let noteCountContent = Jot.NoteCountTemplate
    noteCountElem.innerHTML = noteCountContent
  }

  drawJotListBtn() {
    let jotListBtnElem = document.getElementById('jot-list-btn')
    let jotListBtnContent = Jot.JotListBtnTemplate
    jotListBtnElem.innerHTML = jotListBtnContent
  }

  drawJotList() {
    // console.log('accessing jotlist draw')
    let jotList = AppState.jots
    let JotListContent = ''
    jotList.forEach(jot => JotListContent += jot.ListTemplate)
    let jotListELem = document.getElementById('jot-list')
    jotListELem.innerHTML = JotListContent
  }

  drawActiveJot(id) {
    // console.log('controller sending', id)
    let activeJotContent = ''
    let activeJotELem = document.getElementById('active-jot')
    if (AppState.activeJot != null) {
      let activeJot = AppState.activeJot
      let activeJotContent = activeJot.ActiveTemplate
      activeJotELem.innerHTML = activeJotContent
    } else {
      activeJotELem.innerHTML = activeJotContent
    }
  }

  autoSaveOn() {
    jotService.autoSaveOn()
    console.log('on')
  }

  autoSaveOff() {
    jotService.autoSaveOff()
    console.log('off')
  }

  deleteJot(jotId) {
    // console.log('ask to be sure')
    window.confirm("Do you really want to permanently delete this Jot?")
    if (true) {
      jotService.deleteJot(jotId)
      this.drawNoteCount()
    } else {
      return
    }
  }
}


