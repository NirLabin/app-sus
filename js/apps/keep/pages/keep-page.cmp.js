import noteFilter from '../cmps/note-filter.js';
import noteList from '../cmps/note-list.js';
import noteAdd from '../cmps/note-add.js';
import { noteService } from '../services/keep.service.js';

export default {
	template: `
        <section class="keep-app main-layout">
          <note-filter @filter="setFilter" type="search" id="filter-keeps"/>
          <note-add type="text" @add="addNewNote" :noteActive="noteActive" @update="update"/>
          <note-list :notes="notesToShow" @remove="deleteNote" @pin="pinNote" @color="changeColor" @duplicate="onDuplicateNote"  @todo="changeTodo" @addTodo="setTodo"/>
        </section>
        `,
	data() {
		return {
			notes: null,
			noteActive: null,
			filter: '',
		};
	},
	created() {
		this.loadNotes();
	},
	methods: {
		update(data) {
			const { note, txt } = data;
			if (note.type === 'todo') {
				note.todos.push({ txt, isDone: false });
				this.saveNote(note);
			}
			if (note.type === 'txt') {
			}
		},
		setTodo(note) {
			this.noteActive = note;
		},
		changeTodo(data) {
			data.todo.isDone = !data.todo.isDone;
			this.saveNote(data.note);
		},

		addNewNote(data) {
			this.isNoteActive = null;
			const { noteTxt, noteType } = data;
			noteService.addNote(noteTxt, noteType).then(() => this.loadNotes());
		},
		deleteNote(id) {
			noteService
				.remove(id)
				.then((note) => {
					noteService.updateNote(note);
				})
				.then(() => this.loadNotes());
		},

		pinNote(note) {
			note.isPinned = !note.isPinned;
			this.saveNote(note);
		},

		setFilter(str) {
			this.filter = str;
		},

		changeColor(data) {
			const { note, color } = data;
			note.style.bgc = color;
			this.saveNote(note);
		},

		onDuplicateNote(note) {
			const newNote = { ...note };
			newNote.id = null;
			this.saveNote(newNote);
		},

		saveNote(note) {
			noteService
				.save(note)
				.then((notes) => this.loadNotes())
				.catch((err) => console.log(err));
		},

		loadNotes() {
			noteService.query().then((notes) => {
				this.notes = notes.reduce(
					(acc, note) => {
						acc[`${note.isPinned ? 'p' : 'unP'}inned`].push(note);
						return acc;
					},
					{
						unPinned: [],
						pinned: [],
					}
				);
			});
		},
	},
	computed: {
		notesToShow() {
			let searchStr = this.filter;
			if (!searchStr) return this.notes;
			return {
				unPinned: this.notes.unPinned.filter((note) => {
					return note.txt.toLowerCase().includes(searchStr);
				}),
				pinned: this.notes.pinned,
			};
		},
		// sort(type) {
		//   const notes = this.notes.filter((note) => {
		//     if (note.type !== type) return;
		//     else this.filteredNotesByType.push(note);
		//   });
		//   return notes;
		// },
		// notesToShow() {
		//   const searchStr = this.filter;
		//   const notes = this.notes.filter((note) => {
		//     let str = note.txt.toLowerCase().includes(searchStr);
		//     if (note.txt.includes(str)) return note;
		//   });
		//   return notes;
		// },
	},
	components: {
		noteFilter,
		noteList,
		noteAdd,
	},
};

//    if (!this.filterBy) return this.notes;
// var filteredByType;
// if (this.filterBy.byType === 'all') filteredByType = this.notes;
// else filteredByType = this.notes.filter(note => note.type === this.filterBy.byType);
// if (!this.filterBy.byName) {
// 	console.log(filteredByType);
// 	return filteredByType;
// }
