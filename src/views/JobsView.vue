<script setup lang="ts">
import JobItem from '../components/JobItem.vue'

// Define types
type Task = { taskId : string, taskName: string }
type Job = { jobId : string, tasks: Task[]}

// Define props
const props = defineProps<{ jobs: Job[] }>();

</script>
<template>
  <div class="jobs">
    <h1>JOBS</h1>
    <span >
      
    </span>
    <div class="container">
      <div class="row">
        <div v-for="job in props.jobs" :key="job.jobId" class="col-4">
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

.col-4
{
  min-height: 100%;
  background-color: white;
  margin: 1.11%;
  width: 31.11%;
}
</style>
