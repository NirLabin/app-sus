import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async.storage.service.js';

const MAIL_KEY = 'mails';
const loggedinUser = {
	email: 'user@appsus.com',
	fullname: 'Mahatma Appsus',
};

export const mailService = (function () {
	return {
		query() {
			return storageService.query(MAIL_KEY);
		},

		sendEmail(email) {
			const newMail = _createMail(loggedinUser.email, ...email);
			return storageService.post(MAIL_KEY, newMail);
		},

		save(mail) {
			if (mail.id) return storageService.put(MAIL_KEY, mail);
			else return storageService.post(MAIL_KEY, mail);
		},

		remove(mailId) {
			return storageService.remove(MAIL_KEY, mailId);
		},

		getById(mailId) {
			return storageService.get(MAIL_KEY, mailId);
		},
		getInbox(mails) {
			return mails.filter((mail) => mail.from !== loggedinUser.email);
		},
		getInbox(mails) {
			return mails.filter((mail) => mail.from === loggedinUser.email);
		},
	};
})();

function _createMail(from = '', subject = '', body = '', date = new Date()) {
	return {
		id: utilService.makeId(),
		isOpen: false,
		isStarred: false,
		date,
		from,
		subject,
		body,
	};
}

// (function () {
// 	let mails = [];
// 	// let mails = {sent:[],inbox:[]};
// 	mails.push(
// 		_createMail({
// 			from: 'Efrat',
// 			subject: 'How Are You?',
// 			body: 'ashd jajdsan asjda',
// 		})
// 	);
// 	mails.push(
// 		_createMail({
// 			from: 'Nir',
// 			subject: 'How Are You?',
// 			body: 'ashd jajdsan asjda',
// 		})
// 	);

// 	mails.push(
// 		_createMail({
// 			from: 'Daniel Zuri',
// 			subject: 'Trip',
// 			body: 'ashd jajdsan asjda',
// 			date: new Date(+new Date() - 1000 * 60 * 60 * 24),
// 		})
// 	);
// 	mails = storageService.postMany(MAIL_KEY, mails);
// })();

// _createMails();

// export const mailService = { query, getById, save, remove,sendEmail };
// async function _createMails() {
// 	let mails = await storageService.query(MAIL_KEY);
// 	if (
// 		!mails ||
// 		!mails.length ||
// 		mails === {} ||
// 		!mails?.inbox ||
// 		!mails.inbox.length
// 	) {
// 		mails.push(
// 			_createMail({
// 				from: 'Efrat',
// 				subject: 'How Are You?',
// 				body: 'ashd jajdsan asjda',
// 			})
// 		);
// 		mails.push(
// 			_createMail({
// 				from: 'Nir',
// 				subject: 'How Are You?',
// 				body: 'ashd jajdsan asjda',
// 			})
// 		);

// 		mails.push(
// 			_createMail({
// 				from: 'Daniel Zuri',
// 				subject: 'Trip',
// 				body: 'ashd jajdsan asjda',
// 				date: new Date(+new Date() - 1000 * 60 * 60 * 24),
// 			})
// 		);
// 		mails = await storageService.postMany(MAIL_KEY, mails);
// 	}

// 	return mails;
// }
