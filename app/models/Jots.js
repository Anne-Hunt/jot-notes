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
    this.createdAt = Date() || null
    this.editedAt = Date() || null
  }

  get listTemplate() {
    return `    
    <div onclick="app.JotController.setActiveJot('${this.id}')">
      <span>${this.name}</span><span style="color: '${this.color}'"><i class="mdi mdi-file"></i></span>
    </div>
`
  }

  get activeTemplate() {
    return `
    <section class="row">
    <div class="col-4">
        <h3>${this.name}</h3>
        <p>created:
            <span>${this.createdAt}</span>
        </p>
        <p>last saved:
            <span>${this.editedAt}</span>
        </p>
    </div>
    <div  class="col-6">
    <label for="body" class="form-label">Edit your Jot below</label>
        <textarea onblur="app.JotController.updateJot()" type="text" name="body" id="body">${this.body}</textarea>
    </div>
    <button class="btn btn-warning" onclick="app.JotController.deleteJot('${this.id}')">Delete</button>
</section>
`
  }

  static get noteCountTemplate() {
    return `
    You have ${AppState.noteCount} notes in progress
    `
  }

}