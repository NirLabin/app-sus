export default {
  template: `
         <section class="note-type">
             <h3>Note type:</h3>
        <select name="note-type" id="note-type" v-model="selected" @change="setNoteType">
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
    setNoteType() {
      console.log(this.selected);
      this.$emit('type', this.selected);
    },
  },
};
