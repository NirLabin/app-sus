import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async.storage.service.js';

const MAIL_KEY = 'mails';

_createMails();

export const mailService = { query, getById, save, remove };

function query() {
	return storageService.query(MAIL_KEY);
}

function save(mail) {
	if (mail.id) return storageService.put(MAIL_KEY, mail);
	else return storageService.post(MAIL_KEY, mail);
}

function remove(mailId) {
	return storageService.remove(MAIL_KEY, mailId);
}

function getById(mailId) {
	return storageService.get(MAIL_KEY, mailId);
}

async function _createMails() {
	let mails = await storageService.query(MAIL_KEY);
	if (!mails || !mails.length) {
		mails = [];
		mails.push(
			_createMail({
				from: 'Efrat',
				subject: 'How Are You?',
				body: 'ashd jajdsan asjda',
			})
		);
		mails.push(
			_createMail({
				from: 'Nir',
				subject: 'How Are You?',
				body: 'ashd jajdsan asjda',
			})
		);

		mails.push(
			_createMail({
				from: 'Daniel Zuri',
				subject: 'Trip',
				body: 'ashd jajdsan asjda',
				date: new Date(+new Date() - 1000 * 60 * 60 * 24),
			})
		);
		mails = await storageService.postMany(MAIL_KEY, mails);
	}

	return mails;
}

function _createMail({
	from = '',
	subject = '',
	body = '',
	date = new Date(),
}) {
	return {
		id: utilService.makeId(),
		isOpen: false,
		date,
		from,
		subject,
		body,
	};
}
