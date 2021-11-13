export default {
	props: ['email'],
	template: `
    <div class="email-error modal">
        <header class="flex align-center space-between">
            <h4>Error</h4>
            <button class="btn" @click="closeError">X</button>
        </header>
        <p>
            The address {{email}} in the "To" field was not recognized. Please make sure that all addresses are properly formed.
        </p>
    </div>
    `,
	data() {
		return {};
	},
	methods: {
		closeError() {
			this.$emit('close');
		},
	},
};
