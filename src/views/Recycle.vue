<template>
  <el-container class="container">
    <!-- 侧边部分 -->
    <left-aside @listenToChildEvent="showMsgFromChild"></left-aside>
    <el-container class="inContainer">
      <el-header class="header">
        <el-row>
          <i style="color: skyblue; font-size: 20px; margin-right: 10px;" class="el-icon-delete"></i>
          <span class="recyle">回收站</span>
        </el-row>
      </el-header>
      <el-main class="main">
        <template>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="文件名"
              width="180">
              <template slot-scope="scope">
                <!-- 1是文件 2是文件夹 -->
                <i :list="scope" v-if="scope.row.fileObj.fileType">
                  <!-- <i></i> -->
                </i>
                <i v-else></i>
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
                <a :href="'http://192.168.1.20:8081/support.platform/file/downloadFile.act?fileId=' + props.row.id"><i class="iconfont icon-xiazai3" @click="downloadFile(props.row.id)"></i></a>
                <i class="el-icon-more" @click="moreClick(props.row)"></i>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <!-- 弹窗 -->
        <!-- <div v-if="isMessage" @click="closeBox()" class="messageBox">
          <div id="messageBox">
            <ul>
                <li><a href="javascript:;">新建文件夹</a></li>
                <li><a href="javascript:;">移动</a></li>
                <li><a href="javascript:;">复制</a></li>
                <li><a href="javascript:;">下载</a></li>
                <li><a href="javascript:;" @click="fnRename(tableItemInfo)">重命名</a></li>
                <li><a href="javascript:;" @click="handleDel(tableItemInfo.id, tableItemInfo.type)">删除</a></li>
            </ul>
          </div>
        </div> -->
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
      // 侧边栏树形数据
      treeData: [],
      // 每一个tree节点对象
      treeNodeObj: {},
      // 每一个tree节点的id
      treeNodeId: '0',
      defaultProps: {
        children: 'directory',
        label: 'fdName'
      },
      // 搜索功能的数据
      input23: '',
      // 表格中的每一条数据
      tableItemInfo: {},
      // 右边文件表格数据
      tableData: []
    };
  },
  created() {
    this.showMsgFromChild(this.treeNodeId)
    this.loadtreeData();
  },
  methods: {
    // 文件夹的点击事件
    onFolder(id) {
      this.showMsgFromChild(id);
    },

    // 点击目录在表格中显示文件
    // 子组件向父组件传参,左侧每一项点击事件传递过来的参数（被点击的节点对象）
    async showMsgFromChild(nodeObj) {
      // 上传文件的参数
      this.upLoadData.fdId = nodeObj.id;
      this.treeNodeObj = nodeObj;
      if(typeof nodeObj != 'string'){
        this.treeNodeId = nodeObj.id
        // console.log('nodeObj的类型是object！')
      }else{
        this.treeNodeId = nodeObj;
      }
      // console.log(this.treeNodeId);
      const res = await this.$ajax.get(
        "/api/support.platform/catalog/getchildfiles.act?fdId=" + (nodeObj ? this.treeNodeId : '0')
      );
      const tableData = res.data.value;
      this.tableData = tableData;
      this.$router.push({name: 'home'});
    },

    // 展示左边树目录
    async loadData() {
      const res = await this.$ajax.get('/api/support.platform/catalog/fdtree.act?fdId=0');
      const data = res.data.value;
      this.treeData = data;
      console.log(data)
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
