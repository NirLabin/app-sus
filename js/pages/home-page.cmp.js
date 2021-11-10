export default {
	template: `
        <header class="app-header flex space-between align-center">
            <h3></h3>
            <nav class="flex align-center gap">
                <router-link to="/" active-class="active-link" exact>Home</router-link> 
                <router-link to="/mail">Mail</router-link> 
                <router-link to="/keep">Keep</router-link>
            </nav>
        </header>
    `,
};
