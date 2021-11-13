import { eventBus } from '../services/event-bus-service.js';

export default {
	template: `
    <transition name="fade">
        <div v-if="msg" class="user-msg flex-def">
            <p>{{msg.txt}}</p>
            <button class="btn flex align-center close-msg" @click="closeMsg"><ion-icon name="close-circle-outline" /></button>
        </div>
    </transition>`,
	data() {
		return {
			msg: null,
		};
	},
	created() {
		eventBus.$on('showMsg', this.showMsg);
	},
	destroyed() {
		eventBus.$off('showMsg', this.showMsg);
	},
	methods: {
		showMsg(msg) {
			this.msg = msg;
			setTimeout(() => {
				this.msg = null;
			}, 3500);
		},

		closeMsg() {
			this.msg = null;
		},
	},
};
