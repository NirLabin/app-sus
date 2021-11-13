export default {
	props: ['emails'],
	template: `
        <div class="email-summery flex-def">
			<p>Read: <span>{{data.read}}</span></p>
			<p>Unread: <span>{{data.unread}}</span></p>
			<p>In total: <span>{{emails.length}}</span></p>
        </div>
    `,
	created() {
		this.data = this.emails.reduce(
			(acc, cur) => {
				acc[`${cur.isShow ? '' : 'un'}read`]++;
				return acc;
			},
			{ read: 0, unread: 0 }
		);
	},
};
