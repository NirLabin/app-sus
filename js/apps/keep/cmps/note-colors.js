export default {
  template: `
          <section class="pick-color">
              <div class="color-1" @click="onColor(0)"></div>
              <div class="color-2"  @click="onColor(1)"></div>
              <div class="color-3" @click="onColor(2)"></div>
              <div class="color-4" @click="onColor(3)"></div>
              <div class="color-5" @click="onColor(4)"></div>
              <div class="color-6" @click="onColor(5)"></div>
              <div class="color-7" @click="onColor(6)"></div>
              <div class="color-8" @click="onColor(7)"></div>
              <div class="color-9" @click="onColor(8)"></div>
          </section>
      `,

  methods: {
    onColor(idx) {
      const colors = [
        '#FFFFFC',
        '#FFC6FF',
        '#BDB2FF',
        '#A0C4FF',
        '#9BF6FF',
        '#CAFFBF',
        '#FDFFB6',
        '#FFD6A5',
        '#FFADAD',
      ];

      this.$emit('color', colors[idx]);
    },
  },
};
