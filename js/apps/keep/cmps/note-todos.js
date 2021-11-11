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
  created() {},
  methods: {
    change(todo) {
      this.$emit('change', { todo, note: this.note });
    },
    todoStyle(todo) {
      return { textDecoration: `${todo?.isDone ? 'line-through' : 'none'}` };
    },
  },
};
