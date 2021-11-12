import mailPreview from '../cmps/mail-preview.cmp.js';

export default {
	props: ['mails', 'page'],
	template: `
        <section class="mail-list-container">
            <ul v-if="mails&&mails.length" class="mail-list clean-list flex column">
                <li v-for="mail in mails" :key="mail.id" :class="{open:!mail.isOpen&&!isDeleted}"  class="mail-row flex gap">
                    <div v-if="!isDeleted" class="actions flex-def">
                        <button class='btn' @click="starred(mail)" :class="{starred:mail.isStarred}"><ion-icon :name="starType(mail.isStarred)" /></button>
                        <button class='btn' @click="changeReadState(mail)"><ion-icon :name="mailType(mail.isOpen)"/></button>
                    </div>
                    <mail-preview :mail='mail' @click.native="openMail(mail)"/>
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
		starred(mail) {
			this.$emit('starred', mail);
		},
		openMail(mail) {
			this.$emit('open', mail);
		},
		changeReadState(mail) {
			this.$emit('readState', mail);
		},
		mailType(isOpen) {
			return `mail${isOpen ? '-open' : ''}`;
		},
	},
	computed: {},
	components: {
		mailPreview,
	},
};
