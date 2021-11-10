import noteFilter from '../cmps/note-filter.js';
import noteList from '../cmps/note-list.js';

export default {
  template: `
        <section class="keep-app">
              <note-filter type="search" id="filter-keeps"></note-filter>
              <note-list></note-list>

        </section>

    `,

  data() {
    return {};
  },
  methods: {},
  components: {
    noteFilter,
    noteList,
  },
};
