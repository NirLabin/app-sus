import noteColors from '../cmps/note-colors.js';

export default {
  props: ['notes'],
  template: `
  <section class="clean-list">
    <ul v-if="notes&&notes.length" class="note-list">
      <li class="note" v-for="note in notes" :key="note.id" :style="{
        backgroundColor : note.style.bgc}">
        {{note.txt}} 
        <div class="actions">
             <button class="btn" @click="remove(note.id)">🗑</button>
             <button class="btn" @click="pinNote(note)">📌</button>
             <!-- <note-colors></note-colors> -->
         </div>
      </li> 
    </ul>
    <div v-else>
      <p>No Notes</p>
    </div>
  </section>
  `,

  data() {
    return {
      pinNotes: null,
    };
  },
  methods: {
    remove(noteId) {
      console.log(noteId);
      this.$emit('remove', noteId);
    },
    pinNote(note) {
      this.$emit('pin', note);
    },
  },

  components: {
    noteColors,
  },
};
