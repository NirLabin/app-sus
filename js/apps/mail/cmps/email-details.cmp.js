import emailReplay from '../cmps/email-replay.js';

export default {
	props: ['mail', 'page'],
	template: `
        <div class="email-details">
            <div v-if="page!=='deleted'" class="email-details-header">
                <button class="btn" @click="back"><ion-icon name="arrow-back-outline"/></button>
                <button class="btn" @click="showReplay=!showReplay"><ion-icon name="arrow-undo-sharp"/></button>
                <button class="btn" @click="save"><ion-icon name="paper-plane"/></button>
                <button class="btn" @click="remove"><ion-icon name="trash-outline"/></button>
            </div>
			<div class="details-body flex column gap">	
				<h3>{{mail.subject}}</h3>
				<p>{{mail.from.fullName}}</p>
				<p>{{mail.body}}</p>
			</div>
			<email-replay v-if="showReplay" :mail="mail" @send="replay"/>
        </div>
    `,
	data() {
		return {
			showReplay: false,
		};
	},
	created() {},
	computed: {},
	methods: {
		back() {
			this.$emit('back');
		},
		remove() {
			this.$emit('remove', this.mail);
		},
		replay(body) {
			this.showReplay = !this.showReplay;
			const email = { body, subject: this.mail.subject, to: this.mail.from };
			this.$emit('replay', email);
			// this.$emit('replay', this.mail);
		},
		save() {
			console.log('save email to notes');
		},
	},
	components: {
		emailReplay,
	},
};
