<template>
  <div class="recentSubmissionDiv">
    <p v-for="item in recentAcSubmissions" class="text-item">
      {{ item.question.questionFrontendId + item.question.translatedTitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

// interface question {
//   title: string;
//   translatedTitle: string;
//   titleSlug: string;
//   questionFrontendId: string;
// }

// interface recentAcSubmissionsData {
//   submissionId: number;
//   submitTime: number;
//   question: question;
// }

const { recentAcSubmissions } = defineProps(["recentAcSubmissions"]);
</script>

<style lang="scss">
.recentSubmissionDiv {
  text-align: left;
}
.text-item {
  color: black;
}
</style>
