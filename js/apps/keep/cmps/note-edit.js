import noteTools from './note-tools.js';

export default {
	props: ['note'],
	template: `
    <section class="note-edit">
        <div class ="modal" :style="{backgroundColor : note.style.bgc}" >
            <form class="flex align-center column space-between gap">
                <textarea type="text" v-model="txt"></textarea>
                <div class="form-row flex-def">
                  <note-tools :note="note" />
                  <button class="btn" @click.prevent="save">Save</button>
                </div>
            </form>
        </div>
    </section>
  `,
	created() {
		this.txt = this.note.txt;
	},
	methods: {
		save() {
			this.$emit('save', { note: this.note, newTxt: this.txt });
		},
	},
	components: {
		noteTools,
	},
};
