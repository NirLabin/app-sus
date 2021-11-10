import newMail from '../cmps/new-mail.cmp.js';

export default {
	template: `
        <div class="mail-nav flex column">
            <new-mail @send="sendMail"/>
            <button class="btn" @click="navClicked('inbox')">Inbox</button> 
            <button class="btn" @click="navClicked('sent')">Sent</button> 
            <button class="btn" @click="navClicked('trash')">Trash</button>
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
			this.$emit('change', page);
		},
	},
	components: {
		newMail,
	},
};
