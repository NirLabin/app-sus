export default {
  template: `
      <section class="note-filter">
        <input type="search" v-model="str" @input="filter" placeholder="Search...">
      </section>
      `,

  data() {
    return {
      str: '',
    };
  },
  methods: {
    filter() {
      console.log(this.str);
    },
  },
};
