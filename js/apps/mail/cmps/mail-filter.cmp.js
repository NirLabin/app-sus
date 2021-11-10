export default {
	template: `
        <div class="mail-filter ">
            <input @input="filter" type="text" placeholder="Search mail" class="input-search">
        </div>
    `,
	data() {
		return {
			// freeTxt: '',
		};
	},
	methods: {
		filter() {
			this.$emit('filtered', { ...this.filterBy });
			// this.$emit('filtered', this.freeTxt);
		},
	},
};
