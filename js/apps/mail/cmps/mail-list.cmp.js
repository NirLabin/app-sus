import mailPreview from '../cmps/mail-preview.cmp.js';

export default {
	props: ['mails'],
	template: `
        <section class="mail-list-container main-layout">
            <ul v-if="mails&&mails.length" class="mail-list clean-list flex column">
                <li v-for="mail in mails" :key="mail.id" :class="{open:!mail.isOpen}"  class="mail-row flex">
                    <mail-preview :mail='mail' @click.native="openMail(mail)"/>
                    <div class="actions">
                        <button class="btn" @click="remove(mail.id)"><ion-icon name="trash-outline"></ion-icon></button>
                        <button class='btn' @click="starred(mail.id)"><ion-icon name="star"></ion-icon></button>
                    </div>
                </li>
            </ul>
            <div v-else><p>There is no emails to show</p></div>   
        </section>
    `,
	created() {},
	methods: {
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
	components: {
		mailPreview,
	},
};
