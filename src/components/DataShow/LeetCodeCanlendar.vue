<template>
  <div class="block-list">
    <div
      class="block-item"
      v-for="{ data } in resultArray"
      :class="{
        white: !data,
        lightGreen20: data === 1,
        lightGreen40: 2 <= data && data <= 5,
        lightGreen60: 6 <= data && data <= 10,
        lightGreen80: 11 <= data,
      }"
    >
      {{ data }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from "vue";

const props = defineProps(["canlandarData"]);
// let canlandarData = props.canlandarData;

const sevenDaysAgoTimestampValue = (() => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 7);
  currentDate.setHours(8, 0, 0, 0);
  return Math.floor(currentDate.getTime() / 1000);
})();

const filteredData = ref({});
const resultArray = ref([]);

function filterTimeData() {
  for (const timestampString in props.canlandarData) {
    const timestamp = parseInt(timestampString);
    if (timestamp >= sevenDaysAgoTimestampValue) {
      filteredData.value[timestamp] = props.canlandarData[timestampString];
    }
  }
}

function getResultArray() {
  resultArray.value = Array.from({ length: 7 }, (_, index) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 6 + index);
    currentDate.setHours(8, 0, 0, 0);
    const timestamp = Math.floor(currentDate.getTime() / 1000);
    return { timestamp, data: filteredData.value[timestamp] || null };
  });
}
filterTimeData();
getResultArray();
watch(props, () => {
  // 这里可以执行一些逻辑
  // 也可以直接强制重新渲染当前组件
  filteredData.value = {};
  resultArray.value = [];
  filterTimeData();
  getResultArray();
});
</script>

<style lang="scss" scope>
:root {
  --opacity-black-20: #0000000a;
  --light-green-20: #aff0b4;
  --light-green-40: #4dd161;
  --light-green-60: #01b328;
  --light-green-80: #008024;
}
.block-list {
  display: flex;
  justify-content: space-evenly;

  .block-item {
    margin: 2px;
    width: 20px;
    height: 20px;
    color: rgb(91, 149, 153);
    border-radius: 5px;
  }
  .white {
    background-color: var(--opacity-black-20);
  }
  .lightGreen20 {
    background-color: var(--light-green-20);
  }
  .lightGreen40 {
    background-color: var(--light-green-40);
  }
  .lightGreen60 {
    background-color: var(--light-green-60);
  }
  .lightGreen80 {
    background-color: var(--light-green-80);
  }
}
</style>
