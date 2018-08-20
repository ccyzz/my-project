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
            <el-button icon="el-icon-plus" @click="dialogFormVisible = true" round type="primary" size="small">新建文件夹</el-button>
            <el-dialog title="新建文件夹" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-input v-model="input" placeholder="输入文件夹的名称"></el-input>
                <el-form-item label="所在位置" :label-width="formLabelWidth">
                  <el-select v-model="form.region" placeholder="企业网盘">
                    <el-option label="企业网盘" value="shanghai"></el-option>
                    <el-option label="个人网盘" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="可见范围" :label-width="formLabelWidth">
                  <el-select v-model="form.region" placeholder="公开:企业所有成员都可以看见此文件夹">
                    <el-option label="公开:企业所有成员都可以看见此文件夹" value="shanghai"></el-option>
                    <el-option label="私有:只有加入的成员才能看见此文件夹" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button round @click="dialogFormVisible = false">取 消</el-button>
                <el-button round type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
          </el-col>
          <el-col :span="3">
          <el-upload
            ref="upload"
            class="upload"
            :action="uploadUrl()"
            :on-success="handleSuccess"
            :limit=1
            multiple
            method:="post"
            :on-preview="handlePreview"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
            :file-list="fileList">
            <el-button icon="el-icon-upload2" round type="primary" size="small">上传文件</el-button>
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
 export default {
    data() {
      return {
        // 侧边栏树形数据
        treeData: [],
        id: 'id',
        defaultProps: {
          children: 'directory',
          label: 'fdName'
        },
        checkedList: [],
        input23: '',
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
        fileList3: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        // 新建文件夹的输入框数据
        input: '',
        // 文件上传的数据
        fileList:[]
      };
    },
    created() {
      this.loadData();
    },
    methods: {
      formatter(row, column) {
        return row.date;
      },
      uploadUrl(){
        var url = process.env.BASE_API + "url";
        return url;
      },
      handleSuccess(){
          //上传成功要处理的事
      },
      handlePreview(){
          //上传前要处理的事
      },

      // 展示目录
      async loadData() {
        const res = await this.$ajax.get('/api/support.platform/catalog/fdtree.act?fdId=0');
        const data = res.data.value;
        this.treeData = data;
        console.log(data)
      },

      // 当点击树节点的时候在右表中显示数据
      async handleNodeClick(treeData) {
      //   const res = await this.$ajax.get(`/api/support.platform/catalog/getChildFiles.act/${pId}`)
        console.log(treeData)
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
.header .add {
  position: absolute;
  box-shadow: 0 0 24px rgba(0,0,0,.18);
  display: none;
  z-index: 10;
  right: 110px;
  top: 55px;
  height: 100px;
  width: 200px;
  background-color: #fff;
}

.header .add li {
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  cursor: pointer;
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
