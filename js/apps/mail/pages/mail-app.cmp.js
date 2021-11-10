import { mailService } from '../services/mail.service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import { utilService } from '../../../services/util.service.js';
import mailList from '../cmps/mail-list.cmp.js';
import mailNav from '../cmps/mail-nav.cmp.js';
import mailFilter from '../cmps/mail-filter.cmp.js';

export default {
	template: `
        <section class="mail-app app-main flex column space-between main-layout">
            <mail-filter @filtered="setFilter" @sort="setSort"/>
			<mail-nav @send="sendEmail" @changePage="changePage"/>
            <mail-list :mails="mailsToShow" @open="openMail" @remove="deleteMail" @starred="starredMail"/>
        </section>
    `,
	data() {
		return {
			mails: null,
			searchStr: '',
			filterBy: null,
			sortBy: 'all',
			page: 'inbox',
		};
	},
	created() {
		this.loadMails();
	},
	watch: {
		// page(newPage) {},
	},

	methods: {
		changePage(page) {
			this.page = page;
		},
		starredMail(mailId) {
			mailService
				.getById(mailId)
				.then((mail) => {
					mail.isStarred = !mail.isStarred;
					mailService.save(mail);
				})
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
		sendEmail(email) {
			mailService
				.sendEmail(email)
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
		loadMails() {
			mailService.query().then((mails) => (this.mails = mails));
		},
		setFilter(filterBy) {
			this.filterBy = filterBy;
		},
		setSort(sortBy) {
			this.sortBy = sortBy;
		},
	},
	computed: {
		mailsToShow() {
			if (!this.filterBy && this.sortBy === 'all') return this.mails;
			const searchStr = this.filterBy.toLowerCase();
			const isRead = this.sortBy === 'unread' ? false : true;
			const mailsToShow = this.mails.filter((mail) => {
				return (
					mail.subject.toLowerCase().includes(searchStr) &&
					mail.isOpen === isRead
				);
			});
			return mailsToShow;
		},
		mailsToShow2() {
			if (this.currentPage === 'inbox') return mailService.getInbox(this.mails);
			if (this.currentPage === 'sent') return mailService.getSent(this.mails);
		},
	},
	components: {
		mailList,
		mailFilter,
		mailNav,
	},
};
