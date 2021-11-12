import { mailService } from '../services/mail.service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import { utilService } from '../../../services/util.service.js';
import mailList from '../cmps/mail-list.cmp.js';
import mailNav from '../cmps/mail-nav.cmp.js';
import mailDetails from '../cmps/email-details.cmp.js';
import mailFilter from '../cmps/mail-filter.cmp.js';
import newMail from '../cmps/new-mail.cmp.js';

export default {
	template: `
        <section class="mail-app app-main main-layout">
			<mail-filter @filtered="setFilter" @sorted="setSort"/>
			<mail-nav :activePage="page" @change="changePage" @compose="compose"/>
			<mail-details v-if="curMail" :mail="curMail" @back="showList" @remove="deleteMail" @replay="replay"/>
			<mail-list v-else :mails="mailsToShow" @open="openMail" @remove="deleteMail" @starred="starredMail"/>
			<new-mail v-if="showCompose" :composeData="composeData" @send="sendEmail" @close="showCompose=!showCompose"/>
        </section>`,
	data() {
		return {
			mails: null,
			curMail: null,
			searchStr: '',
			sortBy: 'all',
			page: 'inbox',
			showCompose: false,
			composeData: {
				to: '',
				subject: '',
				body: '',
			},
		};
	},
	created() {
		this.loadMails();
	},
	watch: {
		// page(newPage) {},
	},

	methods: {
		compose() {
			this.showCompose = !this.showCompose;
		},

		showList() {
			this.curMail = null;
		},

		changePage(page) {
			this.curMail = null;
			this.page = page;
		},

		starredMail(mail) {
			mail.isStarred = !mail.isStarred;
			this.saveMail(mail);
		},

		replay(fromEmail) {
			this.composeData.to = fromEmail;
			this.showCompose = !this.showCompose;
		},

		deleteMail(id) {
			this.curMail = null;
			mailService
				.getById(id)
				.then((mail) => {
					mail.isDeleted = true;
					return mailService.save(mail);
				})
				.then(() => {
					const msg = {
						txt: 'Deleted successfully',
						type: 'success',
					};
					this.loadMails();
					eventBus.$emit('showMsg', msg);
				})
				.catch((err) => {
					eventBus.$emit(
						'showMsg',
						utilService.createMsg('Error. Please try later', 'error')
					);
				});
		},
		openMail(mail, toggle = false) {
			if (!toggle) {
				mail.isOpen = true;
				this.curMail = mail;
			} else mail.isOpen = !mail.isOpen;
			this.saveMail(mail);
		},

		sendEmail(email) {
			mailService
				.sendEmail(email)
				.then(() => {
					this.loadMails();
					eventBus.$emit(utilService.createMsg('Starred successfully'));
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
		saveMail(mail) {
			mailService
				.save(mail)
				.then((mails) => this.loadMails())
				.catch((err) => console.log(err));
		},
		loadMails() {
			mailService.query().then((mails) => (this.mails = mails));
		},
	},
	computed: {
		mailsToShow() {
			if (!this.mails || !this.mails.length) return this.mails;
			let curEmailsPage;
			const page = this.page;
			if (page === 'trash') return mailService.getDeleted(this.mails);
			if (page === 'inbox') curEmailsPage = mailService.getInbox(this.mails);
			else if (page === 'sent') curEmailsPage = mailService.getSent(this.mails);
			if (this.sortBy === 'all' && !this.searchStr) return curEmailsPage;
			const showUnread = this.sortBy === 'read' ? true : false;
			return curEmailsPage.filter((email) => {
				const subjectInclude = email.subject
					.toLowerCase()
					.includes(this.searchStr);
				if (this.sortBy === 'all') return subjectInclude;
				return subjectInclude && email.isOpen === showUnread;
			});
		},
	},
	components: {
		mailList,
		mailFilter,
		mailNav,
		mailDetails,
		newMail,
	},
};
