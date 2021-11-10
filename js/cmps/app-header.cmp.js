export default {
	template: `
        <header class="app-header flex space-between align-center">
            <router-link to="/" class="logo"><h2>Mail</h2></router-link> 
            <nav class="flex align-center gap">
                <router-link to="/" active-class="active" exact>Home</router-link> 
                <router-link to="/mail" active-class="active">Mail</router-link> 
                <router-link to="/keep" active-class="active">Keep</router-link>
            </nav>
        </header>
    `,
};
