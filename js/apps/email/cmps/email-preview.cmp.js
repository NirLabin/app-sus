import { utilService } from '../../../services/util.service.js';
import { emailService } from '../services/email.service.js';

export default {
	props: ['mail', 'page'],
	template: `
	<div class="email-preview">
		<span class="email-from">{{fromForDisplay}}</span>
		<span class="email-date">{{getTimeForDisplay}}</span>
		<div class="email-body flex">
			<span class="email-subject">{{mail.subject}} - </span>
			<p class="email-body-txt">{{getBodyForDisplay}}</p>
		</div>
	</div>`,
	data() {
		return {
			wordLimit: 50,
		};
	},
	computed: {
		getTimeForDisplay() {
			const date = new Date(this.mail.date);
			const dayPassed = utilService.calcDaysPassed(date, new Date());
			if (!dayPassed) return utilService.getTime(date);
			return `${utilService.months[date.getMonth()]} ${date.getDate()}`;
		},
		getBodyForDisplay() {
			return utilService.limitedText(this.mail.body, this.wordLimit);
		},
		fromForDisplay() {
			if (emailService.iSent(this.mail)) return `To: ${this.mail.to.fullName}`;
			return this.mail.from.fullName;
		},
	},
};
