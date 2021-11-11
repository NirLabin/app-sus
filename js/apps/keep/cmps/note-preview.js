import noteColors from '../cmps/note-colors.js';
import noteTodo from './note-todos.js';
// @mouseover='toggleAction' @mouseleave='toggleAction'
export default {
	props: ['note'],
	template: `
    <div class="note-preview flex column space-between"  >
        <note-todo v-if="note.type==='todo'" :note="note" @change="changeTodo"/>
        <img v-else-if="note.type==='img'" :src="getSrc(note)">
        <p v-else>{{note.txt}}</p>
        <div v-if="isHover" class="actions flex align-center gap" >
            <button class="btn" @click="remove"><ion-icon name="trash-outline"/></button>
            <button class="btn" @click="pin"><ion-icon name="pin-outline"/></button>
            <button class="btn" @click="duplicate"><ion-icon name="duplicate-outline"/></button>
            <note-colors @color="changeColor" :note="note"></note-colors>
            <button v-if="note.type==='todo'" @click="addTodo" class="btn"><ion-icon name="add-outline"/></button>
        </div>
    </div>
    `,
	data() {
		return {
			isHover: true,
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
			console.log('add todo');
		},
	},
	components: {
		noteColors,
		noteTodo,
	},
};
