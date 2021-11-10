import noteFilter from '../cmps/note-filter.js';
import noteList from '../cmps/note-list.js';
import noteAdd from '../cmps/note-add.js';
import { noteService } from '../services/keep.service.js';

export default {
  template: `
        <section class="keep-app">
              <note-filter type="search" id="filter-keeps"></note-filter>
              <note-add type="text" @newNote="addNewNote"></note-add>
              <note-list :notes="notesToShow" @remove="deleteNote"></note-list>
        </section>

    `,

  data() {
    return {
      notes: null,
    };
  },
  created() {
    this.loadNotes();
  },
  methods: {
    loadNotes() {
      noteService.query().then((notes) => (this.notes = notes));
    },
    addNewNote(txt) {
      noteService.addNote(txt).then(() => this.loadNotes());
    },
    deleteNote(id) {
      noteService.remove(id);
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
