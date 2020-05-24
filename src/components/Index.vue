<template>
    <div class="index">
        <div class="header">
            <p>日常巡检</p>
        </div>
        <div class="content">
            <div class="aside">
                <Menu ref="menu" theme="dark" :active-name="active" style="width: 160px; border-radius: 4px; float: left; margin-right: 10px;">
                    <MenuItem :to="{path:'/Upload'}" name="1">新建报告</MenuItem>
                    <MenuItem :to="{path:'/Result'}" name="2">报告列表</MenuItem>
                </Menu>
            </div>
            <div class="content-right">
                <div class="content-inner">
            
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Index',
    data() {
        return {
            active: '1'
        }
    },
    methods: {
       
    },
    mounted(){
        if(this.$route.query.id) {
            this.active = '2';
        } else {
            this.$router.push(
                {
                    path:'/Upload'
                }
            ).catch(data => {  })
        }
        
    }
}
</script>
<style lang="less">
    .index {
        position: fixed;
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
    }
    .header {
        padding-left: 25px;
        height: 50px;
        overflow: hidden;
        line-height: 50px;
        background-color: #1C2438;
        color: #2d8cf0;
        font-size: 17px;
    }
    .content {
        background: #f8f8f9;
        position: fixed;
        width: 100%;
        height: 100%;
        display: flex;
        .aside {
            width: 160px;
            height: 100%;
            overflow: hidden;
            background: #515A6E;
            Menu {
                float: left;
            }
        }
        .content-right {
            width: calc(100% - 100px);
            .content-inner {
                padding-left: 20px;
                width: 100%;
                border-radius: 4px;
                
            }
        }
    }
    h3 {
        margin: 10px;
    }
</style>
