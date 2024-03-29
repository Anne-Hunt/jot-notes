import { JotController } from "./controllers/JotController.js";
import { Router } from "./utils/Router.js";


export const router = new Router([
  {
    path: '',
    controllers: [JotController],
    view: /*html*/`
    `
  }/*,
  {
    path: '#/Edit',
    view: 'app/views/ActiveJot.html'
  },
  {
    path: '#/Create',
    view: 'app/views/CreateJot.html'
  }/*,
  {
    path: '#/List',
    view: 'app/views/ListJots.html'
  }*/
])