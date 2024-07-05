import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { JotSchema } from '../models/Jot.js';
import { NotebookSchema } from '../models/Notebook.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  Jot = mongoose.model('Jot', JotSchema);
  Notebook = mongoose.model('Notebook', NotebookSchema);

}

export const dbContext = new DbContext()
