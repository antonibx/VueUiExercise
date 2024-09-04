import { describe, it, expect } from 'vitest';

// Define types
type Task = { taskId : string, taskName: string }
type Job = { jobId : string, tasks: Task[]}

// Testing the main method that is generateSchedule in ScheduleView
const generateSchedule = (jobs: Job[]): Record<string, string[]> => {
  const schedule: Record<string, string[]> = {};
  const machineTurn: Record<string, number> = {};
  const jobTurn: Record<string, number> = {};

    jobs.forEach(job => {
        if (jobTurn[job.jobId] === undefined) {
            jobTurn[job.jobId] = 0;
        }

        job.tasks.forEach(task => {
            if (!schedule[task.taskName]) {
                schedule[task.taskName] = [];
            }

            if (machineTurn[task.taskName] === undefined) {
                machineTurn[task.taskName] = 0;
            }

            const taskTurn = Math.max(machineTurn[task.taskName], jobTurn[job.jobId]);
            schedule[task.taskName][taskTurn] = task.taskId;

            machineTurn[task.taskName] = taskTurn + 1;
            jobTurn[job.jobId] = taskTurn + 1;
        });
    });

    return schedule;
};

// Tests
describe('generateSchedule', () => {
    it('assign tasks correctly to the machine and respect the sequential order of a job', () => {
        const jobs = [
            {
                jobId: "Job A",
                tasks: [
                    { taskId: "Task A-1", taskName: "Print" },
                    { taskId: "Task A-2", taskName: "Laminate" },
                ]
            },
            {
                jobId: "Job B",
                tasks: [
                    { taskId: "Task B-1", taskName: "Print" },
                    { taskId: "Task B-2", taskName: "Laminate" },
                ]
            }
        ];

        const expectedSchedule = {
            "Print": ["Task A-1", "Task B-1"],
            "Laminate": [undefined, "Task A-2", "Task B-2"]
        };

        expect(generateSchedule(jobs)).toEqual(expectedSchedule);
    });

    it('maintaining the sequence of tasks in a job when sharing the same machine', () => {
        const jobs = [
            {
                jobId: "Job A",
                tasks: [
                    { taskId: "Task A-1", taskName: "Print" },
                    { taskId: "Task A-2", taskName: "Print" },  // Same machine
                ]
            },
            {
                jobId: "Job B",
                tasks: [
                    { taskId: "Task B-1", taskName: "Laminate" },
                    { taskId: "Task B-2", taskName: "Laminate" },  // Same màquina
                ]
            }
        ];

        const expectedSchedule = {
            "Print": ["Task A-1", "Task A-2"],
            "Laminate": ["Task B-1", "Task B-2"]
        };

        expect(generateSchedule(jobs)).toEqual(expectedSchedule);
    });

    it('generates correct planning for various jobs and machines', () => {
        const jobs = [
            {
                jobId: "Job A",
                tasks: [
                    { taskId: "Task A-1", taskName: "Print" },
                    { taskId: "Task A-2", taskName: "Laminate" },
                    { taskId: "Task A-3", taskName: "Trim" },
                ]
            },
            {
                jobId: "Job B",
                tasks: [
                    { taskId: "Task B-1", taskName: "Print" },
                    { taskId: "Task B-2", taskName: "Laminate" },
                    { taskId: "Task B-3", taskName: "Trim" },
                ]
            }
        ];

        const expectedSchedule = {
            "Print":    ["Task A-1", "Task B-1"],
            "Laminate": [undefined, "Task A-2", "Task B-2"],
            "Trim":     [undefined, undefined, "Task A-3", "Task B-3"]
        };

        expect(generateSchedule(jobs)).toEqual(expectedSchedule);
    });
});