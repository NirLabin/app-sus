export default {
	props: ['mail'],
	template: `
        <div class="email-details">
            <div class="email-details-header">
                <router-link to="/mail">
                    <ion-icon name="arrow-back-outline"></ion-icon>
                </router-link>
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
