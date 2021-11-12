import noteTools from './note-tools.js';

export default {
  props: ['note'],
  template: `
    <section class="note-edit">
        <div class ="modal" :style="{backgroundColor : note.style.bgc}" >
            <form @submit.prevent="onSubmit" class="flex align-center column space-between gap">
                <input type="text" v-model="txt">
                <note-tools :note="note" />
                <button class="btn" @click="save">Save</button>
            </form>
        </div>
    </section>
  `,
  data() {
    return {};
  },
  created() {
    this.txt = this.note.txt;
  },
  methods: {
    save() {
      console.log('save changes');
      this.$emit();
    },
  },
  components: {
    noteTools,
  },
};
