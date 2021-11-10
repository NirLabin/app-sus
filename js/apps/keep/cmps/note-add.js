export default {
  template: `
     <section>
         <div class="box-note-add">
             <input class="note-add" v-model="noteTxt"  placeholder="Add note" @input="addNewNote">
              <button @click="addNewNote">➕</button>
        </div>
    </section>
    `,
  data() {
    return {
      noteTxt: '',
    };
  },

  methods: {
    addNewNote() {
      let txt = this.noteTxt;
      this.$emit('addNewNote', txt);
    },
  },
};
