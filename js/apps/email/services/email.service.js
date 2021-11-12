import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async.storage.service.js';

const keys = {
	inbox: 'inbox',
	sent: 'sent',
	deleted: 'deleted',
};
const INBOX_KEY = 'inbox';

const loggedinUser = {
	email: 'efrat@appsus.com',
	fullName: 'Efrat Zuri',
};
// (function () {
// 	storageService.query(keys.inbox).then((inbox) => {
// 		if (!inbox || !inbox.length) {
// 			inbox.push(
// 				_createMail(
// 					{ email: 'nir@appsus.com', fullName: 'Nir Labinski' },
// 					'Sprint',
// 					utilService.makeLorem(150),
// 					'inbox'
// 				)
// 			);
// 			inbox.push(
// 				_createMail(
// 					{ email: 'daniel@appsus.com', fullName: 'Daniel Zuri' },
// 					'Our trip',
// 					utilService.makeLorem(150),
// 					'inbox'
// 				)
// 			);
// 			inbox.push(
// 				_createMail(
// 					{ email: 'noa@appsus.com', fullName: 'Noa Cohen' },
// 					'Studying',
// 					utilService.makeLorem(150),
// 					'inbox'
// 				)
// 			);
// 			storageService.postMany(keys.inbox, inbox).then((inbox) => {
// 				console.log(inbox);
// 			});
// 		}
// 	});
// })();

export const emailService = (function () {
	return {
		iSent(email) {
			return email.from.email === loggedinUser.email;
		},
		add(email, key = 'inbox') {
			return storageService.add(keys[key], email);
		},

		query(keyName = 'inbox') {
			return storageService.query(keys[keyName]);
		},

		sendEmail(email) {
			return storageService.post(keys.sent, this.createSendEmail(email));
		},

		createSendEmail(email) {
			return _createMail(loggedinUser, subject, body, to, 'sent');
		},

		save(email, key = 'inbox') {
			if (email.id) return storageService.put(keys[key], email);
			else return storageService.post(keys[key], email);
		},

		remove(mailId, key = 'inbox') {
			console.log('email service, key:', key, 'email id', mailId);
			return storageService.remove(keys[key], mailId);
		},

		getById(mailId) {
			return storageService.get(INBOX_KEY, mailId);
		},

		getInbox(emails) {
			return emails.filter(
				(email) => email.from !== loggedinUser.email && !email?.isDeleted
			);
		},

		getSent(emails) {
			return emails.filter(
				(email) => email.from === loggedinUser.email && !email?.isDeleted
			);
		},

		getDeleted(emails) {
			return emails.filter((email) => email?.isDeleted);
		},
	};
})();

function _mailType() {
	return {};
}

function _createMail(
	from,
	subject,
	body = '',
	to = loggedinUser.email,
	type,
	date = new Date()
) {
	return {
		id: utilService.makeId(),
		isOpen: false,
		isStarred: false,
		date,
		from,
		type,
		subject,
		replays: [],
		body,
		to,
	};
}
function _isExists(entities, id) {
	return entities.some((entity) => entity.id === id);
}
