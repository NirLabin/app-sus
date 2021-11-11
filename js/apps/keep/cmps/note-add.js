import noteImg from '../cmps/note-img.js';
import noteType from '../cmps/note-type.js';

export default {
  template: `
<section>
  <div class="box-note-add " @keyup.enter="addNewNote">
            <note-type @type="sortByType"></note-type>
      <div class="note-edit flex gap align-center">
            <input class="note-add" v-model="noteTxt"  :placeholder="placeHolderVal" >
            <button  @click="addNewNote" ><ion-icon name="add-outline"></ion-icon></button>
            <note-img v-if="noteType === 'img'" @addImg="addImg"></note-img>
            <button @click="setTypeNote('text')" ><ion-icon name="text-outline"></ion-icon></button>
            <button  @click="todo" @click="setTypeNote('todo')"><ion-icon name="list-outline"></ion-icon></button>
            <button  @click="setTypeNote('img')"><ion-icon name="image-outline"></ion-icon></button>
			</div>
   </div>
 </section>
    `,
  data() {
    return {
      noteTxt: '',
      noteType: 'text',
      placeHolderVal: 'Add note',

      // activeNote: null,
    };
  },

  methods: {
    addNewNote() {
      if (!this.noteTxt) return;
      const { noteTxt, noteType } = this;
      console.log(noteTxt, noteType);
      this.$emit('add', { noteTxt, noteType });
      this.noteTxt = '';
    },
    addImg(src) {
      this.$emit('add', { noteTxt: src, noteType: 'img' });
    },

    setTypeNote(type) {
      this.noteType = type;
      this.placeHolderVal = `Add ${this.noteType}`;
    },

    sortByType(type) {
      this.$emit('sortBy', type);
    },

    todo() {
      this.noteType = 'todo';
    },
  },
  components: {
    noteImg,
    noteType,
  },
};
