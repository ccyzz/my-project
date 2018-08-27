<template>
  <el-container class="container">
    <!-- 侧边部分 -->
    <left-aside @onRecycle="onRecycle"></left-aside>
    <el-container class="inContainer">
      <el-header class="header">
        <el-row>
          <el-col :span="22">
            <i style="color: skyblue; font-size: 20px; margin-right: 10px;" class="el-icon-delete"></i>
          <span class="recyle">回收站</span>
          </el-col>
          <el-col :span="2">
            <el-button @click="onDelect" round type="primary" size="small">清空</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="main">
        <template>
          <el-table
            :data="tableData"
            style="width: 100%"
            height="500"
            >
            <el-table-column
              prop="name"
              label="文件名"
              width="180">
              <template slot-scope="scope">
                <i>
                </i>
                <span class="folderType" v-if="scope.row.type == '1'">{{scope.row.name}}</span>
                <span class="folderType" v-else @click="onFolder(scope.row.id)">{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="fileObj.fileSize"
              label="大小"
              width="180">
            </el-table-column>
            <el-table-column
              prop="updateBy"
              label="更新人">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新时间"
              sortable
              >
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="props">
                <i style="padding-right: 5px;" title="还原" class="iconfont icon-reduction" @click="fnSestore(props.row.id)"></i>
                <i style="padding-left: 5px;" title="彻底删除" class="iconfont icon-chedishanchu2" @click="fnDelete(props.row.id)"></i>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import leftAside from '../components/aside';
export default {
  components: {
    leftAside
  },
  data() {
    return {
      // 被删除数据列表
      tableData:[]
    };
  },
  created() {
    this.onRecycle();
  },
  methods: {
    // 获取被删除数据列表
    async onRecycle() {
      const res = await this.$ajax.get('/api/rs/rsList.act');
      this.tableData = (res.data.value);
    },
    onDelect() {
      alert(1)
    },
    // 还原
    async fnSestore(id) {
      console.log('id:'+id);
      const res = await this.$ajax.get('/api/rs/restoreyFd.act?rsId=' + id);
      console.log(res.status);
      if(res.status == '200'){
        this.$message('还原成功');
        this.onRecycle();
      }else{
        this.$message('还原失败');
      }
    },
    // 删除
    fnDelete(id) {
      this.$confirm('确定要删除吗？?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        const res = this.$ajax.get('/api/rs/deleteRs.act?rsId=' + id)
        .then(() => {
          this.$message.success('删除成功')
          this.onRecycle();
        })
        .catch(() => {
          this.$message.success('删除失败')
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style>
.inContainer {
  height: 100%;
}

/* 头部 */
.header {
  line-height: 60px;
  margin-left: 1px;
  background-color: #fdfdfd;
}
.header .el-row {
  line-height: 60px;
}
.header .el-col {
  height: 60px;
  line-height: 60px;
}
.header-left .el-breadcrumb {
  height: 60px;
  line-height: 60px;
}

/* 新建文件夹 */
.header .addinput {
  width: 80%;
}
.header .el-dialog__header {
  padding: 20px 20px 0px;
}
.header .el-dialog__body {
  padding: 0 20px;
}
.header .place {
  margin-top: 10px;
}
.header .vue-treeselect__control {
  width: 60%;
}
.header .el-select {
  width: 60%;
}
.header .el-upload-list__item {
  height: 100px;
  width: 200px;
  position: absolute;
  right: -10px;
  top: 60px;
  background-color: #fff;
  z-index: 10;
  width: 200px;
  border-radius: 3px;
  box-shadow: 0 0 24px rgba(0,0,0,.18);
}

/* 主列表部分 */
.main {
  height: 100%;
  margin: 15px;
  overflow: hidden;
  background-color: #fdfdfd;
}

/* 侧边部分 */
.container .aside {
  height: 100%;
  background-color: #fdfdfd;
  overflow: hidden;
}
.container .aside .el-row {
  height: 100%;
}

/* 侧边左部 */
.aside .aside-left {
  height: 100%;
  background-color: #409EFF;
}
.aside-left .top-area a {
  display: block;
  height: 50px;
  margin: 18px 0;
  text-align: center;
  color: #fdfdfd;
}

.aside-left .middle-area {
  text-align: center;
}
.middle-area ul {
  margin: 0;
  padding: 0;
}
.middle-area ul>li {
  cursor: pointer;
}
.middle-area ul a {
  color: #fdfdfd;
  display: block;
  height: 70px;
}
.middle-area .middle-icon {
  margin-top: 15px;
  display: inline-block;
  color: #fdfdfd;
  font-size: 24px;
  opacity: .8;
  transition: transform 0.5s, opacity 0.5s;
}
.middle-area .middle-icon i {
  font-size: 24px;
}
.middle-area .middle-icon .name {
  display: none;
  display: block;
  height: 0;
  overflow: hidden;
  font-size: 12px;
  color: #fdfdfd;
}

/* 侧边左部 */
.aside-left-item {
  background-color: #409eff;
  transition-duration: 0.5s;
}

.middle-area ul a {
  height: 80px;
  padding: 10px 0;
}
.middle-area .name {
  position: relative;
  top: 20px;
  opacity:0;
}
.middle-area .middle-icon {
  margin-top: 0;
  position: relative;
  top: 20px;
  display: block;
  font-size: 0;
  transition-property: top;
  transition-duration: 0.5s;
}
 .aside-left-item:hover {
  transition-duration: .5s;
  background-color: #2f84dc;
}
.aside-left-item:hover .middle-icon{
  top: 5px;
  transition-property: top;
  transition-duration: 0.5s;
}
.aside-left-item:hover .name {
  opacity: 1;
  position: relative;
  top: 10px;
  transition-property: top;
  transition-duration: .5s;
}
.bottom-area .bottom-icon {
  margin-top: 0;
  position: relative;
  top: 20px;
  display: block;
  font-size: 0;
  transition-property: top;
  transition-duration: 0.5s;
}

.bottom-area {
  text-align: center;
  margin-top: 150px;
}
.bottom-area ul {
  margin: 0;
  padding: 0;
}
.bottom-area ul > li {
  cursor: pointer;
}
.bottom-area ul a {
  color: #fff;
  display: block;
  height: 70px;
}
.bottom-area .name{
  opacity: 0;
  display: block;
  position: relative;
  top: 20px;
  transition-property: top;
  transition-duration: .5s;
}
.aside-left-item:hover .name {
  opacity: 1;
  top: 10px;
  transition-property: top;
  transition-duration: .5s;
}
.bottom-area .bottom-icon{
  position: relative;
  top: 20px;
}
.aside-left-item:hover .bottom-icon{
  top: 10px;
}
.bottom-area .iconfont{
  font-size: 24px;
  color: #fff;
}
.mar-top{
  margin-top: 10px;
}

/* 侧边右部 */
.aside .aside-right {
  height: 100%;
}
.aside-right p {
  font-size: 16px;
  padding-left: 20px;
}

/* 搜索框 */
.aside-right .search {
  width: 80%;
  margin: 0 auto;
}
.aside-right .el-input__inner {
  height: 35px;
  line-height: 35px;
  border-radius: 20px;
}

/* 网盘树形结构 */
.aside-right .el-tree {
  margin-top: 15px;
  padding-left: 15px;
}

/* 回收站 */
.recycleBox {
  margin-left: 15px;
  font-size: 0;
  cursor: pointer;
}
.recycleBox:hover {
  background-color: #f5f7fa;
}
.recycleBG {
  background-color: #f5f7fa;
}
.recycleBox i {
  font-size: 12px;
  padding: 6px;
}
.recycleBox .recyle {
  font-size: 14px;
  color: #606266;
}
.iconfont, .el-icon-more{
  cursor: pointer;
}
.messageBox{

  background: rgba(48, 48, 48, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

/* 弹窗 */
#messageBox{
    position: absolute;
    z-index: 99;
    top: 240px;
    right: 15px;
    font-size:14px;
    padding: 5px 0;
    min-width: 200px;
    background: #fff;
    box-shadow: 0 0 24px rgba(0,0,0,.18);
}
#messageBox li{
    margin: 0 0 2px;
    cursor: pointer;
    transition: padding-left .2s;
}
#messageBox li:hover{
    padding-left: 10px;
    transition: padding-left .2s;
    background-color: #dedede;
}
#messageBox li a{
    font-size: 14px;
    padding: 5px 18px;
    line-height: 30px;
    color: #666;
    text-decoration: none;
    box-sizing: border-box;
}
#messageBox li a:hover{
    color: #333;
}
/* 文件名 */
.folderType{
  cursor: pointer;
}
</style>
