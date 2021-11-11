import noteImg from '../cmps/note-img.js';
import noteType from '../cmps/note-type.js';

export default {
	props: ['noteActive'],
	template: `
  <section>
    <div class="box-note-add flex column gap align-center " @keyup.enter="addNewNote">
        <!-- <note-type @type="sortByType"></note-type> -->
        <div class = "search-box flex align-center" :class="searchBoxClass">
          <button  @click="addNewNote" class="btn flex align-center" ><ion-icon name="add-outline"></ion-icon></button>
          <input class="note-add" v-model="noteTxt" ref="noteTxt" :placeholder="placeHolderVal" @focus="setSearchClass" @blur="setSearchClass" >
        </div>
      <div class="note-edit flex gap align-center">
        <note-img v-if="noteType === 'img'" @addImg="addImg" class="btn"></note-img>
        <button @click="setTypeNote('text')"  class="btn"><ion-icon name="text-outline"></ion-icon></button>
        <button  @click="todo" class="btn"><ion-icon name="list-outline" ></ion-icon></button>
        <button  @click="setTypeNote('img')" class="btn"><ion-icon name="image-outline"></ion-icon></button>
      </div>
    </div>
  </section>`,
	data() {
		return {
			noteTxt: '',
			noteType: 'text',
			placeHolderVal: 'Add note',
			searchBoxClass: { focus: false },
		};
	},
	watch: {
		noteActive(newVal) {
			this.$refs.noteTxt.focus();
		},
	},

	methods: {
		setFocus() {},
		addNewNote() {
			if (!this.noteTxt) return;
			if (this.noteActive) {
				this.$emit('update', { note: this.noteActive, txt: this.noteTxt });
			} else {
				const { noteTxt, noteType } = this;
				this.$emit('add', { noteTxt, noteType });
			}
			this.noteTxt = '';
		},
		addImg(src) {
			this.$emit('add', { noteTxt: src, noteType: 'img' });
		},

		setTypeNote(type) {
			this.noteActive = null;
			this.noteType = type;
		},
		sortByType(type) {
			this.$emit('sortBy', type);
		},

		todo() {
			this.noteActive = null;
			this.noteType = 'todo';
			this.placeHolderVal = `Add ${this.noteType}`;
		},
		setSearchClass() {
			this.searchBoxClass.focus = !this.searchBoxClass.focus;
		},
	},
	components: {
		noteImg,
		noteType,
	},
};
