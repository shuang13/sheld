<template>
  <div class="upload">
    <div class="inner-header">
      <Button type="info" @click="uploadHandle">新建局点</Button>
      <Button type="error" @click="submitHandle">提交所有局点</Button>
      <Modal
          width="360"
          v-model="uploadModal"
          title="上传报告"
          @on-ok="ok"
          @on-cancel="cancel">
          <Form  :label-width="80">
            <FormItem label="备注说明">
                <Input v-model="remark" type="textarea" placeholder="Enter something..."/>
            </FormItem>
          </Form>
      </Modal>
    </div>
    <Table ref="table" height="600" :columns="th" :data="tableData" style="overflow: visible;"></Table> 

  </div>
</template>

<script>
export default {
  name: 'Upload',
  data () {
    return {
      // 弹窗标志
      uploadModal: false,
      // 备注
      remark: '',
      // 表格样例
      tableData: [{
        id: '',
        logReportId: '',
        costomer: '',
        equipmentCount: '',
        versionLog: '',
        logLinks: '',
        createTime: '',
        finishTime: '',
        category: '',
        resultContent: '',
        riskDiskNum: '',
        firmwareLink: '',
        $isEdit: true
      }],
      // 上传数据
      pushData: [],
      // 表头
      th: [
        {
          title: '局点名',
          key: 'costomer',
          width: 170,
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('Input', {
                props: {
                  type: 'text',
                  value: params.row.costomer,
                },
                on: {
                  input: (value) => {
                    params.row.costomer = value
                  }
                }
              })
            } else {
              return h('div', params.row.costomer)
            }
          }
        },
        {
          title: '设备数',
          key: 'equipmentCount',
          width: 80,
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('Input', {
                props: {
                  type: 'text',
                  value: params.row.equipmentCount,
                },
                on: {
                  input: (value) => {
                    params.row.equipmentCount = value
                  }
                }
              })
            } else {
              return h('div', params.row.equipmentCount)
            }
          }
        },
        {
          title: '版本信息',
          key: 'versionLog',
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('Input', {
                props: {
                  type: 'textarea',
                  value: params.row.versionLog,
                  autosize: true
                },
                on: {
                  input: (value) => {
                    params.row.versionLog = value
                  }
                }
              })
            } else {
              return h('pre', {
                style: {
                  'white-space': 'pre-wrap',
                  'word-wrap': 'break-word'
                }
              },params.row.versionLog)
            }
          }
        },
        {
          title: '日志链接',
          key: 'logLinks',
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('Input', {
                props: {
                  type: 'textarea',
                  value: params.row.logLinks,
                  autosize: true
                },
                style: {
                  padding: '10px 0',
                  'white-space': 'pre-line'
                },
                on: {
                  input: (value) => {
                    params.row.logLinks = value
                  }
                }
              })
            } else {
              return h('pre', {
                style: {
                  'white-space': 'pre-wrap',
                  'word-wrap': 'break-word'
                }
              },params.row.logLinks)
            }
          }
        },
        {
          title: '类别',
          key: 'category',
          width: 120,
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('Select', 
                {
                  props: {
                    value: params.row.category,
                  },
                  on:{
                    "on-change": (event) => {
                      params.row.category = event
                    }
                  }
                  
                },
                  this.categoryList.map((item) => {
                    return[
                      h('Option', {
                        props: {
                          value: item.value,
                          key: item.value
                        },
                        style: {
                          width: '80px'
                        },
                        

                      }, item.label)
                    ]
                  })
                )
            } else {
              return h('div', this.categoryList[params.row.category - 1].label)
            }
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 160,
          render: (h, params) => {
            return [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                on: {
                  click: () => {
                    if (params.row.$isEdit) {
                      this.saveHandle(params.row)
                    } else {
                      this.editHandle(params.row)
                    }
                  }
                }
              }, params.row.$isEdit ? '保存' : '编辑'),
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
                    if (this.tableData.length == 1) {
                      this.$Message.info('表格不能为空！');
                    } else {
                      this.tableData.splice(params.index,1);
                      this.pushData.splice(params.index,1);

                    }
                  }
                }
              }, '删除')
            ]
          }
        }
      ],
      // 类别
      categoryList: [
        {
          value: '1',
          label: '金融',
        },
        {
          value: '2',
          label: '运营商',
        },
        {
          value: '3',
          label: '企业',
        },
        {
          value: '4',
          label: '其他',
        }
        
      ],

    }
  },
  methods: {
    // 提交完成
    ok() {
      // 上传报告
      let data = new FormData();
      data.append('logSiteList', this.pushData);
      data.append('note', this.remark);
      this.$http.post(this.$api.report, data)
      .then(res => {
          if(res.code === '200'){
              this.$Message.error('操作成功！');
              this.$router.push(
                {
                    path:'/result',
                }
              )
          } else {
              this.$Message.error('操作失败！');
          }
      })
    },
    cancel() {
      this.$Message.info('Clicked cancel');
    },
    // 保存当前条
    saveHandle(row) {
      if(row.costomer == '' || row.equipmentCount == '' || row.versionLog == '' || row.category == '' || row.logLinks == '') {
        this.$Message.info('请完整填写信息！');
        return 0;
      } else {
        this.$set(row, '$isEdit', false);
        this.tableData[row._index] = row;
        this.pushData[row._index] = {
          id: row.id,
          logReportId: row.logReportId,
          costomer: row.costomer,
          equipmentCount: row.equipmentCount,
          versionLog: row.versionLog,
          logLinks: row.logLinks,
          createTime: row.createTime,
          finishTime: row.finishTime,
          category: row.category,
          resultContent: row.resultContent,
          riskDiskNum: row.riskDiskNum,
          firmwareLink: row.irmwareLink
        };
      }
    },
    editHandle(row) {
      this.$set(row, '$isEdit', true)
    },
    // 新建局点
    uploadHandle() {
      if (!this.tableData[this.tableData.length - 1].$isEdit) {
        this.tableData.push({
          id: '',
          logReportId: '',
          costomer: '',
          equipmentCount: '',
          versionLog: '',
          logLinks: '',
          createTime: '',
          finishTime: '',
          category: '',
          resultContent: '',
          riskDiskNum: '',
          firmwareLink: '',
          $isEdit: true
        });
        this.pushData.push({
          id: '',
          logReportId: '',
          costomer: '',
          equipmentCount: '',
          versionLog: '',
          logLinks: '',
          createTime: '',
          finishTime: '',
          category: '',
          resultContent: '',
          riskDiskNum: '',
          firmwareLink: '',
        }); 
      } else {
        this.$Message.info('请保存当前局点信息！');
      }
    },
    // 上传所有局点按钮绑定事件
    submitHandle() {
      if(!this.tableData[this.tableData.length - 1].$isEdit) {
        this.uploadModal = true;
        
      } else {
        this.$Message.info('请保存当前局点信息！');
      }
      
    }
  },
  mounted(){

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
  th {
    overflow: visible;
    height: 200px;
  }

  
</style>
