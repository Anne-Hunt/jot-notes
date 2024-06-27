import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { JotSchema } from '../models/Jot.js';
import { NotebookSchema } from '../models/Notebook.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Jot = mongoose.model('Jot', JotSchema);
  Notebook = mongoose.model('Notebook', NotebookSchema);

}

export const dbContext = new DbContext()
