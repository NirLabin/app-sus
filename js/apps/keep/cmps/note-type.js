export default {
  template: `
         <section class="note-type">
        <select name="note-type" id="note-type" v-model="selected" @change="sortByType">
            <option value="all">All</option>
            <option value="text">Text</option>
            <option value="img">Image</option>
            <option value="video">video</option>
            <option value="todo">Todo</option>
        </select>
        </section>
        `,
  data() {
    return {
      selected: 'all',
    };
  },
  methods: {
    sortByType() {
      this.$emit('type', this.selected);
    },
  },
};
