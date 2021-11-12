import emailPreview from './email-preview.cmp.js';

export default {
	props: ['emails', 'page'],
	template: `
        <section class="email-list-container">
            <ul v-if="emails&&emails.length" class="email-list clean-list flex column">
                <li v-for="email in emails" :key="email.id" :class="{open:!email.isOpen&&!isDeleted}"  class="email-row flex gap">
                    <div v-if="!isDeleted" class="actions flex-def">
                        <button class='btn' @click="starred(email)" :class="{starred:email.isStarred}"><ion-icon :name="starType(email.isStarred)" /></button>
                        <button class='btn' @click="changeReadState(email)"><ion-icon :name="emailType(email.isOpen)"/></button>
                    </div>
                    <email-preview :mail='email' :page="page" @click.native="openEmail(email)"/>
                </li>
            </ul>
            <div v-else><p>There is no emails to show</p></div>   
        </section>
    `,
	created() {
		this.isDeleted = this.page === 'deleted';
	},
	methods: {
		starType(isStarred) {
			if (isStarred) return 'star';
			return 'star-outline';
		},
		starred(email) {
			this.$emit('starred', email);
		},
		openEmail(email) {
			this.$emit('open', email);
		},
		changeReadState(email) {
			this.$emit('readState', email);
		},
		emailType(isOpen) {
			return `email${isOpen ? '-open' : ''}`;
		},
	},
	components: {
		emailPreview,
	},
};
