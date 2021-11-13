export default {
	props: ['email'],
	template: `
        <div class="email-replay flex column gap">
            <div class="flex-def"> 
                <ion-icon name="arrow-undo-sharp"/>
                <span> {{email.from.email}}</span>
            </div>
            <textarea name="" id="" cols="30" rows="10" v-model="body"></textarea>
            <button class="btn btn-blue" @click="send">Send</button>
        </div>
    `,
	data() {
		return { body: '' };
	},
	methods: {
		send() {
			if (!this.body) return;
			this.$emit('send', this.body);
		},
	},
};
