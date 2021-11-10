import { mailService } from '../services/mail.service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import { utilService } from '../../../services/util.service.js';
import mailList from '../cmps/mail-list.cmp.js';
import mailFilter from '../cmps/mail-filter.cmp.js';
import newMail from '../cmps/new-mail.cmp.js';

export default {
	template: `
        <section class="mail-app app-main flex column space-between main-layout">
            <div class="flex space-between">
                <mail-filter @filtered="setFilter" />
                <new-mail @send="sendMail"/>
            </div>
            <mail-list :mails="mailsToShow" @open="openMail" @remove="deleteMail" @starred="starredMail"/>
        </section>
    `,
	data() {
		return {
			mails: null,
			searchStr: '',
			filterBy: null,
		};
	},
	created() {
		this.loadMails();
	},
	methods: {
		starredMail(mailId) {
			mailService
				.getById(mailId)
				.then((mail) => mailService.save(mail))
				.then(() => {
					eventBus.$emit(utilService.createMsg('Starred successfully'));
					this.loadMails();
				})
				.catch((err) => {
					eventBus.$emit(
						'showMsg',
						utilService.createMsg('Error. Please try later', 'error')
					);
				});
		},
		deleteMail(id) {
			mailService
				.remove(id)
				.then(() => {
					const msg = {
						txt: 'Deleted successfully',
						type: 'success',
					};
					eventBus.$emit('showMsg', msg);
					this.loadMails();
				})
				.catch((err) => {
					eventBus.$emit(
						'showMsg',
						utilService.createMsg('Error. Please try later', 'error')
					);
				});
		},
		openMail(mail) {
			mail.isOpen = true;
			mailService.save(mail);
		},
		newMail() {
			console.log('New email');
		},
		sendMail() {
			console.log('Send email');
		},
		loadMails() {
			mailService.query().then((mails) => (this.mails = mails));
		},
		setFilter(filterBy) {
			this.filterBy = filterBy;
		},
	},
	computed: {
		mailsToShow() {
			if (!this.filterBy) return this.mails;
			const searchStr = this.filterBy.vendor.toLowerCase();
			const mailsToShow = this.mails.filter((mail) => {
				return mail.vendor.toLowerCase().includes(searchStr);
			});
			return mailsToShow;
		},
	},
	components: {
		mailList,
		mailFilter,
		newMail,
	},
};
