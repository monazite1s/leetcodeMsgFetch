<template>
  <div>
    <div class="container">
      <el-button
        class="search-box"
        type="warning"
        :icon="CirclePlusFilled"
        @click="visible = true"
        >新增成员</el-button
      >
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column
          prop="id"
          label="id"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="75"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="力扣username"
          width="175"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="realname"
          label="昵称"
          width="175"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="canlendar"
          label="日历"
          align="center"
          width="300"
        >
          <template #default="scope">
            <LeetCodeCanlendar
              :canlandarData="scope.row.canlendar"
            ></LeetCodeCanlendar>
          </template>
        </el-table-column>
        <el-table-column
          prop="recentAcSubmissions"
          label="最近提交"
          align="center"
        >
          <template #default="scope">
            <LeetCodeRecentAcSubmission
              :recentAcSubmissions="scope.row.recentAcSubmissions.slice(0, 5)"
            ></LeetCodeRecentAcSubmission>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template #default="scope">
            <el-button
              type="warning"
              size="small"
              :icon="View"
              @click="handleView(scope)"
            >
              查看
            </el-button>
            <el-button
              type="primary"
              size="small"
              :icon="Edit"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              :icon="Delete"
              @click="handleDelete(scope.$index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      :title="idEdit ? '编辑学生' : '新增学生'"
      v-model="visible"
      width="500px"
      destroy-on-close
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <!-- <TableEdit :data="rowData" :edit="idEdit" :update="updateData" /> -->
    </el-dialog>
    <el-dialog
      title="学生详情"
      v-model="visible1"
      width="700px"
      destroy-on-close
    >
      <!-- <TableDetail :data="rowData" /> -->
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from "vue";
import {
  ElMessageBox,
  ElDialog,
  ElPagination,
  ElTable,
  ElTableColumn,
  ElButton,
} from "element-plus";
import data from "../store/testData.json";
import LeetCodeCanlendar from "../components/DataShow/LeetCodeCanlendar.vue";
import { Delete, Edit, CirclePlusFilled, View } from "@element-plus/icons-vue";
import LeetCodeRecentAcSubmission from "../components/DataShow/LeetCodeRecentAcSubmission.vue";
console.log(data);

interface Calendar {
  [date: string]: number;
}

interface TableItem {
  id: number;
  name: string;
  username: string;
  realname: string;
  canlendar: Calendar;
  recentAcSubmissions: object;
}
const query = reactive({
  address: "",
  name: "",
  pageIndex: 1,
  pageSize: 10,
});
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(data.length);
// 获取表格数据
const getData = async () => {
  tableData.value = data.slice(
    0 + (query.pageIndex - 1) * query.pageSize,
    query.pageIndex * query.pageSize
  ) as unknown as TableItem[];
  console.log(tableData.value);
};
getData();

// 分页导航
const handlePageChange = (val: number) => {
  query.pageIndex = val;
  getData();
};

// 删除操作
const handleDelete = (index: number) => {
  console.log(index);
  // 二次确认删除
  ElMessageBox.confirm("确定要删除吗？", "提示", {
    type: "warning",
  })
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

const visible = ref(false);
let idx: number = -1;
const idEdit = ref(false);
const rowData = ref<TableItem[]>(data as unknown as TableItem[]);
const handleEdit = (index: number, row: TableItem[]) => {
  console.log(index, row);
  idx = index;
  rowData.value = row;
  idEdit.value = true;
  visible.value = true;
};
// const updateData = async (row: TableItem) => {
//   const formData = new FormData();
//   formData.append("username", String(row.username));
//   formData.append("name", row.name);
//   formData.append("realname", String(row.realname));
//   getData();
//   closeDialog();
// };

const closeDialog = () => {
  visible.value = false;
  idEdit.value = false;
};

const visible1 = ref(false);
const handleView = (scope: any) => {
  console.log(scope.row.name);
  rowData.value = scope.row;
  visible1.value = true;
};
</script>

<style scoped>
.search-box {
  margin-bottom: 20px;
}

.search-input {
  width: 200px;
}

.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
