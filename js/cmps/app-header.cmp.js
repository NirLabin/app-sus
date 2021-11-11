export default {
  template: `
        <header class="app-header flex space-between align-center">
            <router-link to="/" class="logo"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjfaLY0UJaeRm2z6CIFoIoBXZWJf3DcCgfag&usqp=CAU" alt=""></router-link> 
            <nav class="flex align-center gap">
                <button class="btn" @click="toggleApps"><ion-icon name="apps-outline"></ion-icon></button>
                <div @click="toggleApps" v-if="menuOpen">
                    <router-link  to="/" active-class="active" exact><img class="menu-img" src="https://icon-library.com/images/home-menu-icon/home-menu-icon-7.jpg" alt=""></router-link> 
                    <router-link to="/mail" active-class="active"><img class="menu-img"src="https://play-lh.googleusercontent.com/KSuaRLiI_FlDP8cM4MzJ23ml3og5Hxb9AapaGTMZ2GgR103mvJ3AAnoOFz1yheeQBBI" alt=""></router-link> 
                    <router-link to="/keep" active-class="active"><img class ="menu-img"src="https://www.google.com/images/icons/product/keep-512.png" alt=""></router-link>
                </div>
            </nav>
        </header>
    `,

  data() {
    return {
      menuOpen: false,
    };
  },

  methods: {
    toggleApps() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
