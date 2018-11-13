<template>
  <el-input :id="`dolInput_${id}`" v-model="value"/>
</template>

<style lang="scss">
  .tangram-suggestion-main {
    z-index: 5000;
  }
</style>

<script>
  import BMap from 'BMap';
  export default {
    name: 'dol-map',
    props: {
      value: {type: String, default: ''},           //
      map: {},                                      //
    },
    data(){
      return {
        id: Math.round(Math.random() * Math.pow(10, 6)),
      };
    },
    watch: {},
    computed: {},
    methods: {},
    created(){
    },
    mounted(){
      let config = {
        "input": `dolInput_${this.id}`,
      };
      new BMap.Autocomplete(config).addEventListener("onconfirm", (e) => {
        let _value = e.item.value,
          map = new BMap.Map(),
          address = _value.province + _value.city + _value.district + _value.street + _value.business;
        let local = new BMap.LocalSearch(map, { //智能搜索
          onSearchComplete: () => {
            let point = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果

            this.$emit('confirm', point);
            this.$emit('input', address);
          }
        });
        local.search(address);
      });
    },
  }
</script>
