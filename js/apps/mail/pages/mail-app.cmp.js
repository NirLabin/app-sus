import { mailService } from '../services/mail.service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import userMsg from '../../../cmps/user-msg.cmp.js';
import { utilService } from '../../../services/util.service.js';
import mailList from '../cmps/mail-list.cmp.js';
import mailNav from '../cmps/mail-nav.cmp.js';
import mailDetails from '../cmps/email-details.cmp.js';
import mailFilter from '../cmps/mail-filter.cmp.js';
import newMail from '../cmps/new-mail.cmp.js';

export default {
	template: `
        <section class="mail-app app-main main-layout">
			<mail-filter @filtered="setFilter" @sort="setSort"/>
			<mail-nav :activePage="page" @change="changePage" @compose="compose"/>
			<mail-details v-if="curMail" :mail="curMail" @back="showList" @remove="deleteMail" @replay="sendEmail"/>
			<mail-list v-else :mails="mailsToShow" :page="page" @open="openMail" @starred="starredMail" @readState="changeReadingState"/>
			<new-mail v-if="showCompose" :composeData="composeData" @send="sendEmail" @close="showCompose=!showCompose"/>
        </section>`,
	data() {
		return {
			mails: { inbox: null, sent: null, deleted: null },
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
		Object.keys(this.mails).forEach((key) => this.loadMails(key));
	},
	methods: {
		compose() {
			this.showCompose = !this.showCompose;
		},

		changeReadingState(mail) {
			mail.isOpen = !mail.isOpen;
			this.saveMail(mail);
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

		replay(replayData) {
			this.composeData.to = email.from.email;
			this.showCompose = !this.showCompose;
		},

		deleteMail(mail) {
			this.curMail = null;
			this.mails.deleted.push(mail);
			this.saveMail(mail, 'deleted');
			console.log(this.page);
			mailService.remove(mail.id, this.page).then(() => {
				console.log(this);
				this.loadMails(this.page);

				eventBus.$emit(
					'showMsg',
					utilService.createUserMsg('Note added', 'success')
				);
			});
		},

		openMail(mail) {
			mail.isOpen = true;
			this.curMail = mail;
			this.saveMail(mail);
		},

		sendEmail(email) {
			mailService
				.sendEmail(email)
				.then(() => this.loadMails('sent'))
				.catch((err) => console.log(err));
		},
		setFilter(searchStr) {
			this.searchStr = searchStr;
		},
		setSort(sortBy) {
			this.sortBy = sortBy;
		},

		saveMail(mail, key = 'inbox') {
			mailService
				.save(mail, key)
				.then((mails) => this.loadMails(key))
				.catch((err) => console.log(err));
		},

		loadMails(key = 'inbox') {
			mailService.query(key).then((mails) => (this.mails[key] = mails));
		},
	},
	computed: {
		mailsToShow() {
			let curEmails = this.mails[this.page];
			const { page, searchStr, sortBy } = this;
			if (
				(!searchStr && sortBy === 'all') ||
				(sortBy !== 'all' && page !== 'inbox')
			)
				return curEmails;
			const showUnread = sortBy === 'read' ? true : false;
			return curEmails.filter(({ subject, isOpen }) => {
				const subjectInclude = subject.toLowerCase().includes(searchStr);
				if (sortBy === 'all' || page !== 'inbox') return subjectInclude;
				return subjectInclude && isOpen === showUnread;
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
