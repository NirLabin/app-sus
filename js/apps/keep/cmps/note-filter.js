import noteType from './note-type.js';

export default {
	template: `
      <section class="note-filter flex align-center">
        <div class="search-box flex-def" :class="searchBoxClass">
          <ion-icon class="search-icon" name="search-outline"></ion-icon>
          <input class="input-note-filter" type="search" v-model="str" @input="filter" placeholder="Search..."  @focus="setSearchClass" @blur="setSearchClass">
        </div>
        <note-type @type="sortByType"></note-type>
      </section>
      `,
	data() {
		return {
			str: '',
			searchBoxClass: { focus: false },
		};
	},
	methods: {
		filter() {
			this.$emit('filter', this.str);
		},

		sortByType(type) {
			this.$emit('sortBy', type);
		},

		setSearchClass() {
			this.searchBoxClass.focus = !this.searchBoxClass.focus;
		},
	},
	components: {
		noteType,
	},
};
