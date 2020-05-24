<template>
  <div class="result">
    <h3>报告列表</h3>
    <div class="inner-header">
      <Button type="error" @click="deleteAllHandle">批量删除</Button>
      </Modal>
    </div>
    <Table ref="table"  height="630" :columns="th" :data="tableData" @on-selection-change="handleRowChange"></Table>    
    <!-- <div class="foot">
      <Page :total="100" show-total /> 
    </div>   -->
  </div>
</template>

<script>
export default {
  name: 'Result',
  data () {
    return {
      // 样例
      tableData: [
        {
          id: 1,
          setCount: 2,
          owner: '张',
          state: '已完成'
        }
      ],
      //多选项
      currentRow: [], 
      reportId: [],
      th: [
        {
          type: 'selection',
          width: 35,
          align: 'center',
        },
        {
          title: '报告ID',
          key: 'id',
        },
        {
          title: '局点数',
          key: 'setCount'
        },
        {
          title: '提交人',
          key: 'owner'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '完成时间',
          key: 'finishTime'
        },
        {
          title: '阶段',
          key: 'state'
        },
        {
          title: '备注',
          key: 'note'
        },
        {
          title: '详情',
          key: 'detail',
          render: (h, params) => {
            return [
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                on: {
                  
                  click: () => {
                    let dataId = params.row.id;
                    const { href }  = this.$router.resolve({
                      path: '/detail',
                      query: {
                        id: dataId
                      }
                    });
                    window.open(href, '_blank');
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  margin: '0 0 0 10px'
                },
                on: {
                  click: () => {
                    let dataId = params.row.id;
                    this.deleteHandel(dataId);
                  }
                }
              }, '删除')
            ]
          }
        }
      ]
    }
  },
  methods: {
    // 获取多选行
    handleRowChange(val) {
      this.currentRow = val;
    },
    // 批量删除
    deleteAllHandle() {
      this.currentRow.forEach((k, index) => {
        this.reportId.push(k.id);
      });
      this.$http.delete(this.$api.report, {
        reportId: this.reportId
      })
      .then(res => {
          if(res.code === '200'){
            this.tableData = [];
            this.reportId = [];
            this.getData();
            this.$Message.error('操作成功！');
          }
      })
    },
    // 单项删除
    deleteHandel(id) {
      this.$http.delete(this.$api.report, {
        reportId: id
      })
      .then(res => {
          if(res.code === '200'){
            this.tableData = [];
            this.getData();
            this.$Message.error('操作成功！');
          }
      })
    },
    // 获取表格数据
    getData() {
      this.$http.get(this.$api.reportList)
      .then(res => {
          if(res.code === '200'){
            let data = res.data;
            data.forEach(e => {
              this.tableData.push({
                id: e.id,
                setCount: e.setCount,
                owner: e.owner,
                createTime: e.createTime,
                finishTime: e.finishTime,
                state: e.state,
                note: e.note
              })
            })
          }
      })
    }
  },
  mounted(){
    this.getData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .inner-header {
    padding: 20px 20px 20px 0;
  }
  Button {
    margin-right: 5px;
  }
  .foot {
    margin-top: 20px;
  }
</style>
