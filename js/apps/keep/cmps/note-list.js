import notePreview from '../cmps/note-preview.js';
import noteEdit from '../cmps/note-edit.js';

export default {
  props: ['notes'],
  template: `
    <section v-if="notes" class="note-list-container" >
        <h3 v-if="notes.pinned.length && notes.unPinned.length">Pinned:</h3>
		<ul v-if="notes && notes.pinned.length" class="note-list clean-list">
			<li class="note vivify fadeInLeft" v-for="note in notes.pinned" :key="note.id" :style="{backgroundColor : note?.style?.bgc}"  >
				<note-preview :note="note" @edit="edit" @pin="pin" @color="changeColor" @duplicate="duplicate" @remove="remove" @todo="todo"  @addTodo="addTodo"  @save="save" @send="send"/>
			</li> 
		</ul>
		<h3 v-if="notes.pinned.length && notes.unPinned.length">Unpinned:</h3>
		<ul v-if="notes && notes.unPinned.length" class="note-list clean-list">
			<li class="note " v-for="note in notes.unPinned" :key="note.id" :style="{backgroundColor : note?.style?.bgc}" >
				<note-preview :note="note" @edit="edit" @pin="pin" @color="changeColor" @duplicate="duplicate" @remove="remove" @todo="todo" @addTodo="addTodo"  @save="save" @send="send"/>
			</li> 
		</ul>
		<note-edit v-if="editNote" :note="editNote" @close="closeEdit" @save="save" @remove="remove" @pin="pin" @duplicate="duplicate" @addTodo="addTodo" @send="send" @color="changeColor" />
    </section>`,

  data() {
    return {
      editNote: null,
    };
  },

  methods: {
    addTodo(note) {
      this.$emit('addTodo', note);
    },
    remove(noteId) {
      this.$emit('remove', noteId);
      this.editNote = null;
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
      this.editNote = null;
      this.$emit('save', data);
    },
    send(note) {
      this.$emit('send', note);
    },
    closeEdit() {
      this.editNote = null;
    },
    edit(note) {
      if (this.editNote || note.type === 'img') return;
      this.editNote = note;
    },
  },
  components: {
    notePreview,
    noteEdit,
  },
};
