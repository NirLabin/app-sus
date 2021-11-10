export default {
	props: ['mail'],
	template: `
        <div class="email-details">
            <div class="email-details-header">
                    <ion-icon name="arrow-back-outline"></ion-icon>
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
	methods: {},
	components: {},
};
