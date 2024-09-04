<script setup lang="ts">
import TaskItem from './TaskItem.vue'

const props = defineProps({job: Object});
</script>

<template>
  <div class="job">
    <h4>{{ props.job!.jobId }}</h4>
    <span v-for="task in props.job!.tasks" :key="task.taskId">
      <TaskItem :task="task" />
    </span>
</div>
</template>

<style scoped>
.job {
  color: black;
  padding: 2rem;
  text-align: center;
}
</style>