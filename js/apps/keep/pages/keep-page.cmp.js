import noteFilter from '../cmps/note-filter.js';
import noteList from '../cmps/note-list.js';
import noteAdd from '../cmps/note-add.js';
import { noteService } from '../services/keep.service.js';

export default {
	template: `
        <section class="keep-app">
              <note-filter @filter="setFilter" type="search" id="filter-keeps"></note-filter>
              <note-add type="text" @add="addNewNote"></note-add>
              <note-list :notes="filterdNotes"></note-list>
              <note-list  v-if="!filterdNotes.length" :notes="pinnedNotes" @remove="deleteNote" @pin="pinNote" @color="changeColor" @duplicate="onDuplicateNote"  @send="sendEmail"></note-list>
              <note-list v-if="!filterdNotes.length" :notes="unPinnedNotes" @remove="deleteNote" @pin="pinNote" @color="changeColor" @duplicate="onDuplicateNote" @send="sendEmail"></note-list>
        </section>

    `,
	data() {
		return {
			notes: null,
			pinnedNotes: [],
			unPinnedNotes: [],
			filterdNotes: [],
			searchStr: '',
		};
	},
	created() {
		this.loadNotes();
	},
	methods: {
		sendEmail(note) {
			// this.
		},
		loadNotes() {
			noteService.query().then((notes) => {
				this.notes = notes;
				this.unPinnedNotes = notes.filter((note) => !note.isPinned);
				this.pinnedNotes = notes.filter((note) => note.isPinned);
			});
		},
		addNewNote(data) {
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
			noteService
				.getById(note.id)
				.then((note) => {
					note.isPinned = !note.isPinned;
					noteService.updateNote(note);
				})
				.then(() => this.loadNotes());
		},

		setFilter(str) {
			this.filter = str;
			this.filterdNotes = this.notesToShow();
			if (!this.filter) this.filterdNotes = [];
		},

		notesToShow() {
			const searchStr = this.filter;
			const notes = this.notes.filter((note) => {
				let str = note.txt.toLowerCase().includes(searchStr);
				if (!str) return;
				this.filterdNotes.push(note);
			});

			return notes;
		},
		changeColor(data) {
			const { note, color } = data;
			note.style.bgc = color;
			noteService
				.save(note)
				.then((note) => this.loadNotes())
				.catch((err) => console.log(err));
		},

		onDuplicateNote(note) {
			const newNote = { ...note };
			newNote.id = null;
			noteService
				.save(newNote)
				.then((note) => {
					this.notes.push(note);
					this.loadNotes();
				})
				.catch((err) => console.log(err));
		},
	},
	computed: {
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
