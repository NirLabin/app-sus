import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import userMsg from '../../../cmps/user-msg.cmp.js';
import { utilService } from '../../../services/util.service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailNav from '../cmps/email-nav.cmp.js';
import emailDetails from '../cmps/email-details.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import newEmail from '../cmps/new-email.cmp.js';

export default {
	template: `
        <section class="email-app app-main main-layout">
			<email-filter @filtered="setFilter" @sort="setSort"/>
			<email-nav :activePage="page" @change="changePage" @compose="compose"/>
			<email-details v-if="curEmail" :email="curEmail" @back="showList" @remove="deleteEmail" @replay="sendEmail"/>
			<email-list v-else :mails="mailsToShow" :page="page" @open="openEmail" @starred="starredEmail" @readState="changeReadingState"/>
			<new-email v-if="showCompose" :composeData="composeData" @send="sendEmail" @close="showCompose=!showCompose"/>
        </section>`,
	data() {
		return {
			mails: { inbox: null, sent: null, deleted: null },
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
		Object.keys(this.mails).forEach((key) => this.loadEmails(key));
	},
	methods: {
		compose() {
			this.showCompose = !this.showCompose;
		},

		changeReadingState(email) {
			email.isOpen = !email.isOpen;
			this.saveEmail(email);
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
			this.saveEmail(email);
		},

		replay(replayData) {
			this.composeData.to = email.from.email;
			this.showCompose = !this.showCompose;
		},

		deleteEmail(email) {
			this.curEmail = null;
			emailService.add(email, 'deleted').then((mails) => {
				this.mails.deleted.push(email);
			});
			emailService.remove(email.id, this.page).then(() => {
				this.loadEmails(this.page);
				eventBus.$emit(
					'showMsg',
					utilService.createUserMsg('Note added', 'success')
				);
			});
		},

		openEmail(email) {
			email.isOpen = true;
			this.curEmail = email;
			this.saveEmail(email);
		},

		sendEmail(email) {
			emailService
				.sendEmail(email)
				.then(() => this.loadEmails('sent'))
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
				.then((mails) => this.loadEmails(key))
				.catch((err) => console.log(err));
		},

		loadEmails(key = 'inbox') {
			emailService.query(key).then((mails) => (this.mails[key] = mails));
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
		emailList,
		emailFilter,
		emailNav,
		emailDetails,
		newEmail,
	},
};
