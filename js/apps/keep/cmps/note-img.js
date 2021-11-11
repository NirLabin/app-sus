export default {
	template: `
       <section>
      <input type="file" accept="image/jpeg" @change=uploadImage>

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
				this.$emit('addImg', this.previewImage);
			};
			reader.readAsDataURL(e.target.files[0]);
		},
	},
};
