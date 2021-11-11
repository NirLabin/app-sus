import noteImg from '../cmps/note-img.js';
import noteType from '../cmps/note-type.js';

export default {
	template: `
     <section>
         <div class="box-note-add"  @keyup.enter="addNewNote">
            <note-type @type="setTypeNote"></note-type>
            <input class="note-add" v-model="noteTxt"  placeholder="Add note" >
            <button class="btn" @click="addNewNote" ><ion-icon name="add-outline"></ion-icon></button>
            <note-img v-if="noteType === 'img'" @addImg="addImg"></note-img>
			<div class="actions flex gap align-center">
				<button class="btn ">Tx</button>
				<button class="btn" @click="todo"><ion-icon name="list-outline"></ion-icon></button>
				<button class="btn" @click="setTypeNote('img')"><ion-icon name="image-outline"></ion-icon></button>
			</div>
        </div>
    </section>
    `,
	data() {
		return {
			noteTxt: '',
			noteType: 'text',
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
