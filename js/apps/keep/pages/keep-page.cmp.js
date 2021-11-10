import noteFilter from '../cmps/note-filter.js';
import noteList from '../cmps/note-list.js';
import { noteService } from '../services/keep.service.js';

export default {
  template: `
        <section class="keep-app">
              <note-filter type="search" id="filter-keeps"></note-filter>
              <note-list :notes="notesToShow"></note-list>
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
  },
  computed: {
    notesToShow() {
      return this.notes;
    },
  },
  components: {
    noteFilter,
    noteList,
  },
};
