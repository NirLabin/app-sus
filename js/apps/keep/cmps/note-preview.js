import noteTodo from './note-todos.js';
import noteTools from './note-tools.js';
import noteEdit from '../cmps/note-edit.js';

export default {
	props: ['note'],
	template: `
    <div class="note-preview flex column space-between" @click="edit" >
        <note-todo v-if="note.type==='todo'" :note="note" @change="changeTodo"/>
        <img v-else-if="note.type==='img'" :src="getSrc(note)">
        <p v-else>{{note.txt}}</p>
		<note-tools  :note="note" @remove="remove" @pin="pin" @duplicate="duplicate" @addTodo="addTodo"/>
		<note-edit v-if="editNote" :note="note"/>
    </div>
    `,
	data() {
		return {
			isHover: true,
			editNote: false,
		};
	},
	methods: {
		getSrc(note) {
			return note.txt;
		},
		toggleAction() {
			this.isHover = !this.isHover;
		},
		remove() {
			this.$emit('remove', this.note.id);
		},
		pin() {
			this.$emit('pin', this.note);
		},
		changeColor(color) {
			this.$emit('color', color);
		},
		changeTodo(data) {
			this.$emit('todo', data);
		},
		duplicate() {
			this.$emit('duplicate', this.note);
		},
		addTodo() {
			this.$emit('addTodo', this.note);
			console.log('add todo');
		},
		edit() {
			if (this.editNote) return;
			this.editNote = !this.editNote;
		},
	},
	components: {
		noteTodo,
		noteTools,
		noteEdit,
	},
};
