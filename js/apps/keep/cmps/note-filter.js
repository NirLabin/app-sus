export default {
  template: `
      <section >
        <input class="note-filter" type="search" v-model="str" @input="filter" placeholder="Search...">
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
