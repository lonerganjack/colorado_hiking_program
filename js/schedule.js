// Generates the full training schedule: April-May warmups → June+ 14er season
// Based on the user's real Colorado hiking routine

import { foothillsHikes } from './data/foothills.js';
import { fourteenerHikes } from './data/fourteeners.js';
import { convertHikeToTreadmill } from './converter.js';

function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

function formatDateFull(date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}

export function generateSchedule(year) {
  year = year || new Date().getFullYear();
  const schedule = [];

  // Sort hikes by difficulty
  const foothills = [...foothillsHikes].sort((a, b) => a.difficulty - b.difficulty);
  const fourteeners = [...fourteenerHikes].sort((a, b) => a.difficulty - b.difficulty);

  // Phase 1: Warmup — Weeks 1-8 (April 1 through late May)
  // 2 workouts per week: Tuesday + Thursday
  const warmupStart = new Date(year, 3, 1); // April 1
  const weekOneMonday = getMonday(warmupStart);

  // Assign foothills across 8 weeks (16 slots), no back-to-back repeats
  // With 16 hikes sorted by difficulty, assign sequentially — one per slot
  const warmupSlots = [];
  for (let w = 0; w < 8; w++) {
    const idx1 = w * 2;
    const idx2 = w * 2 + 1;
    warmupSlots.push({
      week: w,
      hike1: foothills[Math.min(idx1, foothills.length - 1)],
      hike2: foothills[Math.min(idx2, foothills.length - 1)]
    });
  }

  for (let w = 0; w < 8; w++) {
    const weekStart = addDays(weekOneMonday, w * 7);
    const weekEnd = addDays(weekStart, 6);
    const tuesday = addDays(weekStart, 1);
    const thursday = addDays(weekStart, 3);

    const pair = warmupSlots[w];

    schedule.push({
      weekNumber: w + 1,
      phase: "warmup",
      phaseLabel: "Warmup",
      dateRange: `${formatDate(weekStart)} - ${formatDate(weekEnd)}`,
      workouts: [
        {
          day: "Tuesday",
          date: formatDateFull(tuesday),
          workout: convertHikeToTreadmill(pair.hike1),
          isRest: false
        },
        {
          day: "Thursday",
          date: formatDateFull(thursday),
          workout: convertHikeToTreadmill(pair.hike2),
          isRest: false
        }
      ]
    });
  }

  // Phase 2: Transition — Week 9
  const transitionWeekStart = addDays(weekOneMonday, 8 * 7);
  const transitionWeekEnd = addDays(transitionWeekStart, 6);
  const transTue = addDays(transitionWeekStart, 1);
  const transSat = addDays(transitionWeekStart, 5);

  schedule.push({
    weekNumber: 9,
    phase: "transition",
    phaseLabel: "Transition",
    dateRange: `${formatDate(transitionWeekStart)} - ${formatDate(transitionWeekEnd)}`,
    workouts: [
      {
        day: "Tuesday",
        date: formatDateFull(transTue),
        workout: convertHikeToTreadmill(foothills[foothills.length - 3]), // hard foothills (not same as week 8)
        isRest: false
      },
      {
        day: "Saturday",
        date: formatDateFull(transSat),
        workout: convertHikeToTreadmill(fourteeners[0]), // easiest 14er preview
        isRest: false
      }
    ]
  });

  // Phase 3: 14er Season — Weeks 10-19 (June onward)
  // 1 major 14er on Saturday + 1 maintenance foothills on Wednesday
  // Rotate through moderate-to-hard foothills for maintenance, no back-to-back repeats
  const midHikes = foothills.slice(4); // moderate and up
  const maintenanceHikes = [];
  for (let i = 0; i < 10; i++) {
    maintenanceHikes.push(midHikes[i % midHikes.length]);
  }

  for (let w = 0; w < 10; w++) {
    const weekStart = addDays(weekOneMonday, (9 + w) * 7);
    const weekEnd = addDays(weekStart, 6);
    const wednesday = addDays(weekStart, 2);
    const saturday = addDays(weekStart, 5);

    const fourteener = fourteeners[Math.min(w, fourteeners.length - 1)];
    const maintenance = maintenanceHikes[Math.min(w, maintenanceHikes.length - 1)];

    schedule.push({
      weekNumber: 10 + w,
      phase: "fourteener",
      phaseLabel: "14er Season",
      dateRange: `${formatDate(weekStart)} - ${formatDate(weekEnd)}`,
      workouts: [
        {
          day: "Wednesday",
          date: formatDateFull(wednesday),
          workout: convertHikeToTreadmill(maintenance),
          isRest: false,
          note: "Maintenance"
        },
        {
          day: "Saturday",
          date: formatDateFull(saturday),
          workout: convertHikeToTreadmill(fourteener),
          isRest: false,
          note: "Main 14er workout"
        }
      ]
    });
  }

  return schedule;
}

export function getCurrentWeekNumber(schedule) {
  const now = new Date();
  for (const week of schedule) {
    // Parse the date range to find current week
    for (const w of week.workouts) {
      const dateParts = w.date.split(", ")[1]; // "Apr 1"
      if (!dateParts) continue;
    }
  }
  // Simpler: compare week numbers by date
  const year = now.getFullYear();
  const april1 = new Date(year, 3, 1);
  const weeksSinceApril1 = Math.floor((now - getMonday(april1)) / (7 * 24 * 60 * 60 * 1000));
  return Math.max(1, Math.min(19, weeksSinceApril1 + 1));
}
