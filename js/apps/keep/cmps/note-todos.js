export default {
	props: ['note'],
	template: `
    <section class="note-todo">
      <ul class="clean-list">
        <li v-for="todo in note.todos" class="flex align-center gap">
          <p @click="change(todo)" :style="todoStyle(todo)">{{todo.txt}}</p>
        </li>
      </ul>
    </section>`,
	data() {
		return {};
	},
	created() {
		console.log(this);
		console.log(this.note);
	},
	methods: {
		change(todo) {
			// todo.isDone = !todo.isDone;
			this.$emit('change', { todo, note: this.note });
		},
		todoStyle(todo) {
			return { textDecoration: `${todo?.isDone ? 'line-through' : 'none'}` };
		},
	},
};
