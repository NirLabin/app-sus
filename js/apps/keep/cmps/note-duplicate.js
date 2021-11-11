export default {
  template: `
           <section>
          <button @click="duplicateNote">©</button>
          </section>
          `,
  data() {
    return {};
  },

  methods: {
    duplicateNote() {
      this.$emit('duplicate');
    },
  },
};
