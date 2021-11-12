export default {
	props: ['options'],
	template: `
		<select v-for="(option,idx) in options" v-model="selected" @change="sort" :key="idx">
			<option value="getOption(option)">{{option}}</option>
		</select>`,
	data() {
		return { selected: 'all' };
	},
	methods: {
		sort() {
			this.$emit('selected', this.selected);
		},
	},
};
