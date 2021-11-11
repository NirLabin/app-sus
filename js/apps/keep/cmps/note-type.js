export default {
  template: `
         <section class="note-type">
             <h3>Serach by type:</h3>
        <select name="note-type" id="note-type" v-model="selected" @change="sortByType">
            <option value="text">Text</option>
            <option value="img">Image</option>
            <option value="video">video</option>
            <option value="todo">Todo</option>
        </select>
        </section>
        `,
  data() {
    return {
      selected: 'text',
    };
  },

  methods: {
    sortByType() {
      this.$emit('type', this.selected);
    },
  },
};
