<template>
  <div>
    <el-card class="box-card" v-if="cardFlag">
      <div slot="header" v-if="titleFlag">
        <span>{{title}}</span>
        <span class="card-button">
            <slot name="button"></slot>
        </span>
      </div>
      <slot name="queryForm"></slot>
      <slot></slot>
    </el-card>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      title: {type: String, default: '面板'},
      titleFlag: {type: Boolean, default: true},
      cardFlag: {type: Boolean, default: true},
    },
    data(){
      return {};
    },
    computed: {},
    watch: {},
    methods: {},

    created() {},
  }
</script>
