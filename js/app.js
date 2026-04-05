// Main app — wires navigation, generates data, renders views

import { foothillsHikes } from './data/foothills.js';
import { fourteenerHikes } from './data/fourteeners.js';
import { convertHikeToTreadmill } from './converter.js';
import { generateSchedule, getCurrentWeekNumber } from './schedule.js';
import { renderScheduleView, renderWorkoutDetail, renderLibraryView } from './components.js';

// Generate all data on load
const schedule = generateSchedule(new Date().getFullYear());
const currentWeek = getCurrentWeekNumber(schedule);

const foothillsWorkouts = foothillsHikes
  .sort((a, b) => a.difficulty - b.difficulty)
  .map(convertHikeToTreadmill);

const fourteenerWorkouts = fourteenerHikes
  .sort((a, b) => a.difficulty - b.difficulty)
  .map(convertHikeToTreadmill);

// State
let currentView = 'schedule';
let viewHistory = [];

const content = document.getElementById('app-content');
const navBtns = document.querySelectorAll('.nav-btn');

// Navigation
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    if (view !== currentView || viewHistory.length > 0) {
      viewHistory = [];
      navigateTo(view);
    }
  });
});

function setActiveNav(view) {
  navBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });
}

function navigateTo(view, data) {
  currentView = view;
  content.innerHTML = '';

  if (view === 'schedule') {
    setActiveNav('schedule');
    const el = renderScheduleView(schedule, currentWeek, showWorkoutDetail);
    content.appendChild(el);

    // Auto-scroll to current week
    requestAnimationFrame(() => {
      const currentCard = content.querySelector('.week-card.current');
      if (currentCard) {
        currentCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  } else if (view === 'library') {
    setActiveNav('library');
    const el = renderLibraryView(foothillsWorkouts, fourteenerWorkouts, showWorkoutDetail);
    content.appendChild(el);
  } else if (view === 'detail') {
    // Keep the nav highlight on whichever tab we came from
    const el = renderWorkoutDetail(data.workout, goBack, data.weekNumber, data.day);
    content.appendChild(el);
    content.scrollTop = 0;
    window.scrollTo(0, 0);
  }
}

function showWorkoutDetail(workout, weekNumber, day) {
  viewHistory.push(currentView);
  navigateTo('detail', { workout, weekNumber, day });
}

function goBack() {
  const prev = viewHistory.pop() || 'schedule';
  navigateTo(prev);
}

// Initial render
navigateTo('schedule');
