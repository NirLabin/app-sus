import noteTools from './note-tools.js';

export default {
	props: ['note'],
	template: `
    <section class="note-edit">
        <div class ="modal" :style="{backgroundColor : note.style.bgc}" >
            <form class="flex align-center column space-between gap">
                <textarea type="text" v-model="txt"></textarea>
                <div class="form-row flex-def">
					<note-tools :note="note" @remove="remove" @pin="pin" @duplicate="duplicate" @addTodo="addTodo" @sendAsEmail="sendAsEmail" @color="changeColor"/>
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
		remove() {
			this.$emit('remove', this.note.id);
		},
		pin() {
			this.$emit('pin', this.note);
		},
		duplicate() {
			this.$emit('duplicate', this.note);
		},
		addTodo() {
			this.$emit('addTodo', this.note);
		},
		sendAsEmail() {
			this.$emit('send', this.note);
		},
		changeColor(color) {
			this.$emit('color', color);
		},
	},
	components: {
		noteTools,
	},
};
