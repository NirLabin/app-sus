import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async.storage.service.js';
// {
/* <ion-icon name="image-outline"></ion-icon> */
// {
/* <ion-icon name="image-outline"></ion-icon> */
// }
// }
const NOTE_KEY = 'notes';
const DEAF_CLR = '#A0C4FF';
export const noteService = {
  query,
  remove,
  save,
  getById,
  addNote,
  updateNoteColor,
  pin,
  updateNote,
  getEmptyNote,
};
_createNotes();

function query() {
  return storageService.query(NOTE_KEY);
}

function save(note) {
  if (note.id) return storageService.put(NOTE_KEY, note);
  else return storageService.post(NOTE_KEY, note);
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId);
}

function pin(note) {
  note.isPinned = !note.isPinned;
  console.log(note);
}

function getById(noteId) {
  return storageService.get(NOTE_KEY, noteId);
}

function addNote(txt, type, clr = DEAF_CLR) {
  const newNote = _createNote(clr, txt, type);
  if (type === 'todo') {
    newNote.todos.push({ isDone: false, txt: txt });
    newNote.txt = '';
  }
  return storageService.post(NOTE_KEY, newNote);
}

function updateNoteColor(color) {
  return storageService.put(NOTE_KEY, color);
}

function updateNote(note) {
  return storageService.put(NOTE_KEY, note);
}

function getEmptyNote() {
  return {
    id: utilService.makeId(),
    isPinned: false,
    todos: [],
    type,
    txt,
    data,
    style: {
      bgc,
    },
  };
}

async function _createNotes() {
  let notes = await storageService.query(NOTE_KEY);
  if (!notes || !notes.length) {
    notes = [
      _createNote('#9BF6FF', 'Hey'),
      _createNote('#BDB2FF', 'password:123456'),
      _createNote(
        '#9BF6FF',
        'https://static1.bigstockphoto.com/5/3/3/large1500/335448619.jpg',
        'img'
      ),
      _createNote('#CAFFBF', 'Hey everybody welcome to keep app'),
      _createNote(
        '#FDFFB6',
        'https://media.istockphoto.com/photos/funny-man-with-watermelon-helmet-and-goggles-picture-id187722063?k=20&m=187722063&s=612x612&w=0&h=Jrg5LwNz3dVOiUWnpvq_KN4kAt7DX7gL--uQ4DGElT0=',
        'img'
      ),
      _createNote('#FFC6FF', 'DATA IS A FUNCTION THAT RETURNS AN OBJECT!'),
    ];
    notes = await storageService.postMany(NOTE_KEY, notes);
  }
  return notes;
}

function _createNote(bgc, txt = '', type = 'text', todos = [], data = '') {
  return {
    id: utilService.makeId(),
    isPinned: false,
    todos,
    type,
    txt,
    data,
    style: {
      bgc,
    },
  };
}
