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
                <a href="javascript:;">
                  <span class="middle-icon">
                    <i class="iconfont icon-message"></i>
                  </span>
                  <span class="name">消息</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <span>
                    <i class="iconfont icon-rili5"></i>
                  </span>
                  <span>日历</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <span>
                    <i class="iconfont icon-wangpan"></i>
                  </span>
                  <span>网盘</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="bottom-area">
            <ul>
              <li>
                <a href="javascript:;">
                  <span>
                    <i class="iconfont icon-tongxunlu"></i>
                  </span>
                  <span>通讯录</span>
                </a>
              </li>
              <li>
                <i class="iconfont icon-icon7"></i>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="18" class="aside-right">
          <p>网盘</p>
          <div>
            <div class="search">
              <el-input
                placeholder="请输入内容"
                v-model="input23">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-aside>
    <el-container class="inContainer">
      <el-header class="header">
        <el-row>
          <el-col :span="18">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">企业网盘</el-breadcrumb-item>
              <el-breadcrumb-item>公司照片</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="3">
            <el-button type="primary">主要按钮</el-button>
          </el-col>
          <el-col :span="3">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="handleChange"
              :file-list="fileList3">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="main">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="文件名"
            width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            label="大小"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="更新人">
          </el-table-column>
          <el-table-column
            prop="name"
            label="更新时间"
            width="180">
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
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        input23: '',
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }],
        fileList3: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    }
  };
</script>

<style>
.inContainer {
  height: 100%;
}

.header {
  line-height: 60px;
  margin-left: 1px;
  background-color: #fff;
}

.main {
  height: 100%;
  margin: 15px;
  overflow: hidden;
  background-color: #fff;
}

/* 侧边部分 */
.container .aside {
  height: 100%;
  background-color: #fff;
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
  color: #fff;
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
  color: #fff;
  display: block;
  height: 70px;
  /* line-height: 70px; */
}
.middle-area .middle-icon {
  margin-top: 15px;
  display: inline-block;
  color: #fff;
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
  color: #fff;
}

/* 侧边右部 */
.aside .aside-right {
  height: 100%;
}
.aside-right p {
  padding-left: 20px;
}
.aside .aside-right .search {
  width: 80%;
  margin-left: 10px;
  border-radius: 50%;
}

</style>
