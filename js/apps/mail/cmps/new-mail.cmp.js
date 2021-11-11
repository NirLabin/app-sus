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
                        <input type="email" v-model="to">
                    </div>
                    <div class="flex">
                        <label for="text">Subject</label>
                        <input type="text" v-model="subject">
                    </div>
                    <textarea name="" id="" cols="30" rows="10" v-model="body"></textarea>
                    <button class="btn btn-blue" @click.prevent="send">Send</button>
                </form>
            </div>
        </div>
    `,
	data() {
		return {
			showNewMail: false,
		};
	},
	created() {
		this.to = this.composeData.to;
		this.subject = this.composeData.subject;
		this.body = this.composeData.body;
	},
	methods: {
		send() {
			const { to, subject, body } = this;
			this.$emit('send', { to, subject, body });
			this.toggleNewMsg();
		},
		toggleNewMsg() {
			this.$emit('close');
			this.to = this.subject = this.body = '';
		},
	},
};
