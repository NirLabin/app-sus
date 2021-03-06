import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import userMsg from '../../../cmps/user-msg.cmp.js';
import { utilService } from '../../../services/util.service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailNav from '../cmps/email-nav.cmp.js';
import emailDetails from '../cmps/email-details.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import newEmail from '../cmps/new-email.cmp.js';
import emailSummery from '../cmps/email-summery.cmp.js';

export default {
	template: `
        <section class="email-app app-main main-layout">
			<email-filter @filtered="setFilter" @sort="setSort"/>
			<email-nav :activePage="page" @change="changePage" @compose="compose"/>
			<email-details v-if="curEmail" :email="curEmail" :page="page" @back="showList" @remove="deleteEmail" @replay="sendEmail" @undelete="undelete"/>
			<email-list v-else :emails="emailsToShow" :page="page" @open="openEmail" @starred="starredEmail" @readState="changeReadingState"/>
			<new-email v-if="showCompose" :composeData="composeData" @send="sendEmail" @close="showCompose=!showCompose"/>
			<email-summery v-if="showSummery" :emails="emails.inbox"/>
		</section>`,
	data() {
		return {
			emails: { inbox: null, sent: null, deleted: null },
			curEmail: null,
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
		Object.keys(this.emails).forEach((key) => this.loadEmails(key));
	},
	methods: {
		compose() {
			this.showCompose = !this.showCompose;
		},

		changeReadingState(email) {
			email.isOpen = !email.isOpen;
			this.saveEmail(email, this.page);
		},

		showList() {
			this.curEmail = null;
		},

		changePage(page) {
			this.curEmail = null;
			this.page = page;
		},

		starredEmail(email) {
			email.isStarred = !email.isStarred;
			this.saveEmail(email, this.page);
		},

		replay(replayData) {
			this.composeData.to = email.from.email;
			this.showCompose = !this.showCompose;
		},

		deleteEmail(email) {
			this.curEmail = null;
			emailService.add(email, 'deleted').then((emails) => {
				this.emails.deleted.push(email);
			});
			emailService.remove(email.id, this.page).then(() => {
				this.loadEmails(this.page);
				eventBus.$emit(
					'showMsg',
					utilService.createUserMsg('Email deleted', 'success')
				);
			});
		},
		undelete(email) {
			this.curEmail = null;
			emailService.add(email, email.type.category).then((emails) => {
				this.emails[email.type.category].push(email);
			});
			emailService.remove(email.id, this.page).then(() => {
				this.loadEmails(this.page);
				eventBus.$emit(
					'showMsg',
					utilService.createUserMsg('Email restored', 'success')
				);
			});
		},

		openEmail(email) {
			email.isOpen = true;
			this.curEmail = email;
			this.saveEmail(email, this.page);
		},

		sendEmail(email) {
			emailService
				.sendEmail(email)
				.then(() => {
					this.loadEmails('sent');
					eventBus.$emit(
						'showMsg',
						utilService.createUserMsg('Email sent', 'success')
					);
				})
				.catch((err) => console.log(err));
		},
		setFilter(searchStr) {
			this.searchStr = searchStr;
		},

		setSort(sortBy) {
			this.sortBy = sortBy;
		},

		saveEmail(email, key = 'inbox') {
			emailService
				.save(email, key)
				.then((emails) => this.loadEmails(key))
				.catch((err) => console.log(err));
		},

		loadEmails(key = 'inbox') {
			emailService.query(key).then((emails) => (this.emails[key] = emails));
		},
	},
	computed: {
		emailsToShow() {
			let curEmails = this.emails[this.page];
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
		showSummery() {
			return this.page === 'inbox' && this.emails.inbox && !this.curEmail;
		},
	},
	components: {
		emailList,
		emailFilter,
		emailNav,
		emailDetails,
		newEmail,
		emailSummery,
	},
};
