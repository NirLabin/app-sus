export default {
	props: ['note'],
	template: `
		<div class="note-color">
			<button  class="btn btn-palette flex align-center"  @mouseover='togglePalette' @mouseleave='togglePalette'>
				<ion-icon name="color-palette-outline"></ion-icon>
			</button>
			<ul v-if="showPalette" class="pick-color clean-list flex align-center">
				<li v-for="(color,idx) in colors">
					<button class="btn btn-color " :style="{backgroundColor:color}" @click="pick(color)"></button>
				</li>
			</ul>
		</div>
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
			showPalette: false,
		};
	},
	created() {
		this.curColor = this.note.style.bgc;
	},
	methods: {
		togglePalette() {
			this.showPalette = !this.showPalette;
		},
		pick(color) {
			const newData = { color, note: this.note };
			this.$emit('color', newData);
		},
	},
};
