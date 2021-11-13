export default {
	props: ['activePage'],
	template: `
        <div class="email-nav-container">
			<button class="btn btn-menu" @click="toggleMenu"><ion-icon name="menu"/></button>
			<div class="email-nav-list flex column" :class="navClass">
				<button class="btn btn-menu" @click="toggleMenu"><ion-icon name="close-outline"/></button>
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
			navClass: { open: false },
		};
	},
	methods: {
		sendMail(email) {
			this.$emit('send', email);
			if (this.navClass.open) this.navClass.open = false;
		},
		navClicked(page) {
			this.$emit('change', page);
			if (this.navClass.open) this.navClass.open = false;
		},
		navActive(btnName) {
			return { active: btnName === this.activePage };
		},
		compose() {
			this.$emit('compose');
			this.menuOpen = !this.menuOpen;
		},
		toggleMenu() {
			this.navClass.open = !this.navClass.open;
			// this.menuOpen = !this.menuOpen;
		},
	},
	computed: {},
	components: {},
};
