export default {
  template: `
      <section >
        <div class="flex align-center">
          <ion-icon class="search-icon" name="search-outline"></ion-icon>
          <input class="note-filter" type="search" v-model="str" @input="filter" placeholder="Search...">
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
  },
};
