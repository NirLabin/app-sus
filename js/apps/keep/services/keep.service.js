import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async.storage.service.js';

const KEEP_KEY = 'keeps';
_createNotes();

function _createNotes({ txt = '', type = 'note-txt' }) {
	let notes = utilService.loadFromStorage(KEEP_KEY);
	if (!notes || !notes.length) {
		notes = [
			{
				id: utilService.makeId(),
				isPinned: false,
				type,
				txt: 'Hey',
				todos: [],
				style: {
					bgc: '#555',
				},
			},
			{
				id: utilService.makeId(),
				isPinned: false,
				type,
				txt: 'Hey everybody welcome to keep app',
				todos: [],
				style: {
					bgc: '#555',
				},
			},
		];
	}
	return notes;
}
