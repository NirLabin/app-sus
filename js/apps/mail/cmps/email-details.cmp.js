export default {
	props: ['mail'],
	template: `
        <div class="email-details">
            <div class="email-details-header">
                <button class="btn" @click="back"><ion-icon name="arrow-back-outline"></ion-icon></button>
                <button class="btn" @click="remove(mail.id)"><ion-icon name="trash-outline"></ion-icon></button>
            </div>
            <h3>{{mail.subject}}</h3>
            <p>{{mail.from}}</p>
            <p>{{mail.body}}</p>
        </div>
    `,
	data() {
		return {};
	},
	created() {},
	computed: {},
	methods: {
		back() {
			this.$emit('back');
		},
		remove(mailId) {
			this.$emit('remove', mailId);
		},
	},
	components: {},
};
