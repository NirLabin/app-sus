import noteImg from '../cmps/note-img.js';
import noteType from '../cmps/note-type.js';

export default {
  template: `
     <section>
         <div class="box-note-add">
            <note-type @type="setTypeNote"></note-type>
            <input v-if="noteType !== 'todo' " class="note-add" v-model="noteTxt"  placeholder="Add note" >
            <textarea v-if="noteType === 'todo'"name="todo-note" id="note-todo" cols="20" rows="5" placeholder="Add todo list" v-model="noteTxt"></textarea>
            <button class="btn" @click="addNewNote">➕</button>
            <note-img v-if="noteType === 'img'"></note-img>
        </div>
    </section>
    `,
  data() {
    return {
      noteTxt: '',
      noteType: 'text',
    };
  },

  methods: {
    addNewNote() {
      const { noteTxt, noteType } = this;
      this.$emit('add', { noteTxt, noteType });
      this.noteTxt = '';
    },

    setTypeNote(type) {
      this.noteType = type;
    },
  },
  components: {
    noteImg,
    noteType,
  },
};
