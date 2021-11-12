import emailReplay from '../cmps/email-replay.js';

export default {
	props: ['mail', 'page'],
	template: `
        <div class="email-details">
            <div v-if="page!=='deleted'" class="email-details-header">
                <button class="btn" @click="back"><ion-icon name="arrow-back-outline"/></button>
                <button class="btn" @click="replay"><ion-icon name="arrow-undo-sharp"/></button>
                <button class="btn" @click="save"><ion-icon name="paper-plane"/></button>
                <button class="btn" @click="remove"><ion-icon name="trash-outline"/></button>
            </div>
            <h3>{{mail.subject}}</h3>
            <p>{{mail.from}}</p>
            <p>{{mail.body}}</p>
			<email-replay :mail="mail"/>
        </div>
    `,
	data() {
		return {};
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
		replay() {
			this.$emit('replay', this.mail);
		},
		save() {
			console.log('save email to notes');
		},
	},
	components: {
		emailReplay,
	},
};
