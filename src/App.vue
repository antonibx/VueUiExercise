<script setup lang="ts">
import LayoutHeader from './components/layout/LayoutHeader.vue'
import { RouterView } from 'vue-router'
import { onMounted, ref } from 'vue';
import test from './data/jobs.json'

// Define types
type Task = { taskId : string, taskName: string }
type Job = { jobId : string, tasks: Task[]}

const jobs = ref<Job[]>([]);

onMounted(() =>
{
  // Get JSON with data ang generate Timetable
  jobs.value = test;
});

</script>

<template>
  <LayoutHeader />
  <RouterView :jobs="jobs" />
</template>
