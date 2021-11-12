export default {
  template: `
        <header class="app-header flex space-between align-center">
            <router-link to="/" class="logo" @click="toggleApps">App Sus</router-link> 
            <div class="main-app-menu-container flex align-center gap">
                <button class="btn btn-main-menu flex align-center" @click="toggleApps" :class="{active:menuOpen}"><ion-icon name="apps-outline"></ion-icon></button>
                <nav class="main-app-menu flex align-center" @click="toggleApps" v-if="menuOpen">
                    <router-link  to="/" active-class="active" exact><img class="menu-img" src="https://icon-library.com/images/home-menu-icon/home-menu-icon-7.jpg" alt=""></router-link> 
                    <router-link to="/mail" active-class="active"><img class="menu-img"src="https://play-lh.googleusercontent.com/KSuaRLiI_FlDP8cM4MzJ23ml3og5Hxb9AapaGTMZ2GgR103mvJ3AAnoOFz1yheeQBBI" alt=""></router-link> 
                    <router-link to="/keep" active-class="active"><img class ="menu-img"src="https://www.google.com/images/icons/product/keep-512.png" alt=""></router-link>
                </nav>
            </div>
        </header>
    `,
  data() {
    return {
      menuOpen: false,
    };
  },

  methods: {
    toggleApps() {
      console.log(this.menuOpen);
      this.menuOpen = !this.menuOpen;
    },
    menuBtnClass() {},
  },
};
