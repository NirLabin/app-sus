import noteType from './note-type.js';

export default {
  template: `
      <section >
        <div class="flex align-center">
          <ion-icon class="search-icon" name="search-outline"></ion-icon>
          <input class="note-filter" type="search" v-model="str" @input="filter" placeholder="Search...">
          <note-type @type="sortByType"></note-type>
        </div>
        </section>
      `,
  data() {
    return {
      str: '',
    };
  },
  methods: {
    filter() {
      this.$emit('filter', this.str);
    },

    sortByType(type) {
      this.$emit('sortBy', type);
    },
  },
  components: {
    noteType,
  },
};
