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
    jotService.loadJots()
    this.drawNoteCount()
  }

  drawNoteCount() {
    jotService.noteCount()
    let noteCountElem = document.getElementById('note-count')
    let noteCountContent = Jot.noteCountTemplate
    noteCountElem.innerHTML = noteCountContent
  }

  createJot() {
    event.preventDefault()
    // console.log('controller accessing formdata')
    const form = event.target
    let jotData = getFormData(form)
    // console.log('data processed in service', jotData)
    jotService.createJot(jotData)
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

  drawJotList() {
    // console.log('accessing jotlist draw')
    let jotList = AppState.jots
    let JotListContent = ''
    jotList.forEach(jot => JotListContent += jot.ListTemplate)
    let jotListELem = document.getElementById('jot-list')
    jotListELem.innerHTML = JotListContent
  }

  setActiveJot(id) {
    // console.log('setting active in controller', id)
    jotService.setActiveJot(id)
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


