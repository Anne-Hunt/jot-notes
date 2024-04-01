import { generateId } from "../utils/GenerateId.js"
import { AppState } from "../AppState.js"



export class Jot {

  //** @param {{id, name, body, tags, color, notebook}} data */

  constructor(data) {
    this.id = generateId()
    this.name = data.name
    this.body = data.body || ''
    this.tags = data.tags
    this.color = data.color
    this.createdAt = data.createdAt == undefined ? new Date() : new Date(data.createdAt)
    this.editedAt = data.editedAt == undefined ? new Date() : new Date(data.editedAt)
    this.notebook = data.notebook || ''
  }

  //** @param {{id, name, body, tags, color}} data */

  activeJot = {
  }

  get CreatedDate() {
    return this.createdAt.toLocaleString()
  }

  get EditedDate() {
    return this.editedAt.toLocaleString()
  }

  get JotListTemplate() {
    return `    
    <div onclick="app.JotController.setActiveJot('${this.id}')" class="ps-2">
    <span>${this.name}</span><span style="color: ${this.color}"> <i class="mdi mdi-fountain-pen-tip"></i></span>
    </div>
    `
  }

  get JotActiveTemplate() {
    return `
    <div class="container-fluid">
    <section class="row">
    <div class="col-md-4 col-12 text-light">
    <h1 class="mt-3">${this.name}</h1>
    <p class="lh-sm mb-0 smalltext">created: ${this.CreatedDate}</p>
    <p class="lh-sm mb-0 smalltext">last saved: ${this.EditedDate}</p>
    <p class="lh-sm mb-0 smalltext">Word Count: ${AppState.wordCount}</p>
    <p class="lh-sm mb-0 smalltext">Character Count: ${AppState.characterCount}</p>           
    <p class="d-inline-flex gap-1">
    <button class="btn offcanvasbtn text-light shadow" type="button" data-bs-toggle="collapse"
    data-bs-target="#collapseEditForm" aria-expanded="false" aria-controls="collapseEditForm" onclick="app.JotController.drawNotebookChangerOptions()">
    <i class="mdi mdi-delta"> Jot</i>
    </button>
    </p>
    <div class="collapse shadow" id="collapseEditForm">
    <div class="card card-body change">

    <form onsubmit="app.JotController.updateJotName(nameChanger.value)" class="d-flex align-items-center justify-content-between">
    <label for="name">Rename </label>
    <input class="form-input rounded mb-0" type="text" name="name" id="nameChanger"
    minlength="3" maxlength="15" placeholder="${this.name}" required>
    <button type="submit" class="btn btn-transparent text-light p-0"><h2 class="m-0 p-0"><i class="mdi mdi-arrow-left-bold-circle"></i></h2>
    </button>
    </form>
    
    <form onsubmit="app.JotController.updateJotColor(colorChanger.value)" class="d-flex align-items-center justify-content-between mb-2">
    <label for="jot-color-changer">Color</label>
    <select class="form-select mb-0 w-50" name="color" id="jot-color-changer"
    aria-label="default select example" required>
    <option selected>Choose a color</option>
    <option value="#FF4136">Red</option>
    <option value="#FF851B">Orange</option>
    <option value="#FFDC00">Yellow</option>
    <option value="#2ECC40">Green</option>
    <option value="#0074D9">Blue</option>
    <option value="#4b0082">Indigo</option>
    <option value="#B10DC9">Violet</option>
    </select>
    <button type="submit" class="btn btn-transparent text-light align-middle p-0"><h2 class="m-0 p-0"><i class="mdi mdi-arrow-left-bold-circle"></h2></i>
    </button>
    </form>

    <form onsubmit="app.JotController.updateJotNotebook(notebook.value)" class="d-flex align-items-center justify-content-between">
    <label for="notebook-changer">Notebook</label>
    <select id="notebook-changer" class="form-select mb-0 w-50" name="notebook" area-label="select" required" required>
    </select>
    <button type="submit" class="btn btn-transparent text-light align-middle p-0"><h2 class="m-0 p-0"><i class="mdi mdi-arrow-left-bold-circle"></h2></i>
    </button>
    </form>
    
    </div>
    </div>
    </div>
    <div class="col-md-8 col-12">
    <div class="row align-items-center justify-content-between text-light">
    <div class="col-8" <label for="body-area" class="form-label text-light">
    <h2>Edit Your Jot</h2></label>
    </div>
    <div class="col-2">
    <button class="btn btn-transparent text-light fs-1 text-center" style="width: 2em"
    onclick="app.JotController.deleteJot('${this.id}')"><i class="mdi mdi-delete-circle"
    ></i></button>
    </div>
    </div>
    <textarea onblur="app.JotController.updateJot()" type="text" name="body" id="body-area"
    class="w-100 viewable shadow rounded p-2" style="border: solid 5px ${this.color}">${this.body}</textarea>
    </div>
    </section>
    </div>
    `
  }

  get NotebookJotListTemplate() {
    return `    
    ${this.JotListTemplate}
    `
  }

  static get JotListBtnTemplate() {
    return `
    View Your ${AppState.noteCount} Jots
    `
  }

  static get JotNoteCountTemplate() {
    return `
    ${AppState.noteCount}
    `
  }

}

export class Notebook {

  //**@param {{name, color, purpose}} */
  constructor(data) {
    this.id = generateId()
    this.name = data.name
    this.color = data.color
    this.topic = data.topic
  }

  get NotebookListTemplate() {
    return `
      <div onclick="app.JotController.setActiveNotebook('${this.id}')" class="ps-2">
        <span>${this.name}</span><span style="color: ${this.color}"> <i class="mdi mdi-notebook"></i></span>
      </div>
      <div id="${this.id}"></div>
      `
  }

  get ActiveNotebookTemplate() {
    return `
    ${this.name}, ${this.id}
    `
  }

  get NotebookSelectOption() {
    return `
    <option value="${this.id}">${this.name}</option>
    `
  }

  static get NotebookCount() {
    return `
        ${AppState.notebooklistcount}
      `
  }

}


