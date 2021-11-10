import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async.storage.service.js';

const NOTE_KEY = 'notes';
export const noteService = { query, remove, save, getById };
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

async function _createNotes() {
  let notes = await storageService.query(NOTE_KEY);
  if (!notes || !notes.length) {
    notes = [
      _createNote('Hay'),
      _createNote('Hey everybody welcome to keep app'),
    ];
    notes = await storageService.postMany(NOTE_KEY, notes);
  }
  return notes;
}

function _createNote(txt = '', type = 'note-txt', bgc) {
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
