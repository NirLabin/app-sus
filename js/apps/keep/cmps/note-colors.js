export default {
  props: ['note'],
  template: `
		<div class="note-color">
			<button  class="btn btn-palette flex align-center"  @mouseover='paletteStay' >
				<ion-icon name="color-palette-outline"></ion-icon>
			</button>
			<ul v-if="showPalette" class="pick-color clean-list flex align-center"  @mouseover="paletteStay" @mouseleave="paletteMove">
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
    this.curColor = this.note?.style?.bgc || '#a0c4ff';
  },
  methods: {
    paletteMove() {
      this.showPalette = false;
    },

    paletteStay() {
      this.showPalette = true;
    },
    pick(color) {
      const newData = { color, note: this.note };
      this.$emit('color', newData);
    },
  },
};
