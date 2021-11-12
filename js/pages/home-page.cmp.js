export default {
  template: `
    <section class="home-page">
      <header class="app-header flex space-between align-center column">
        <h1>APP SUS</h1>
        <transition name="home page">
          <div class="home-body flex">
            <router-link to="/mail" active-class="active" class="flex column align-center">
              <img class="menu-img"src="https://play-lh.googleusercontent.com/KSuaRLiI_FlDP8cM4MzJ23ml3og5Hxb9AapaGTMZ2GgR103mvJ3AAnoOFz1yheeQBBI" alt="">
              <span>Mail</span>
            </router-link> 
            <router-link to="/keep" active-class="active" class="flex column align-center">
              <img class ="menu-img"src="https://www.google.com/images/icons/product/keep-512.png" alt="">
              <span>Keep</span>
            </router-link>
          </div>
        </transition>
        </header>
    </section>
    `,
};
