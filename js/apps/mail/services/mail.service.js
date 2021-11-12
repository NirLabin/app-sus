import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async.storage.service.js';

const keys = {
	inbox: 'inbox',
	sent: 'sent',
	deleted: 'deleted',
};
const INBOX_KEY = 'inbox';

const loggedinUser = {
	email: 'user@appsus.com',
	fullName: 'Efrat Zuri',
};
// (function () {
// 	storageService.query(keys.inbox).then((inbox) => {
// 		if (!inbox || !inbox.length) {
// 			inbox.push(
// 				_createMail('Nir Labinski', 'Sprint', utilService.makeLorem(150))
// 			);
// 			inbox.push(
// 				_createMail('Daniel Zuri', 'Our trip', utilService.makeLorem(150))
// 			);
// 			inbox.push(
// 				_createMail('Noa Cohen', 'Studying', utilService.makeLorem(150))
// 			);
// 			storageService.postMany(keys.inbox, inbox).then((inbox) => {
// 				console.log(inbox);
// 			});
// 		}
// 	});
// })();

export const mailService = (function () {
	return {
		query(keyName = 'inbox') {
			return storageService.query(keys[keyName]);
		},

		sendEmail(email) {
			const { subject, to, body } = email;
			const newMail = _createMail(loggedinUser, subject, body, to);
			return storageService.post(keys.sent, newMail);
		},

		save(mail, key = 'inbox') {
			if (mail.id) return storageService.put(keys[key], mail);
			else return storageService.post(keys[key], mail);
		},

		remove(mailId, key = 'inbox') {
			return storageService.remove(keys[key], mailId);
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
