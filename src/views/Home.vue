<template>
  <el-container class="container">
    <el-aside class="aside">
      <el-row>
        <el-col :span="6" class="asideLeft">
                    <ul>
            <li><a href="#"></a></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <p>企业</p>
          <p>消息</p>
          <p>日历</p>
          <p>网盘</p>
        </el-col>
        <el-col :span="18" class="asideRight">
          <p>网盘</p>
          <div class="demo-input-suffix search">
            <el-input
              placeholder="请输入内容"
              v-model="input23">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
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
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
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
* {
  box-sizing: border-box;
}

html,
body,
.container {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  background-color: rgba(224, 221, 221, 0.61);
}

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

.container .aside {
  height: 100%;
  background-color: #fff;
  overflow: hidden;
}
.container .aside .el-row {
  height: 100%;
}
.aside .asideLeft {
  height: 100%;
  background-color: #409EFF;
}
.aside .asideRight {
  height: 100%;
}
.asideRight p {
  padding-left: 20px;
}
.asideRight .search {
  width: 80%;
  padding: 0 auto;
}
</style>
