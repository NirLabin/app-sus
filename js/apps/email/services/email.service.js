import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async.storage.service.js';

const keys = {
	inbox: 'inbox',
	sent: 'sent',
	deleted: 'deleted',
};

const loggedinUser = {
	email: 'efrat@appsus.com',
	fullName: 'Efrat Zuri',
};

(function () {
	storageService.query(keys.inbox).then((inbox) => {
		if (!inbox || !inbox.length) {
			inbox.push(
				_createMail(
					_fromAndTo({ email: _createEmail('nir'), fullName: 'Nir Labinski' }),
					'Sprint',
					_mailType('inbox'),
					utilService.makeLorem(150)
				)
			);
			inbox.push(
				_createMail(
					_fromAndTo({
						email: _createEmail('daniel'),
						fullName: 'Daniel Zuri',
					}),
					'Our trip',
					_mailType('inbox'),
					utilService.makeLorem(150)
				)
			);
			inbox.push(
				_createMail(
					_fromAndTo({
						email: _createEmail('noa'),
						fullName: 'Noa Cohen',
					}),
					'Studying',
					_mailType('inbox'),
					utilService.makeLorem(150)
				)
			);
			storageService.postMany(keys.inbox, inbox).then((inbox) => {
				console.log(inbox);
			});
		}
	});
})();

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
			console.log(email);
			return storageService.post(keys.sent, this.createSendEmail(email));
		},

		createSendEmail(email) {
			console.log(email);
			const { subject, body, to } = email;
			return _createSent(subject, body, to);
		},

		save(email, key = 'inbox') {
			if (email.id) return storageService.put(keys[key], email);
			else return storageService.post(keys[key], email);
		},

		remove(mailId, key = 'inbox') {
			return storageService.remove(keys[key], mailId);
		},

		getById(mailId) {
			return storageService.get(keys.inbox, mailId);
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

function _mailType(category = 'inbox', isReplay = false) {
	return { isReplay, category };
}

function _fromAndTo({ email = loggedinUser.email, fullName = '' }) {
	if (!fullName) fullName = _trimEmail(email);
	return { fullName, email };
}

function _createSent(subject, body, to) {
	return _createMail(
		loggedinUser,
		subject,
		_mailType('sent'),
		body,
		_fromAndTo(to)
	);
}

function _createMail(
	from,
	subject,
	type,
	body = '',
	to = loggedinUser,
	date = new Date()
) {
	return {
		id: utilService.makeId(),
		isOpen: false,
		isStarred: false,
		replays: [],
		from,
		subject,
		body,
		to,
		type,
		date,
	};
}

function _createEmail(name) {
	return `${name}@appsus.com`;
}

function _isExists(entities, id) {
	return entities.some((entity) => entity.id === id);
}

function _trimEmail(email) {
	const [idx, len] = [email.indexOf('@'), email.length];
	return email.slice(0, idx === -1 ? Math.min(len, 5) : idx);
}
