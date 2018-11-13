<template>
  <el-table-column
    :prop="prop"
    :width="width"
    :label="label">
    <template slot-scope="scope">
      <template v-if="scope.row[prop]">是</template>
      <template v-else>否</template>
    </template>
  </el-table-column>
</template>

<script>
  export default {
    props: {
      prop: { type: String },            //列code
      label: { type: String },            //列标题
      width: { type: String },            //列宽
    }
  }
</script>
