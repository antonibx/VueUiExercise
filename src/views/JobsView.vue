<script setup lang="ts">
import JobItem from '../components/JobItem.vue'
import { ref } from 'vue'

// Define types
type Task = { taskId : string, taskName: string }
type Job = { jobId : string, tasks: Task[]}

// Define props
const props = defineProps<{ jobs: Job[] }>();
const hovered = ref<string>('');

</script>
<template>
  <div class="jobs">
    <h1>JOBS</h1>
    <span >
      
    </span>
    <div class="container">
      <div class="row">
        <div
          v-for="job in props.jobs" :key="job.jobId"
          class="col-3" :class="{'hover': hovered == job.jobId}"
          @mouseover="hovered = job.jobId" @mouseout="hovered = ''"
        >
          <JobItem :job="job" />
        <br>
      </div>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

h1 {
  text-align: center;
  min-width: 100px;
  color: hsla(160, 100%, 37%, 1);
  margin-left: -.7rem;
}

.col-3 {
  min-height: 100%;
  background-color: white;
  margin: 1%;
  width: 23%;
}

.hover {
  background-color: hsla(160, 100%, 37%, 1)!important;
}
</style>
