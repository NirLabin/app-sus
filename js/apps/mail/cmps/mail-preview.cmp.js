import { utilService } from '../../../services/util.service.js';

export default {
  props: ['mail'],
  template: `
        <div class="mail-preview " @mouseover="" @mouseleave="">
			<span class="mail-from">{{mail.from}}</span>
			<span class="mail-date">{{getTimeForDisplay}}</span>
			<div class="mail-body flex">
				<span class="mail-subject">{{mail.subject}} - </span>
				<p class="mail-body-txt">{{getBodyForDisplay}}</p>
			</div>
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
