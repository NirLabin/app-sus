import noteColors from '../cmps/note-colors.js';

export default {
	props: ['notes'],
	template: `
  <section class="clean-list">
    <ul v-if="notes&&notes.length" class="note-list">
      <li class="note flex column space-between" v-for="note in notes" :key="note.id" :style="{
        backgroundColor : note.style.bgc}">
        <img v-if="note.type==='img'" :src="getSrc(note)" alt="">
        <p v-else>{{note.txt}}</p>
        <div class="actions">
          <button class="btn" @click="remove(note.id)">🗑</button>
          <button class="btn" @click="pinNote(note)">📌</button>
          <button class="btn" @click="dupliceNote(note)">©</button>
          <!-- <router-link class="btn" @click="send(note)" to="/mail"><ion-icon name="paper-plane"/></router-link> -->
          <note-colors @color="changeColor" :note="note"></note-colors>
          <input type="checkbox" v-if="note.type === 'todo' ">
         </div>
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
		pinNote(note) {
			this.$emit('pin', note);
		},
		changeColor(color) {
			this.$emit('color', color);
		},
		getSrc(note) {
			return note.txt;
		},
		dupliceNote(note) {
			this.$emit('duplicate', note);
		},
		send(note) {
			this.$emit('send', note);
		},
	},

	components: {
		noteColors,
	},
};
