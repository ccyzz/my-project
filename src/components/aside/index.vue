<template>
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
                    <i class="iconfont icon-wangpan1" style="font-size: 18px;"></i>
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
        <!-- 侧边右部 -->
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
            :render-content="renderContent"
            :props="defaultProps"
            node-key="id"
            @node-click="handleNodeClick"
            >
            </el-tree>
            <!-- 回收站 -->
            <div :class="[{recycleBG: isRecycle}, recycleBox]" @click="goPage('recyle')">
            <!-- <div :class="classObject" @click="goPage(recyle)"> -->
							<i class="el-icon-delete"></i>
              <span class="recyle">回收站</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-aside>
</template>

<script>
export default {
    data() {
      return {
          input23: '',
          // 样式控制
          isRecycle: false,
          recycleBox: 'recycleBox',
          // 侧边栏树形数据
          treeData: [],

          defaultProps: {
            children: 'directory',
            className: '',
            label: 'fdName'
          }
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      // 获取tree的数据
      async loadData() {
        const res = await this.$ajax.get('/api/support.platform/catalog/fdtree.act?fdId=0');
        const data = res.data.value;
        this.treeData = data;
        console.log(data)
      },
      // tree图标
      renderContent(h, {node, data, store}) {
          return (
            <span class="custom-tree-node">
              <i class='iconfont icon-wenjian6'></i>
              <span style="margin-left:5px;">{node.label}</span>
            </span>
          );
      },
      // 回收站样式
      goPage(data){
          this.isRecycle = true;
          this.$router.push({name: 'recycle'});
      },
      // 获取每一个tree节点的id并传给父组件
      // $(item1, item2) 第一个参数是父组件中调用的监听器，第二个参数是传给父组件的参数
      handleNodeClick(nodeObj, node, nodeComponent) {
        // console.log(this.treeData);
        // console.log(nodeObj)
        // console.log(node);
        // console.log(nodeComponent);
        this.$emit('listenToChildEvent', nodeObj);
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
/* 树图标 */
.icon-wenjian6 {
  color: skyblue;
  font-size: 16px;
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

/* 回收站 */
.recycleBox {
  margin-left: 15px;
  font-size: 0;
  cursor: pointer;
}
.recycleBox:hover{
  background-color: #f5f7fa;
}
.recycleBG{
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

</style>
