import { utilService } from '../../../services/util.service.js';

export default {
	props: ['mail'],
	template: `
        <div class="mail-preview flex align-center">
			<span class="mail-from">{{mail.from}}</span>
			<div class="flex align-center mail-body">
				<span>{{mail.subject}} - </span>
				<p class="mail-body-txt">{{getBodyForDisplay}}</p>		
			</div>
			<span class="mail-date">{{getTimeForDisplay}}</span>
        </div>
    `,
	data() {
		return {
			wordLimit: 100,
		};
	},
	created() {},
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
	},
	methods: {},
	components: {},
};
