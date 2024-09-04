<script setup lang="ts">
import TaskItem from './TaskItem.vue'
import PrintIcon from './icons/Print.vue'
import LaminateIcon from './icons/Laminate.vue'
import TrimIcon from './icons/Trim.vue'
import BindIcon from './icons/Bind.vue'
import StampIcon from './icons/Stamp.vue'

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
  background-color: white;
  color: black;
  padding: 2rem;
}
</style>