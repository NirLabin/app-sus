import emailReplay from './email-replay.js';

export default {
	props: ['email', 'page'],
	template: `
        <div class="email-details">
            <div v-if="page!=='deleted'" class="email-details-header flex-def">
                <button class="btn btn-icon" @click="back"><ion-icon name="arrow-back-outline"/></button>
                <button class="btn btn-icon" @click="showReplay=!showReplay"><ion-icon name="arrow-undo-sharp"/></button>
                <button class="btn btn-icon" @click="remove"><ion-icon name="trash-outline"/></button>
            </div>
			<div v-else class="email-details-header">
				<button class="btn" @click="undelete">Undelete this Email</button>
			</div>
			<div class="details-body flex column gap">	
				<h3>{{email.subject}}</h3>
				<p>{{email.from.fullName}}</p>
				<p>{{email.body}}</p>
			</div>
			<email-replay v-if="showReplay" :email="email" @send="replay"/>
        </div>
    `,
	data() {
		return { showReplay: false };
	},
	methods: {
		back() {
			this.$emit('back');
		},
		remove() {
			this.$emit('remove', this.email);
		},
		replay(body) {
			this.showReplay = !this.showReplay;
			const email = { body, subject: this.email.subject, to: this.email.from };
			this.$emit('replay', email);
		},
		undelete() {
			this.$emit('undelete', this.email);
		},
	},
	components: {
		emailReplay,
	},
};
