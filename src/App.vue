<script setup lang="ts">
import LayoutHeader from './components/layout/LayoutHeader.vue'
import { RouterView } from 'vue-router'
import { onMounted, ref } from 'vue';
import test from './data/jobs.json'
//import Axios from 'axios';

// Define types
type Task = { taskId : string, taskName: string }
type Job = { jobId : string, tasks: Task[]}

const jobs = ref<Job[]>([]);

onMounted(() =>
{
  jobs.value = test;
  // Should get JSON from a fetch call, but no url provided
  //Axios.get('api/jobs').then((res: Job[]) => jobs.value = res);
});

</script>

<template>
  <LayoutHeader />
  <RouterView :jobs="jobs" />
</template>
