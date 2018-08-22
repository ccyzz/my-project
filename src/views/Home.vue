<template>
  <el-container class="container">
    <!-- 侧边部分 -->
    <el-aside class="aside">
      <el-row>
        <!-- 侧边左部 -->
        <el-col :span="6" class="aside-left">
          <div class="top-area">
            <a href="javascript:;">哈哈</a>
          </div>
          <div class="middle-area">
            <ul>
              <li>
                <a href="javascript:;" class="aside-left-item">
                  <span class="middle-icon">
                    <i class="iconfont icon-xiaoxi"></i>
                  </span>
                  <span class="name">消息</span>
                </a>
              </li>
              <li>
                <a href="javascript:;" class="aside-left-item">
                  <span class="middle-icon">
                    <i class="iconfont icon-rili5"></i>
                  </span>
                  <span class="name">日历</span>
                </a>
              </li>
              <li>
                <a href="javascript:;" class="aside-left-item">
                  <span class="middle-icon font-s">
                    <i class="iconfont icon-wangpan" style="font-size: 18px;"></i>
                  </span>
                  <span class="name">网盘</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="bottom-area">
            <ul>
              <li>
                <a href="javascript:;" class="aside-left-item">
                  <span class="bottom-icon">
                    <i class="iconfont icon-tongxunlu"></i>
                  </span>
                  <span class="name">通讯录</span>
                </a>
              </li>
              <li class="mar-top">
                <i class="iconfont icon-icon7"></i>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="18" class="aside-right">
          <p>网盘</p>
          <div>
            <!-- 搜索框 -->
            <div class="search">
              <el-input
                placeholder="请输入内容"
                v-model="input23">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
            <!-- tree -->
            <el-tree
              :data="treeData"
              @node-click="handleNodeClick()"
              :props="defaultProps"
              node-key="id"
              ref="tree"
              >
            </el-tree>
          </div>
        </el-col>
      </el-row>
    </el-aside>
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
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :before-upload="uploadFile"
            multiple
            name="file"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button icon="el-icon-upload2" round type="primary" size="small">上传文件</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="main">
        <el-table
          :data="tableData"
          style="width: 100%"
          height="600"
          :default-sort = "{prop: 'date', order: 'descending'}"
          >
          <el-table-column
            prop="date"
            label="文件名"
            width="300"
            :formatter="formatter">
          </el-table-column>
          <el-table-column
            prop="name"
            label="大小"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="更新人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="date"
            label="更新时间"
            sortable>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
export default {
  components: { Treeselect },
  data() {
    return {
      // 侧边栏树形数据
      treeData: [],
      id: 'id',
      defaultProps: {
        children: 'directory',
        label: 'fdName'
      },
      // 搜索功能的数据
      input23: '',
      // 表格数据
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市'
        }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市'
        }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普'
        }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普'
      }],
      // 新建文件夹对话框
      dialogAddVisible: false,
      // 新建文件夹的输入框数据
      formData: {
        dirName: ''
      },
      options:[],
      normalizer(node) {
      return {
        id: node.id,
        label: node.name,
        children: node.childrens,
      }
    },
      formLabelWidth: '120px',
      // 文件上传的数据
      fileList:[]
    };
  },
  created() {
    this.loadData();
    this.loadtreeData();
  },
  methods: {
    formatter(row, column) {
      return row.date;
    },
    // 上传文件
    async uploadFile(file) {
      var formData=new FormData()
      formData.append('file',file)
      var file = formData
      const res = await this.$ajax.post('/api/support.platform/catalog/addfile.act', file)
    },
    uploadUrl(){
      var url = process.env.BASE_API + "url";
      return url;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`)
    },
    handleSuccess(){
        //上传成功要处理的事
    },
    handlePreview(){
        //上传前要处理的事
    },

    // 展示左边树目录
    async loadData() {
      const res = await this.$ajax.get('/api/support.platform/catalog/fdtree.act?fdId=0');
      const data = res.data.value;
      this.treeData = data;
      console.log(data)
    },

    // Treeselect的展示
    async loadtreeData() {
      const res = await this.$ajax.get('/api/support.platform/catalog/getfdtree.act?fdId=0');
      const data = res.data.value;
      this.options = data;
      console.log(data)
    },

    // 点击新建文件夹中的确定按钮
    async handleAdd() {
      const json = {"dirName": this.formData.dirName,"pid": this.value};
      const jsonStr = JSON.stringify(json);
      const res = await this.$ajax.post('/api/support.platform/catalog/addfd.act', jsonStr);
      // this.$ajax({
      //   url:'/api/support.platform/catalog/addfd.act',
			// 	method: 'post',
      //   data:  {
      //     dirName: this.formData.dirName,
      //     pid: this.value
      //   },
      //   headers:{
			// 			'Content-Type':'text/plain;charset=UTF-8'
			// 		}
      // });
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
.header .el-input--suffix {
  width: 100%;
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

/* 寇义东 */
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

</style>
