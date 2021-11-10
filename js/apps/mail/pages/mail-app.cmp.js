import { mailService } from '../services/mail.service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import { utilService } from '../../../services/util.service.js';
import mailList from '../cmps/mail-list.cmp.js';
import mailNav from '../cmps/mail-nav.cmp.js';
import mailDetails from '../cmps/email-details.cmp.js';
import mailFilter from '../cmps/mail-filter.cmp.js';

export default {
	template: `
        <section class="mail-app app-main flex column space-between main-layout">
            <mail-filter @filtered="setFilter" @sorted="setSort"/>
			<div class="flex">
				<mail-nav @send="sendEmail" @change="changePage"/>
				<mail-details v-if="curMail" :mail="curMail"/>
				<mail-list v-else :mails="mailsToShow2" @open="openMail" @remove="deleteMail" @starred="starredMail"/>
			</div>
        </section>
    `,
	data() {
		return {
			mails: null,
			searchStr: '',
			filterBy: null,
			sortBy: 'all',
			page: 'inbox',
			curMail: null,
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
				.getById(id)
				.then((mail) => {
					mail.isDeleted = true;
					mailService.save(mail);
				})
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
			mailService.save(mail).then((mail) => console.log(mail));
			this.curMail = mail;
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

		setFilter(searchStr) {
			this.searchStr = searchStr;
		},

		setSort(sortBy) {
			this.sortBy = sortBy;
		},

		loadMails() {
			mailService.query().then((mails) => (this.mails = mails));
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
			if (!this.mails || !this.mails.length) return this.mails;
			let curEmailsPage;
			const page = this.page;
			if (page === 'trash') return mailService.getDeleted(this.mails);
			if (page === 'inbox') curEmailsPage = mailService.getInbox(this.mails);
			else if (page === 'sent') curEmailsPage = mailService.getSent(this.mails);
			if (this.sortBy === 'all' && !this.searchStr) return curEmailsPage;
			const showUnread = this.sortBy === 'read' ? true : false;
			return curEmailsPage.filter((email) => {
				return email.isOpen === showUnread;
			});
		},
	},
	components: {
		mailList,
		mailFilter,
		mailNav,
		mailDetails,
	},
};
