import noteTodo from './note-todos.js';
import noteTools from './note-tools.js';

export default {
	props: ['note'],
	template: `
    <div class="note-preview flex column space-between gap" @click="edit" >
        <note-todo v-if="note.type==='todo'" :note="note" @change="changeTodo"/>
        <img v-else-if="note.type==='img'" :src="getSrc(note)">
        <p v-else>{{note.txt}}</p>
        <note-tools  :note="note" @remove="remove" @pin="pin" @duplicate="duplicate" @addTodo="addTodo" @sendAsEmail="sendAsEmail" @color="changeColor"/>
    </div>`,
	data() {
		return {
			isHover: true,
		};
	},
	methods: {
		edit(e) {
			if (e.target.closest('.note-tools')) return;
			this.$emit('edit', this.note);
		},
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
		},
		save(data) {
			console.log(data);
			this.editNote = false;
			this.$emit('save', data);
		},
		sendAsEmail() {
			this.$emit('send', this.note);
		},
	},
	components: {
		noteTodo,
		noteTools,
	},
};
