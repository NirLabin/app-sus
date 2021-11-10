import { utilService } from '../../../services/util.service.js';

export default {
	props: ['mail'],
	template: `
        <div class="mail-preview " @mouseover="" @mouseleave="">
			<div class="mail-preview-header">
				<span class="mail-from">{{mail.from}}</span>
				<span class="mail-date">{{getTimeForDisplay}}</span>
			</div>
			<div class=" mail-body">
				<span>{{mail.subject}} - </span>
				<p class="mail-body-txt">{{getBodyForDisplay}}</p>		
			</div>
			<!-- <div v-if="showHover">
				<button @click="toggleShowState">
						<ion-icon :name="envelopType"></ion-icon>
				</button>
			</div> -->
        </div>
    `,
	data() {
		return {
			wordLimit: 100,
			// showHover: false,
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
	methods: {
		envelopType() {
			return `mail${this.mail.isOpen ? '-open' : ''}-outline`;
		},
		toggleShowState() {
			this.$emit('open', this.mail);
		},
		toggleHoverState() {
			this.showHover = !this.showHover;
		},
	},
	components: {},
};
