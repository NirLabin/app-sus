export default {
  template: `
       <section>
       <!-- <img src:"previewImage" class="uploading-image" /> -->
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
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
    },
  },
};
