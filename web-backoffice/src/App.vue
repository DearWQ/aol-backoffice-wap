<template>
  <div id="app">
    <el-container :class="$store.state.userInfo?'is-vertical':''">
      <dol-header @change-top-menu="changeTopMenu"/>

      <el-container>
        <dol-menu ref="leftMenu" />

        <el-main>
          <div id="main" class="mainContainer">
            <router-view />
          </div>
          <dol-footer />
        </el-main>
      </el-container>
    </el-container>
    <dol-loading />
  </div>
</template>

<script>
  import $ from 'jquery';
  import dolHeader from './components/common/header.vue';
  import dolMenu from './components/common/menu.vue';
  import dolFooter from './components/common/footer.vue';

  export default {
    name: 'App',
    components: {dolHeader, dolMenu, dolFooter},
    data(){
      return {}
    },
    methods: {
      changeTopMenu(menu){
        if(this.$refs['leftMenu']){
          this.$refs['leftMenu'].clearSelect();
        }
      }
    },
    created(){
      let pageMinHeight = () => {
        $('div#main').css('min-height', $(window).height() - 140);
        this.$store.commit('initWindowSize', {width:$(window).width(), height:$(window).height()});
      };

      $(function () {
        pageMinHeight();
      });
      $(window).bind("resize", pageMinHeight);

      //i18n
      this.$i18n.locale= (navigator.language || navigator.userLanguage).substr(0,2);
    },
    mounted(){
    }
  }
</script>

<style lang="scss">
  @import "assets/scss/common";
</style>
