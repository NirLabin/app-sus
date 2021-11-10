export default {
	template: `
        <div class="mail-filter">
            <input @input="filter" type="text" placeholder="Search mail" class="input-search" v-model="searchStr">
			<span>Sort By</span>
			<select name="mails" id="mails" v-model="selected" @change="sort">
				<option value="all" selected>All</option>
				<option value="unread">unread</option>
				<option value="read">read</option>
			</select>
        </div>
    `,
	data() {
		return {
			selected: 'all',
			searchStr: '',
		};
	},
	methods: {
		sort() {
			console.log(this.selected);
			this.$emit('sorted', this.selected);
		},
		filter() {
			this.$emit('filtered', this.searchStr);
			// this.$emit('filtered', this.freeTxt);
		},
	},
};
