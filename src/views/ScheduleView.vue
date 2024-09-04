<script setup lang="ts">

import { onMounted, reactive } from 'vue';
import JobItem from '../components/JobItem.vue'

// Define types
type Task = { taskId : string, taskName: string }
type Job = { jobId : string, tasks: Task[]}

// Define props
const props = defineProps<{ jobs: Job[] }>();

// Initialize reactive variables
const data = reactive({
  startTime: 8,
  schedule: {} as Record<string, any>,
  maxTurns: 0
});

// Method to generate the actual schedule
const generateSchedule = () =>
{
  // Initialize variables
  let schedule = {} as {[index: string]: string[]};
  let machineTurn = {} as {[index: string]: number};
  let jobTurn = {} as {[index: string]: number};

  // Iterate through jobs
  props.jobs.forEach(job => 
  {
    // Initialize job turn if new
    if (jobTurn[job.jobId] === undefined) jobTurn[job.jobId] = 0;
    // Iterate through tasks
    job.tasks.forEach(task =>
    {
      // Initialize machine and its turn (related to taskName) if new,
      if(!schedule[task.taskName]) schedule[task.taskName] = [];
      if(machineTurn[task.taskName] === undefined) machineTurn[task.taskName] = 0;

      // Set task turn (checking machine availibility and previous tasks status) and push to schedule
      let taskTurn = Math.max(machineTurn[task.taskName], jobTurn[job.jobId]);
      schedule[task.taskName][taskTurn] = task.taskId;

      // Update turns for job and machines
      machineTurn[task.taskName] = taskTurn + 1;
      jobTurn[job.jobId] = taskTurn + 1;
    });
  });
  data.schedule = schedule;
  data.maxTurns = Math.max(...Object.values(schedule).map(tasks => tasks.length));
}

// Generate Schedule
onMounted(() => generateSchedule());

</script>

<template>
  <main>
    <h1>SCHEDULE</h1>
    <div id="table-wrapper">
      <div id="table-scroll">
        <table>
          <thead>
            <tr class="no-bb">
              <th></th>
              <th v-for="(turn, index) in data.maxTurns" :key="index" class="time">{{ data.startTime + index }}:00</th>
            </tr>
          </thead>
          <tbody>
            <tr class="no-bb" v-for="(tasks, machine) in data.schedule" :key="machine">
              <td class="machine">{{ machine }}</td>
              <td v-for="(taskId, index) in data.maxTurns" :key="index">
                {{ tasks[index] || '' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<style scoped>
.machine {
  background: black;
  color: white;
  font-weight: bold;
}

.time {
  background: black;
  color: white;
  font-weight: bold;
  border-left: 2pt solid var(--vt-c-black);
}

.no-bb {
  border-bottom: 2pt solid var(--vt-c-black);
}

table {
  border-collapse: collapse;
  overflow: scroll;
  margin: auto;
}

td, th {
  text-align: center;
  min-width: 100px;
}

h1 {
  text-align: center;
  min-width: 100px;
  color: hsla(160, 100%, 37%, 1)
}

.bb {
  border-bottom: 1pt solid white;
}

#table-wrapper {
  position:relative;
}
#table-scroll {
  width:70vw;
  overflow:auto;  
  margin-top:80px;
  padding-bottom:80px;
}

#table-wrapper table thead th .text {
  position:absolute;   
  z-index:2;
  width:20px;
}
</style>