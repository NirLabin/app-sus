export default {
	props: ['activePage'],
	template: `
        <div class="mail-nav-container">
			<button class="btn btn-menu" @click="showMenu"><ion-icon name="menu"></ion-icon></button>
			<div class="mail-nav-list flex column">
				<button class="btn btn-compose" @click="compose"> +Compose</button>
				<button class="btn btn-mail-nav" :class="navActive('inbox')" @click="navClicked('inbox')">Inbox</button> 
				<button class="btn btn-mail-nav" :class="navActive('sent')" @click="navClicked('sent')">Sent</button> 
				<button class="btn btn-mail-nav" :class="navActive('deleted')" @click="navClicked('deleted')">Trash</button>
			</div>
        </div>
    `,
	data() {
		return {};
	},
	methods: {
		sendMail(email) {
			this.$emit('send', email);
		},
		navClicked(page) {
			console.log(page);
			this.$emit('change', page);
		},
		navActive(btnName) {
			return { active: btnName === this.activePage };
		},
		compose() {
			this.$emit('compose');
		},
		showMenu(e) {
			console.log(e);
		},
	},
	components: {},
};