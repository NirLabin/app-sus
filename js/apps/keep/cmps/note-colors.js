export default {
	props: ['note'],
	template: `
          <ul class="pick-color clean-list flex align-center">
            <li v-for="(color,idx) in colors">
              <button class="btn btn-color" :style="{backgroundColor:color}" @click="pick(color)"></button>
            </li>
          </ul>
      `,
	data() {
		return {
			colors: [
				'#FFFFFC',
				'#FFC6FF',
				'#BDB2FF',
				'#A0C4FF',
				'#9BF6FF',
				'#CAFFBF',
				'#FDFFB6',
				'#FFD6A5',
				'#FFADAD',
			],
		};
	},
	methods: {
		pick(color) {
			const newData = { color, note: this.note };
			this.$emit('color', newData);
		},
	},
};
