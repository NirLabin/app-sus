import noteImg from '../cmps/note-img.js';
import noteType from '../cmps/note-type.js';

export default {
  template: `
     <section>
         <div class="box-note-add">
            <note-type @type="setTypeNote"></note-type>
            <input class="note-add" v-model="noteTxt"  placeholder="Add note" >
            <button class="btn" @click="addNewNote">➕</button>
            <note-img></note-img>
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
