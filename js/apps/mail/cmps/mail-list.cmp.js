import mailPreview from '../cmps/mail-preview.cmp.js';

export default {
	props: ['mails'],
	template: `
        <section class="mail-list-container main-layout">
            <ul v-if="mails&&mails.length" class="mail-list clean-list flex column">
                <li v-for="mail in mails" :key="mail.id" :class="{open:!mail.isOpen}"  class="mail-row flex gap">
                    <div class="actions flex gap">
                        <button class="btn" @click="remove(mail.id)"><ion-icon name="trash-outline"></ion-icon></button>
                        <button class='btn' @click="starred(mail.id)">
							<ion-icon :name="starType(mail.isStarred)" :class="{starred:mail.isStarred}"></ion-icon></button>
                    </div>
                    <mail-preview :mail='mail' @click.native="openMail(mail)" @open="openMail(mail)"/>
					
                </li>
            </ul>
            <div v-else><p>There is no emails to show</p></div>   
        </section>
    `,
	created() {},
	methods: {
		starType(isStarred) {
			if (isStarred) return 'star';
			return 'star-outline';
		},
		starred(mailId) {
			this.$emit('starred', mailId);
		},
		openMail(mail) {
			this.$emit('open', mail);
		},
		remove(mailId) {
			this.$emit('remove', mailId);
		},
	},
	computed: {
		getStarForDisplay() {},
	},
	components: {
		mailPreview,
	},
};
