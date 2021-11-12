import { eventBus } from '../services/event-bus-service.js';

export default {
  template: `
    <transition name="fade">
        <div v-if="msg" class="user-msg">
            <p>{{msg.txt}}</p>
            <div class="close-msg" @click="closeMsg"><ion-icon name="close-circle-outline"></ion-icon></div>
        </div>
    </transition>

    `,
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
      console.log(msg);
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
