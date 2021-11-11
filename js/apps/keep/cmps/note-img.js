export default {
	template: `
       <section>
      <input type="file" accept="image/jpeg" @change=uploadImage>
        <img :src="previewImage" alt="">
      </section>
      `,
	data() {
		return {
			previewImage: null,
		};
	},

	methods: {
		uploadImage(e) {
			const reader = new FileReader();
			reader.onload = (event) => {
				let img = new Image();
				img.src = event.target.result;
				this.previewImage = event.target.result;
			};
			reader.readAsDataURL(e.target.files[0]);
			this.$emit('img', this.previewImage);
		},
	},
};
