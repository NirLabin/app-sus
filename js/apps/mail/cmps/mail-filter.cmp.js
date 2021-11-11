export default {
	template: `
        <div class="mail-filter">
			<div class="search-box flex align-center" :class="searchBoxClass">
				<ion-icon name="search-outline"></ion-icon>
				<input @input="filter" type="text" placeholder="Search mail" class="input-search" v-model="searchStr" @focus="setSearchClass" @blur="setSearchClass">
			</div>
			<div class="mail-filter-sort">
				<span>Sort By</span>
				<select name="mails" id="mails" v-model="selected" @change="sort">
					<option value="all" selected>All</option>
					<option value="unread">unread</option>
					<option value="read">read</option>
				</select>
			</div>
        </div>
    `,
	data() {
		return {
			selected: 'all',
			searchStr: '',
			searchBoxClass: { focus: false },
		};
	},
	methods: {
		sort() {
			this.$emit('sorted', this.selected);
		},
		filter() {
			this.$emit('filtered', this.searchStr);
		},
		setSearchClass() {
			this.searchBoxClass.focus = !this.searchBoxClass.focus;
		},
	},
};
