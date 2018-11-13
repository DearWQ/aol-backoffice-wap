<template>
  <tree-select
    :value="value"
    :options="treeSelectData"
    :append-to-body="true"
    :z-index="5000"
    :multiple="multiple"
    :search-nested="searchNested"
    :disabled="disabled"
    :placeholder="placeholder"
    value-consists-of="ALL_WITH_INDETERMINATE"
    :normalizer="formatterTreeSelectData"
    @input="inputValue"
  />
</template>

<script>
  export default {
    name: 'dol-tree-select',
    props: {
      value: {},                                              //value  Type  Array | String
      placeholder: {type: String, default: '--请选择--'},
      source: {type: String, default: 'server'},              //数据源，local | server
      //---------------------- if source === server --------------------------------//
      url: {type: String},                                  //后台地址
      method: {type: String, default: 'get'},              //请求方式
      queryParams: {
        type: Object, default() {
          return {};
        }
      },             //请求参数
      //---------------------- if source === local  --------------------------------//
      options: {
        type: Array, default(){
          return [];
        }
      },                     //可选项数据

      multiple: {type: Boolean, default: false},
      searchNested: {type: Boolean, default: true},
      disabled: {type: Boolean, default: false},                 //disabled
      param: {},                 //params
    },
    data: function () {
      let params = {
        keyField: this.source === 'server' ? this.defaultServerKeyField : this.defaultKeyField,
        labelField: this.source === 'server' ? this.defaultServerLabelField : this.defaultLabelField,
        valueField: this.source === 'server' ? this.defaultServerValueField : this.defaultValueField,

        serverData: [],
      };
      return params;
    },
    watch: {
      url(){
        this.getOption();
      },
    },
    computed: {
      treeSelectData(){
        let data = [];
        switch (this.source) {
          case 'server':
            data = this.serverData;
            break;
          case 'local':
            data = this.options;
            break;
        }
        return data;
      }
    },
    methods: {
      getOption(){
        if (this.source === 'server') {
          this.$ajax({
            url: this.url,
            method: this.method,
            data: this.queryParams,
          }).then(reData => {
            this.serverData = reData.rows;
          }).catch(e => {
            console.error(e);
            this.serverData = [];
          });
        }
      },
      formatterTreeSelectData(data){
        data.id = data._id;
        data.label = data.name;
        return data;
      },
      inputValue(value, instanceId){
        this.$emit('input', value, instanceId);
      },
    },
    created: function () {
      this.getOption();
    }
  }
</script>

<style lang="scss">
  .vue-treeselect__control{
    height: 32px;
    line-height: 30px;
    border-radius: 4px;

    .vue-treeselect__placeholder, .vue-treeselect__single-value{
      line-height: 30px;
      padding-left: 10px;
    }
  }
</style>
