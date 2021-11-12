import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async.storage.service.js';

const keys = {
	inbox: 'inbox',
	sent: 'sent',
	deleted: 'deleted',
};
const INBOX_KEY = 'inbox';
const SENT_KEY = 'sent';
const DELETED_KEY = 'deleted';
const loggedinUser = {
	email: 'user@appsus.com',
	fullName: 'Efrat Zuri',
};
(function () {
	storageService.query(keys.inbox).then((inbox) => {
		if (!inbox || !inbox.length) {
			inbox.push(
				_createMail('Nir Labinski', 'Sprint', utilService.makeLorem(150))
			);
			inbox.push(
				_createMail('Daniel Zuri', 'Our trip', utilService.makeLorem(150))
			);
			inbox.push(
				_createMail('Noa Cohen', 'Studying', utilService.makeLorem(150))
			);
			storageService.postMany(keys.inbox, inbox).then((inbox) => {
				console.log(inbox);
			});
		}
	});
})();

export const mailService = (function () {
	return {
		query(keyName = 'inbox') {
			return storageService.query(keys[keyName]);
		},

		sendEmail(email) {
			const { subject, to, body } = email;
			const newMail = _createMail(loggedinUser.email, subject, body, to);
			return storageService.post(keys.sent, newMail);
		},

		save(mail) {
			if (mail.id) return storageService.put(INBOX_KEY, mail);
			else return storageService.post(INBOX_KEY, mail);
		},

		remove(mailId) {
			return storageService.remove(INBOX_KEY, mailId);
		},

		getById(mailId) {
			return storageService.get(INBOX_KEY, mailId);
		},

		getInbox(mails) {
			return mails.filter(
				(mail) => mail.from !== loggedinUser.email && !mail?.isDeleted
			);
		},

		getSent(mails) {
			return mails.filter(
				(mail) => mail.from === loggedinUser.email && !mail?.isDeleted
			);
		},

		getDeleted(mails) {
			return mails.filter((mail) => mail?.isDeleted);
		},
	};
})();

function _createMail(
	from,
	subject,
	body = '',
	to = loggedinUser.email,
	date = new Date()
) {
	return {
		id: utilService.makeId(),
		isOpen: false,
		isStarred: false,
		date,
		from,
		subject,
		body,
		to,
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
// 	mails = storageService.postMany(INBOX_KEY, mails);
// })();

// _createMails();

// export const mailService = { query, getById, save, remove,sendEmail };
// async function _createMails() {
// 	let mails = await storageService.query(INBOX_KEY);
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
// 		mails = await storageService.postMany(INBOX_KEY, mails);
// 	}

// 	return mails;
// }
