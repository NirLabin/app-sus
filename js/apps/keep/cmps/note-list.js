import notePreview from '../cmps/note-preview.js';
export default {
	props: ['notes'],
	template: `
    <section class="">
      <ul v-if="notes&&notes.pinned.length" class="note-list">
        <li class="note" v-for="note in notes.pinned" :key="note.id" :style="{backgroundColor : note.style.bgc}"  >
          <note-preview :note="note" @pin="pin" @color="changeColor" @duplicate="duplicate" @remove="remove" @todo="todo" @addTodo="addTodo"  @save="save" @send="send"/>
        </li> 
      </ul>
      <ul v-if="notes && notes.unPinned.length" class="note-list">
        <li class="note" v-for="note in notes.unPinned" :key="note.id" :style="{backgroundColor : note.style.bgc}" >
          <note-preview :note="note" @pin="pin" @color="changeColor" @duplicate="duplicate" @remove="remove" @todo="todo" @addTodo="addTodo"  @save="save" @send="send"/>
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
		addTodo(note) {
			this.$emit('addTodo', note);
		},
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
		save(data) {
			this.$emit('save', data);
		},
		send(note) {
			this.$emit('send', note);
		},
	},

	components: {
		notePreview,
	},
};
