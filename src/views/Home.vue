<template>
  <el-container class="container">
    <!-- 侧边部分 -->
    <left-aside @listenToChildEvent="showMsgFromChild" ref="myAside"></left-aside>
    <el-container class="inContainer">
      <el-header class="header">
        <el-row>
          <el-col :span="18" class="header-left">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">企业网盘</el-breadcrumb-item>
              <el-breadcrumb-item>公司照片</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="3">
            <el-button icon="el-icon-plus" @click="dialogAddVisible = true" round type="primary" size="small">新建文件夹</el-button>
            <el-dialog title="新建文件夹" :visible.sync="dialogAddVisible">
              <el-form :model="formData">
                <el-input v-model="formData.dirName" class="addinput" placeholder="输入文件夹的名称"></el-input>
                <el-form-item class="place" label="所在位置" :label-width="formLabelWidth">
                  <treeselect :normalizer="normalizer" v-model="value" :multiple="false" :options="options" />
                </el-form-item>
                <el-form-item label="可见范围" :label-width="formLabelWidth">
                  <el-select placeholder="公开:企业所有成员都可以看见此文件夹">
                    <el-option label="公开:企业所有成员都可以看见此文件夹" value=""></el-option>
                    <el-option label="私有:只有加入的成员才能看见此文件夹" value=""></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button round @click="dialogAddVisible = false">取 消</el-button>
                <el-button round type="primary" @click="handleAdd">确 定</el-button>
              </div>
            </el-dialog>
          </el-col>
          <el-col :span="3">
            <el-upload
              class='ensure ensureButt'
              action="/api/support.platform/catalog/addfile.act"
              :data="upLoadData"
              name="importfile"
              :onError="uploadError"
              :onSuccess="uploadSuccess"
              >
              <el-button icon="el-icon-upload2" round type="primary" size="small">上传文件</el-button>
            </el-upload>
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
                <span v-if="scope.row.fileObj">
                  <i v-if="scope.row.fileObj.fileType == 'null'" style="color: skyblue; font-size: 30px;" class="iconfont icon-wenjian"></i>
                  <i style="color: skyblue; font-size: 30px;" v-else-if="scope.row.fileObj.fileType == 'txt'" class="iconfont icon-txtwenjian"></i>
                  <i style="color: skyblue; font-size: 30px;" v-else-if="scope.row.fileObj.fileType == 'png' ||
                    scope.row.fileObj.fileType == 'jpg' ||
                    scope.row.fileObj.fileType == 'gif'"
                    class="iconfont icon-wenjiantupian font-size: 30px;">
                  </i>
                  <i style="color: skyblue; font-size: 30px;" v-else-if="scope.row.fileObj.fileType == 'doc' || scope.row.fileObj.fileType == 'docx'" class="iconfont icon-wenjianword"></i>
                  <i style="color: skyblue; font-size: 30px;" v-else-if="scope.row.fileObj.fileType == 'pdf'" class="iconfont icon-pdf1"></i>
                  <i style="color: skyblue; font-size: 30px;" v-else-if="scope.row.fileObj.fileType == 'ppt' || scope.row.fileObj.fileType == 'pptx'" class="iconfont icon-pptwenjian"></i>
                  <i style="color: skyblue; font-size: 30px;" v-else-if="scope.row.fileObj.fileType == 'xls' || scope.row.fileObj.fileType == 'xlsx'" class="iconfont icon-Exelfileformat"></i>
                  <i style="color: skyblue; font-size: 30px;" v-else-if="scope.row.fileObj.fileType == 'mp4'" class="iconfont icon-wenjianshipin"></i>
                  <i style="color: skyblue; font-size: 30px;" v-else-if="scope.row.fileObj.fileType == 'zip'" class="iconfont icon-filezip"></i>
                </span>
                <span v-else>
                  <i style="color: skyblue; font-size: 30px;" class="iconfont icon-wenjian"></i>
                </span>
                <!-- 1是文件 2是文件夹  -->
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
        <div v-if="isMessage" @click="closeBox()" class="messageBox">
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
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import leftAside from '../components/aside';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import qs from 'qs';
export default {
  components: {
    Treeselect,
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
      // 控制弹窗的现实和隐藏
      isMessage: false,
      // 表格中的每一条数据
      tableItemInfo: {},
      // 右边文件表格数据
      tableData: [],
      // 新建文件夹对话框
      dialogAddVisible: false,
      // 新建文件夹的输入框数据
      formData: {
        dirName: ''
      },
      value: '',
      options:[],
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.childrens,
        }
      },
      formLabelWidth: '120px',
      // 上传时的参数
      upLoadData: {
        version: '1',
        fdId: ''
      }
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
     // 点击表格文档弹窗关闭
    closeBox() {
        this.isMessage = false;
    },
    // 点击表格中的文件...更多
    moreClick(data) {
      this.isMessage = true;
      this.tableItemInfo = data;
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
      // console.log(this.tableData);
      // console.log(nodeObj);
    },
    // 下载
    downloadFile(data) {
      console.log(data);
    },

    // 删除
    handleDel(id, type){
        const _this = this;
        this.isMessage = false;
        this.$confirm('确定要删除吗？?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.get('/api/support.platform/rs/recoveryFd.act?fdFileId='+id+'&type='+type)
          .then(() => {
            this.$message.success('删除成功')
            this.showMsgFromChild(_this.treeNodeId)
          })
          .catch(() => {
            this.$message.success('删除失败')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
        // 重命名
    fnRename(obj){
      // 1是文件 2是文件夹
      console.log(obj);
      this.$prompt('请输入新名称', '重命名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: obj.name
      })
      .then(( valueObj ) => {
        // 1文件
        if(obj.type == 1){
          const id = obj.fileObj.id;
          const fileRes = this.$ajax.get("/api/support.platform/file/renameFile.act?ID=" + id + "&FileName=" + valueObj.value)
          .then(() => {
            this.$message.success('重命名成功');
            this.showMsgFromChild(this.treeNodeId)
          })
          .catch(() => {
            this.$message.success('重命名失败');
          });
        }else{
          const folderRes = this.$ajax.get("/api/support.platform/catalog/renamefd.act?fdId=" + obj.id + "&dirName=" + valueObj.value)
          .then(() => {
            this.$message.success('重命名成功');
            this.showMsgFromChild(this.treeNodeId)
          })
          .catch(() => {
            this.$message.success('重命名失败');
          });
        }
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
      // if(fileRes){

      // }
    },

    // 上传文件
    // 上传成功
    uploadSuccess (response, file, fileList) {
      this.showMsgFromChild(this.treeNodeId);
      this.$refs.myAside.loadData();
    },
    // 上传失败
    uploadError (response, file, fileList) {
      this.$message('上传失败');
    },
    // 展示左边树目录
    async loadData() {
      const res = await this.$ajax.get('/api/support.platform/catalog/fdtree.act?fdId=0');
      const data = res.data.value;
      this.treeData = data;
    },

    // Treeselect的展示 getfdtree
    async loadtreeData() {
      const res = await this.$ajax.get('/api/support.platform/catalog/getfdtree.act?fdId=0');
      console.log(res);
      const data = res.data.value;
      this.options = data;
    },

    // 点击新建文件夹中的确定按钮
    handleAdd() {
      const data = {"dirName": this.formData.dirName,"pid": this.value};
      // const res = await this.$ajax.post('/api/support.platform/catalog/addfd.act', data);
      // console.log(res)
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: '/api/support.platform/catalog/addfd.act'
      };
      this.$ajax(options)
      .then((res) => {
      console.log(res)
      })
      .catch((error) => {
      console.log(error);
      });
      // const res = await this.$ajax.post('/api/support.platform/catalog/addfd.act', data);
    }
  },
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
.tableScrollbar {
  height: 500px;
  overflow: hidden;
}
.el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>
