export default {
  props: ['activePage'],
  template: `
        <div class="email-nav-container">
			<button class="btn btn-menu" @click="showMenu"><ion-icon name="menu"></ion-icon></button>
			<div class="email-nav-list flex column" v-if="menuOpen">
				<button class="btn btn-compose" @click="compose"> +Compose</button>
				<button class="btn btn-email-nav" :class="navActive('inbox')" @click="navClicked('inbox')">Inbox</button> 
				<button class="btn btn-email-nav" :class="navActive('sent')" @click="navClicked('sent')">Sent</button> 
				<button class="btn btn-email-nav" :class="navActive('deleted')" @click="navClicked('deleted')">Trash</button>
				<!-- <button class="btn btn-email-nav" :class="navActive('starred')" @click="navClicked('starred')">Starred</button> -->
			</div>
        </div>
    `,
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    sendMail(email) {
      this.$emit('send', email);
      this.menuOpen = !this.menuOpen;
    },
    navClicked(page) {
      this.$emit('change', page);
      this.menuOpen = !this.menuOpen;
    },
    navActive(btnName) {
      return { active: btnName === this.activePage };
      this.menuOpen = !this.menuOpen;
    },
    compose() {
      this.$emit('compose');
      this.menuOpen = !this.menuOpen;
    },
    showMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
  components: {},
};
