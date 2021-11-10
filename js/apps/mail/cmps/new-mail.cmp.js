export default {
	template: `
        <div class="new-mail">
            <button class="btn btn-white" to="/mail/edit" @click="newMail"> + New mail</button>
            <div v-if="showNewMail" class='modal flex column'>
                <header class="flex space-between">
                    <h4>New message</h4>
                    <div class="control-btns">
                        <button class="btn" @click="toggleNewMsg">X</button>
                    </div>
                </header>
                <form action="" class="flex column">
                    <div class="flex">
                        <label for="email">To</label>
                        <input type="email" v-model="email">
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
			email: '',
			subject: '',
			messageTxt: '',
		};
	},
	methods: {
		send() {
			const { email, subject, messageTxt } = this;
			this.$emit('send', { email, subject, messageTxt });
			this.toggleNewMsg();
		},
		toggleNewMsg() {
			console.log(this);
			this.showNewMail = !this.showNewMail;
		},
		newMail() {
			console.log('new mail');
			this.showNewMail = true;
		},
	},
};
