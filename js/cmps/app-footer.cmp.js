export default {
	template: `
        <footer class="app-footer">
            <p>&copy; Copyrights {{curYear}}</p>
        </footer>
    `,
	data() {
		return { curYear: new Date().getFullYear() };
	},
	created() {
		this.curYear = new Date().getFullYear();
	},
};
