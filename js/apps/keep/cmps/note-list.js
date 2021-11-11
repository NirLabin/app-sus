import notePreview from '../cmps/note-preview.js';
export default {
	props: ['notes'],
	template: `
    <section class="clean-list">
      <ul v-if="notes&&notes.length" class="note-list">
        <li class="note" v-for="note in notes" :key="note.id" :style="{backgroundColor : note.style.bgc}"  >
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
