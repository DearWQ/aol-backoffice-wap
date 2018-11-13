<template>
  <el-upload
    name="media"
    :headers="{token:$store.state.token}"
    :action="action"
    :show-file-list="false"
    :list-type="listType"
    :multiple="multiple"
    :on-success="onSuccess"
    :file-list="fileList">
    <slot></slot>
  </el-upload>
</template>

<script>
  import core from '../core/Dol-core'
  let url = '/system/tool/file/save';
  export default {
    props: {
      type: {type: String, default: ''},            //文件类型，可为空
      multiple: {type: Boolean, default: false},            //是否多选
      listType: {type: String, default: 'none'},            //列表显示方式
      onSuccess: {type: Function},            //回调
    },
    data(){
      return {
        fileList:[],
      }
    },
    computed:{
      action(){
        let action = core.path.apiPath + url;
        if(this.type){
            action += `?type=${this.type}`;
        }
        return action;
      }
    },
    methods: {
    },
    watch:{
    },
    created(){
    }
  }
</script>
