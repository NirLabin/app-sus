import noteFilter from '../cmps/note-filter.js';
import noteList from '../cmps/note-list.js';
import noteAdd from '../cmps/note-add.js';
import { noteService } from '../services/keep.service.js';

export default {
  template: `
        <section class="keep-app">
              <note-filter type="search" id="filter-keeps"></note-filter>
              <note-add type="text" @newNote="addNewNote"></note-add>
              <note-list :notes="pinnedNotes" @remove="deleteNote" @pin="pinNote"></note-list>
              <note-list :notes="unPinnedNotes" @remove="deleteNote" @pin="pinNote"></note-list>
        </section>

    `,

  data() {
    return {
      notes: null,
      pinnedNotes: [],
      unPinnedNotes: [],
    };
  },
  created() {
    this.loadNotes();
  },
  methods: {
    loadNotes() {
      noteService.query().then((notes) => {
        this.notes = notes;
        this.unPinnedNotes = notes.filter((note) => !note.isPinned);
        this.pinnedNotes = notes.filter((note) => note.isPinned);
      });
    },
    addNewNote(txt, data) {
      noteService.addNote(txt, data).then(() => this.loadNotes());
    },
    deleteNote(id) {
      noteService.remove(id);
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

    changeNoteColor(id, color) {
      keepService
        .getById(id)
        .then((note) => {
          note.color = color;
          console.log(note);
          keepService.updateNoteColor(color);
        })
        .then(() => this.loadNotes());
    },
  },
  computed: {
    notesToShow() {
      return this.notes;
    },
  },
  components: {
    noteFilter,
    noteList,
    noteAdd,
  },
};
