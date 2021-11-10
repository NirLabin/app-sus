import { utilService } from '../../../services/util.service.js';

export default {
	props: ['mail'],
	template: `
        <div class="mail-preview flex align-center space-between">
			<router-link to="/"  exact>
			<span>{{mail.from}}</span>
			<span>{{mail.subject}}</span>
			<span>{{getTimeForDisplay}}</span>
		</router-link> 
			
        </div>
    `,
	data() {
		return {};
	},
	created() {},
	computed: {
		getTimeForDisplay() {
			const date = new Date(this.mail.date);
			const dayPassed = utilService.calcDaysPassed(date, new Date());
			if (!dayPassed) return utilService.getTime(date);
			return `${utilService.months[date.getMonth()]} ${date.getDate()}`;
		},
	},
	methods: {},
	components: {},
};
