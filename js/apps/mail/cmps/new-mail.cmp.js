export default {
	props: ['composeData'],
	template: `
        <div class="new-mail">
            <div class='email-compose flex column'>
                <header class="email-compose-header flex space-between">
                    <h4>New message</h4>
                    <div class="control-btns">
                        <button class="btn" @click="toggleNewMsg">X</button>
                    </div>
                </header>
                <form action="" class="flex column">
                    <div class="flex">
                        <label for="email">To</label>
                        <input type="email" v-model="toEmail">
                    </div>
                    <div class="flex">
                        <label for="text">Subject</label>
                        <input type="text" v-model="subject">
                    </div>
                    <textarea name="" id="" cols="30" rows="10" v-model="messageTxt"></textarea>
                    <button class="btn btn-blue" @click.prevent="send">Send</button>
                </form>
            </div>
        </div>
    `,
	data() {
		return {
			showNewMail: false,
			toEmail: '',
			subject: '',
			messageTxt: '',
		};
	},
	created() {
		this.to = this.composeData.to;
		this.to = this.composeData.to;
	},
	methods: {
		send() {
			const { toEmail, subject, messageTxt } = this;
			this.$emit('send', { toEmail, subject, messageTxt });
			this.toggleNewMsg();
		},
		toggleNewMsg() {
			this.$emit('close');
			this.toEmail = this.subject = this.messageTxt = '';
		},
	},
};
