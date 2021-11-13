import { utilService } from '../../../services/util.service.js';
import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import emailError from './email-error.cmp.js';

export default {
	props: ['composeData'],
	template: `
        <div class="new-email">
            <div class='email-compose flex column'>
                <header class="email-compose-header flex space-between">
                    <h4>New message</h4>
                    <div class="control-btns">
                        <button class="btn" @click="toggleNewMsg">X</button>
                    </div>
                </header>
                <form class="flex column">
                    <div class="compose-row flex-def">
                        <label for="email">To</label>
                        <input type="email" v-model="to" >
                    </div>
                    <div class="compose-row flex-def">
                        <input type="text" v-model="email.subject" placeholder="Subject">
                    </div>
                    <textarea cols="30" rows="10" v-model="email.body"></textarea>
                    <button class="btn btn-blue" @click.prevent="send">Send</button>
                </form>
            </div>
        </div>
    `,
	data() {
		return {
			to: '',
			email: {
				subject: this.$route.params.emailSubject,
				body: '\n' + this.$route.params.emailBody,
			},
		};
	},

	methods: {
		send() {
			if (!utilService.validateEmail(this.to)) {
				this.showError = true;
				return;
			}
			emailService.sendEmail({ ...this.email, to: this.to }).then(() => {
				this.$router.push('/email');
				eventBus.$emit(
					'showMsg',
					utilService.createUserMsg('Email sent', 'success')
				);
			});
		},

		toggleNewMsg() {
			this.$router.push('/email');
		},
	},
	components: {
		emailError,
	},
};
