<template>
  <div class="detail">
    <h3>报告详情(ID:{{this.$route.query.id}})</h3>
    <Table ref="table"  height="630" :columns="th" :data="tableData"></Table>    
    <!-- <div class="foot">
      <Page :total="100" show-total /> 
    </div>  --> 
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
          customer: '广电',
          equipmentCount: 2,
        }
      ],
      th: [
        {
          title: '局点名',
          key: 'customer',
          width: 120,
        },
        {
          title: '设备数',
          key: 'equipmentCount',
          width: 80,
        },
        {
          title: '版本信息',
          key: 'versionLog'
        },
        {
          title: '风险盘',
          key: 'riskDiskNum',
          width: 80,
          render: (h, params) => {
            return h('div', params.row.riskDiskNum + ' pcs')
          }
        },
        {
          title: '已知问题',
          key: 'resultContent',
          render: (h, params) => {
            return h('pre', {
              style: {
                'white-space': 'pre-wrap',
                'word-wrap': 'break-word'
              }
            }, params.row.resultContent)
          }
        },
        {
          title: 'FW链接',
          key: 'firmwareLink',
          render: (h, params) => {
            return h('a', {
              attrs: {
                href: params.row.firmwareLink
              }
            }, params.row.firmwareLink)
          }
        },
        {
          title: '日志链接',
          key: 'logLinks',
          render: (h, params) => {
            return h('pre', {
              style: {
                'white-space': 'pre-wrap',
                'word-wrap': 'break-word'
              }
            }, params.row.logLinks)
          }
        },
        {
          title: '类别',
          key: 'category',
          width: 80,
        }
      ]
    }
  },
  methods: {
    getData() {
      let data = new FormData();
      data.append('logReportId', this.$route.query.id);
      this.$http.post(this.$api.showReport, data)
      .then(res => {
          if(res.code === '200'){
            let data = res.data;
            data.forEach(e => {
              this.tableData.push({
                customer: e.customer,
                equipmentCount: e.equipmentCount,
                versionLog: e.versionLog,
                riskDiskNum: e.riskDiskNum,
                resultContent: e.resultContent,
                firmwareLink: e.firmwareLink,
                logLinks: e.logLinks,
                category: e.category
              })
            })
            
          } else {
              this.$Message.error('操作失败！');
          }
      });
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