import noteColors from '../cmps/note-colors.js';

export default {
  props: ['note'],
  template: `
      <div class="note-tools flex align-center space-between gap"  >
        <button class="btn flex align-center" @click="remove"><ion-icon name="trash-outline"/></button>
        <button class="btn flex align-center" @click="pin"><ion-icon name="pin-outline"/></button>
        <button class="btn flex align-center" @click="duplicate"><ion-icon name="duplicate-outline"/></button>
        <note-colors @color="changeColor" :note="note"/>
        <button v-if="note.type==='todo'" @click="addTodo" class="btn flex align-center"><ion-icon name="add-outline"/></button> 
        <button v-if="note.type === 'text'" @click="share" class="btn flex align-center"><ion-icon name="navigate-outline"/></button>
      </div>
    `,
  data() {
    return {
      isHover: true,
    };
  },
  methods: {
    remove() {
      this.$emit('remove', this.note.id);
    },
    pin() {
      this.$emit('pin', this.note);
    },
    changeColor(data) {
      this.$emit('color', data);
    },

    duplicate() {
      this.$emit('duplicate', this.note);
    },
    addTodo() {
      this.$emit('addTodo', this.note);
    },

    share() {
      this.$emit('sendAsEmail', this.note);
    },
  },
  components: {
    noteColors,
  },
};
