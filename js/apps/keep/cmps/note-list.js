import notePreview from '../cmps/note-preview.js';
export default {
  props: ['notes'],
  template: `
    <section class="">
	<ul v-if="notes&&notes.pinnedNotes.length" class="note-list">
        <li class="note" v-for="note in notes.pinnedNotes" :key="note.id" :style="{backgroundColor : note.style.bgc}"  >
          <note-preview :note="note" @pin="pin" @color="changeColor" @duplicate="duplicate" @remove="remove" @todo="todo" />
        </li> 
      </ul>
      <ul v-if="notes && notes.unPinnedNotes.length" class="note-list">
        <li class="note" v-for="note in notes.unPinnedNotes" :key="note.id" :style="{backgroundColor : note.style.bgc}"  >
          <note-preview :note="note" @pin="pin" @color="changeColor" @duplicate="duplicate" @remove="remove" @todo="todo" />
        </li> 
      </ul>
    </section>
  `,
  data() {
    return {
      pinNotes: null,
    };
  },
  methods: {
    remove(noteId) {
      this.$emit('remove', noteId);
    },
    pin(note) {
      this.$emit('pin', note);
    },
    changeColor(color) {
      this.$emit('color', color);
    },
    duplicate(note) {
      this.$emit('duplicate', note);
    },
    todo(data) {
      this.$emit('todo', data);
    },
  },

  components: {
    notePreview,
  },
};
