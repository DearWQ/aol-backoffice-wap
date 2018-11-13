<template>
  <div class="dolphin-list">
    <dol-panel :cardFlag="cardFlag" :titleFlag="titleFlag" :title="title">
      <slot name="button" slot="button"></slot>
      <slot name="queryForm" slot="queryForm"></slot>
      <el-table
        :data="tableData"
        stripe
        :height="height"
        :highlight-current-row="radioFlag"
        :show-header="showHeader"
        @current-change="currentChange"
        @row-click="rowClick"
        @select="selectRow"
        @select-all="selectAll"
        @selection-change="selectChange"
        ref="list"
        :size="size">
        <el-table-column
          v-if="checkFlag && multiple"
          type="selection"
          width="55">
        </el-table-column>
        <slot></slot>
      </el-table>
      <el-pagination
        v-if="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNumber"
        :page-sizes="pageSizeOption"
        :page-size="pageSize"
        :layout="paginationLayout"
        :total="tableTotal">
      </el-pagination>
    </dol-panel>
    <dol-loading :flag="loadingFlag" />
  </div>
</template>

<script>
  import dolPanel from '../panel/Dol-panel.vue'
  export default {
    components:{dolPanel},
    props: {
      source: {type: String, default: 'server'},            //数据源，server | local
      //---------------------- if source === server --------------------------------//
      url: {type: String},                                  //后台地址
      method: {type: String, default: 'post'},              //请求方式
      queryParams: {
        type: Object, default: function () {
          return {};
        }
      },             //请求参数
      initDataFlag: {type: Boolean, default: true},         //默认是否请求一次数据
      //---------------------- if source === local  --------------------------------//
      defaultData: {
        type: Array, default: function () {
          return [];
        }
      },                     //后台地址

      pagination: {type: Boolean, default: true},            //是否带分页
      //---------------------- if pagination === true --------------------------------//
      defaultPageSize: {type: Number, default: 10},                                        //每页条数
      defaultPageNumber: {type: Number, default: 1},                                       //当前页数
      pageSizeOption: {
        type: Array, default: function () {
          return [5, 10, 20, 50, 100]
        }
      },  //可选每页条数
      paginationLayout: {type: String, default: "total, sizes, prev, pager, next, jumper"},  //简化分页条

      checkFlag: {type: Boolean, default: false},
      multiple: {type: Boolean, default: true},
      size: {type: String, default: 'small'},
      title: {type: String, default: '列表'},
      titleFlag: {type: Boolean, default: true},
      height: {type: Number},
      showHeader: {type: Boolean, default: true},
      loading: {type: Boolean, default: true},

      cardFlag: {type: Boolean, default: true},
    },
    data: function () {
      let params = {
        serverData: {rows: [], total: 0},
        pageSize: this.defaultPageSize,
        pageNumber: this.defaultPageNumber,

        loadingFlag: false,
      };
      return params;
    },
    computed: {
      radioFlag(){
        return this.checkFlag && !this.multiple;
      },
      tableData(){
        if (this.source === 'server') {
          return this.serverData.rows;
        } else {
          return this.defaultData;
        }
      },
      tableTotal(){
        if (this.source === 'server') {
          return this.serverData.total;
        } else {
          return this.defaultData.length;
        }
      },
    },
    watch: {
    },
    methods: {
      handleSizeChange: function (size) {
        this.pageSize = size;
        this.load();
      },
      handleCurrentChange: function (index) {
        this.pageNumber = index;
        this.load();
      },
      query: function () {
        this.pageNumber = this.defaultPageNumber;
        this.pageSize = this.defaultPageSize;
        this.load();
      },
      load: function () {
        if (this.source === 'server') {
          let url = this.url;
          if (this.pagination) {
            url += `?pageNumber=${this.pageNumber - 1}&pageSize=${this.pageSize}`;
          }

          this.loadingFlag = true;
          this.$ajax({
            url: url,
            method: 'post',
            data: this.queryParams
          }).then(data => {
            this.loadingFlag = false;
            this.serverData = data;
          }).catch(() => {
            this.loadingFlag = false;
          });
        } else {

        }
      },
      appendData: function ({rows}) {
        this.tableData = this.tableData.concat(rows);
        if (this.pagination) {
          this.tableTotal += rows.length;
        }
      },

      //继承原事件
      currentChange: function (currentRow, oldCurrentRow) {
        this.$emit('current-change', currentRow, oldCurrentRow)
      },
      rowClick:function (row, event, column) {
        this.$emit('row-click', row, event, column);
      },
      selectRow(selection, row){
        this.$emit('select', selection, row);
      },
      selectAll(selection){
        this.$emit('row-all', selection);
      },
      selectChange(selection){
        this.$emit('selection-change', selection);
      },
    },

    created: function () {
      if (this.source === 'server') {
        if (this.initDataFlag) {
          this.query();
        }
      }
    }
  }
</script>
