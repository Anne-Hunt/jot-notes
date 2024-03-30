import { generateId } from "../utils/GenerateId.js"
import { AppState } from "../AppState.js"

export class Jot {

  //** @param {{id, name, body, tags, color}} data */

  constructor(data) {
    this.id = generateId()
    this.name = data.name
    this.body = data.body || ''
    this.tags = data.tags
    this.color = data.color
    this.createdAt = data.createdAt == undefined ? new Date() : new Date(data.createdAt)
    this.editedAt = data.editedAt == undefined ? new Date() : new Date(data.editedAt)
  }

  get CreatedDate() {
    return this.createdAt.toLocaleString()
  }

  get EditedDate() {
    return this.editedAt.toLocaleString()
  }

  get ListTemplate() {
    return `    
    <div onclick="app.JotController.setActiveJot('${this.id}')" class="ps-2">
      <span>${this.name}</span><span style="color: ${this.color}"> <i class="mdi mdi-fountain-pen-tip"></i></span>
    </div>
`
  }

  get ActiveTemplate() {
    return `
    <div class="container-fluid">
    <section class="row">
        <div class="col-md-4 col-12 text-light">
            <h1>${this.name}</h1>
            <p class="lh-sm mb-0">created:</p>
            <span class="smalltext">${this.CreatedDate}</span>
            <p class="lh-sm mb-0">last saved:</p>
            <span class="smalltext">${this.EditedDate}</span>
        </div>
        <div class="col-md-8 col-12">
            <div class="row align-items-center justify-content-between text-light">
              <div class="col-8"
                <label for="body" class="form-label text-light"><h1>Edit your Jot</h1></label>
              </div>
              <div class="col-2">
                <button class="btn btn-transparent text-light fs-1 text-center" style="width: 2em"
                    onclick="app.JotController.deleteJot('${this.id}')"><i class="mdi mdi-delete-circle" style="color: ${this.color}"></i></button>
                  </div>
            </div>
            <textarea onblur="app.JotController.updateJot()" type="text" name="body" id="body"
                class="w-100 viewable shadow rounded p-2">${this.body}</textarea>
        </div>
    </section>
</div>
`
  }

  static get jotListBtnTemplate() {
    return `
    View Your ${AppState.noteCount} Jots
    `
  }

  static get noteCountTemplate() {
    return `
      ${AppState.noteCount}
    `
  }

}