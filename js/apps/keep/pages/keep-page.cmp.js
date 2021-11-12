import noteFilter from '../cmps/note-filter.js';
import noteList from '../cmps/note-list.js';
import noteAdd from '../cmps/note-add.js';
import userMsg from '../../../cmps/user-msg.cmp.js';
import { noteService } from '../services/keep.service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import { utilService } from '../../../services/util.service.js';

export default {
  template: `
        <section class="keep-app main-layout">
          <note-filter @filter="setFilter" type="search" @sortBy="sort" id="filter-keeps"/>
          <note-add type="text" @add="addNewNote" :noteActive="noteActive" @update="update"/>
          <note-list :notes="notesToShow" @remove="deleteNote" @pin="pinNote" @color="changeColor" @duplicate="onDuplicateNote"  @todo="changeTodo" @addTodo="setTodo"/>
        </section>
        `,
  data() {
    return {
      notes: null,
      noteActive: null,
      filter: '',
      type: 'all',
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
      eventBus.$emit(
        'showMsg',
        utilService.createUserMsg('Note added', 'success')
      );
    },

    deleteNote(id) {
      noteService
        .remove(id)
        .then((note) => {
          noteService.updateNote(note);
        })
        .then(() => this.loadNotes());
      eventBus.$emit(
        'showMsg',
        utilService.createUserMsg('Note deleted', 'success')
      );
    },

    pinNote(note) {
      note.isPinned = !note.isPinned;
      this.saveNote(note);
    },

    setFilter(str) {
      this.filter = str;
    },

    sort(type) {
      this.type = type;
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
      eventBus.$emit(
        'showMsg',
        utilService.createUserMsg('Note duplicated', 'success')
      );
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
      const { type, filter } = this;
      if (type === 'all' && !filter) return this.notes;
      return {
        unPinned: this.notes.unPinned.filter((note) => {
          return (
            note.txt.toLowerCase().includes(filter) &&
            (type === 'all' || note.type === type)
          );
        }),
        pinned: this.notes.pinned,
      };
    },
  },
  components: {
    noteFilter,
    noteList,
    noteAdd,
    userMsg,
  },
};
