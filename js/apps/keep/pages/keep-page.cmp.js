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
              <note-list v-if="!filterdNotes.length" :notes="pinnedNotes" @remove="deleteNote" @pin="pinNote"></note-list>
              <note-list v-if="!filterdNotes.length" :notes="unPinnedNotes" @remove="deleteNote" @pin="pinNote"></note-list>
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
        console.log(this.filterdNotes);
      });

      return notes;
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
