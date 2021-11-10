import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async.storage.service.js';

const NOTE_KEY = 'notes';
export const noteService = { query, remove, save, getById, addNote };
let notes;
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

function getById(noteId) {
  return storageService.get(NOTE_KEY, noteId);
}

function addNote() {
  const newNote = _createNote('New note', '#A0C4FF');
  notes.push(newNote);
}

async function _createNotes() {
  notes = await storageService.query(NOTE_KEY);
  if (!notes || !notes.length) {
    notes = [
      _createNote('Hay', '#9BF6FF'),
      _createNote('Hey everybody welcome to keep app', '#CAFFBF'),
    ];
    notes = await storageService.postMany(NOTE_KEY, notes);
  }
  return notes;
}

function _createNote(txt = '', bgc, type = 'note-txt') {
  return {
    id: utilService.makeId(),
    isPinned: false,
    todos: [],
    type,
    txt,
    style: {
      bgc,
    },
  };
}
