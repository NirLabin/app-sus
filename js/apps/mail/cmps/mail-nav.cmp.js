export default {
	props: ['activePage'],
	template: `
        <div class="mail-nav flex column">
			<button class="btn btn-menu"><ion-icon name="menu"></ion-icon></button>
            <button class="btn btn-compose" @click="compose"> +Compose</button>
            <button class="btn btn-mail-nav" :class="navActive('inbox')" @click="navClicked('inbox')">Inbox</button> 
            <button class="btn btn-mail-nav" :class="navActive('sent')" @click="navClicked('sent')">Sent</button> 
            <button class="btn btn-mail-nav" :class="navActive('trash')" @click="navClicked('trash')">Trash</button>
        </div>
    `,
	data() {
		return {};
	},
	methods: {
		sendMail(email) {
			console.log(email);
			this.$emit('send', email);
		},
		navClicked(page) {
			this.$emit('change', page);
		},
		navActive(btnName) {
			return { active: btnName === this.activePage };
		},
		compose() {
			this.$emit('compose');
		},
	},
	components: {},
};
