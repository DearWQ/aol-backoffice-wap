<template>
  <div class="dolphin-tree">
    <dol-panel :cardFlag="cardFlag" :titleFlag="titleFlag" :title="title">
      <slot name="button" slot="button"></slot>
      <el-tree
        ref="tree"
        node-key="_id"
        :data="treeData"
        :default-expand-all="defaultExpandAll"
        :expand-on-click-node="expandOnClickNode"
        @current-change="currentChange"
        @node-click="nodeClick"
        :props="{label:'name', children: 'children'}">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <slot :node="node" :data="data"><span>{{ node.label }}</span></slot>
        </span>
      </el-tree>
    </dol-panel>
    <dol-loading :flag="loadingFlag" />
  </div>
</template>

<script>
  import dolPanel from '../panel/Dol-panel.vue'
  export default {
    components:{dolPanel},
    props: {
      source: { type: String, default: 'server' },            //数据源，server | local
      //---------------------- if source === server --------------------------------//
      url: { type: String },                                  //后台地址
      method: { type: String, default: 'get' },              //请求方式
      queryParams: { type: Object, default: function(){return {};} },             //请求参数
      initDataFlag: { type: Boolean, default: true },         //默认是否请求一次数据
      //---------------------- if source === local  --------------------------------//
      defaultData: { type: Array, default: function(){return [];} },                     //后台地址

      checkFlag: {type: Boolean, default: true },
      defaultExpandAll: {type: Boolean, default: false },
      expandOnClickNode: {type: Boolean, default: false },
      title: {type: String, default: '树'},
      titleFlag: {type: Boolean, default: true},
      cardFlag: {type: Boolean, default: true},
      loading: {type: Boolean, default: true},
    },
    data:function () {
      let params = {
        serverData: [],
        loadingFlag: false,
      };
      return params;
    },
    computed:{
      treeData(){
        let data = [];
        switch (this.source) {
          case 'server':
            data = this.serverData;
            break;
          case 'local':
            data = this.defaultData;
            break;
        }
        return data;
      }
    },
    methods:{
      query: function (queryParams) {
        if(this.source === 'server'){
          let url = this.url;
          this.loadingFlag = true;
          this.$ajax({
            url:url,
            method:this.method,
            data: queryParams || this.queryParams,
          }).then((data) => {
            this.loadingFlag = false;
            this.serverData = data.rows;
          }).catch(() => {
            this.loadingFlag = false;
          });
        }
      },
      currentChange: function (data, node) {
        this.$emit('current-change', data, node);
      },
      nodeClick: function (data, node, tree) {
        this.$emit('node-click', data, node, tree);
      },
    },

    created: function () {
      if(this.source === 'server'){
        if(this.initDataFlag){
          this.query();
        }
      }
    }
  }
</script>

<style lang="scss">
  div.dolphin-tree{
    position: relative;
  }
</style>
