import notePreview from '../cmps/note-preview.js';
export default {
  props: ['notes'],
  template: `
    <section class="">
		<ul v-if="notes&&notes.pinned.length" class="note-list">
			<li class="note" v-for="note in notes.pinned" :key="note.id" :style="{backgroundColor : note.style.bgc}"  >
			<note-preview :note="note" @pin="pin" @color="changeColor" @duplicate="duplicate" @remove="remove" @todo="todo" @addTodo="addTodo" />
			</li> 
		</ul>
		<ul v-if="notes && notes.unPinned.length" class="note-list">
			<li class="note" v-for="note in notes.unPinned" :key="note.id" :style="{backgroundColor : note.style.bgc}" >
			<note-preview :note="note" @pin="pin" @color="changeColor" @duplicate="duplicate" @remove="remove" @todo="todo" @addTodo="addTodo" />
			</li> 
     	 </ul>

    </section>
  `,
  data() {
    return {
      pinNotes: null,
      editNote: false,
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
  },

  components: {
    notePreview,
  },
};

{
  /* <ul v-if="notes&&notes.length" class="note-list clean-list">
<li v-for="note in notes" :key="note.id" class="flex column">
	<ul v-if="note.isPinned" class="clean-list">
		<li class="note" :style="{backgroundColor : note.style.bgc}">
		<note-preview :note="note" @pin="pin" @color="changeColor" @duplicate="duplicate" @remove="remove" @todo="todo" @addTodo="addTodo" />
		</li>
	</ul>
	<ul v-else class="clean-list">
		<li class="note" :style="{backgroundColor : note.style.bgc}">
		<note-preview :note="note" @pin="pin" @color="changeColor" @duplicate="duplicate" @remove="remove" @todo="todo" @addTodo="addTodo" />
		</li>
	</ul>
</li>
</ul>
 */
}
