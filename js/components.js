// UI rendering functions for schedule, workout detail, and library views

import { formatDuration } from './converter.js';
import { isCompleted, toggleCompletion, isSegmentCompleted, toggleSegmentCompletion } from './completion.js';

export function renderScheduleView(schedule, currentWeek, onWorkoutClick) {
  const container = document.createElement('div');
  container.className = 'schedule-view';

  let lastPhase = null;

  for (const week of schedule) {
    // Phase header when phase changes
    if (week.phase !== lastPhase) {
      lastPhase = week.phase;
      const header = document.createElement('div');
      header.className = 'phase-header';
      header.innerHTML = `<span class="phase-badge ${week.phase}">${week.phaseLabel}</span>`;
      container.appendChild(header);
    }

    const card = document.createElement('div');
    card.className = `week-card ${week.phase}`;
    if (week.weekNumber === currentWeek) {
      card.classList.add('current');
    }

    const label = document.createElement('div');
    label.className = 'week-label';
    label.textContent = `Week ${week.weekNumber}`;
    if (week.weekNumber === currentWeek) {
      label.innerHTML += '<span class="current-badge">This Week</span>';
    }

    const dateEl = document.createElement('div');
    dateEl.className = 'week-date';
    dateEl.textContent = week.dateRange;

    const workoutsEl = document.createElement('div');
    workoutsEl.className = 'week-workouts';

    for (const w of week.workouts) {
      const completed = isCompleted(week.weekNumber, w.day);
      const row = document.createElement('div');
      row.className = 'workout-row' + (completed ? ' completed' : '');
      row.addEventListener('click', () => onWorkoutClick(w.workout, week.weekNumber, w.day));

      const dayAbbrMap = { Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Saturday: 'Sat', Sunday: 'Sun' };
      const dayAbbr = dayAbbrMap[w.day] || w.day.slice(0, 3);

      row.innerHTML = `
        <span class="completion-check">${completed ? '&#10003;' : ''}</span>
        <span class="workout-day">${dayAbbr}</span>
        <span class="workout-name">${w.workout.hikeName}</span>
        <span class="workout-meta">
          ${formatDuration(w.workout.totalDurationMin)}
          ${w.note ? `<br><span class="workout-note">${w.note}</span>` : ''}
        </span>
        <span class="chevron">&#8250;</span>
      `;

      workoutsEl.appendChild(row);
    }

    card.appendChild(label);
    card.appendChild(dateEl);
    card.appendChild(workoutsEl);
    container.appendChild(card);
  }

  return container;
}

export function renderWorkoutDetail(workout, onBack, weekNumber, day) {
  const container = document.createElement('div');
  container.className = 'detail-view';

  // Back button
  const backBtn = document.createElement('button');
  backBtn.className = 'detail-back';
  backBtn.innerHTML = '&#8249; Back';
  backBtn.addEventListener('click', onBack);
  container.appendChild(backBtn);

  // Header
  const header = document.createElement('div');
  header.className = 'detail-header';

  const categoryLabel = workout.hikeCategory === 'fourteener' ? '14er' : 'Foothills';
  header.innerHTML = `
    <div class="detail-hike-name">${workout.hikeName}</div>
    <div class="detail-location">${workout.hikeLocation} &middot; ${categoryLabel}${workout.class ? ` &middot; Class ${workout.class}` : ''}</div>
    <div class="detail-description">${workout.hikeDescription}</div>
  `;
  container.appendChild(header);

  // Completion toggle button (only when accessed from schedule with week/day context)
  if (weekNumber != null && day != null) {
    const completed = isCompleted(weekNumber, day);
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'completion-toggle' + (completed ? ' is-completed' : '');
    toggleBtn.innerHTML = completed
      ? '&#10003; Completed — tap to undo'
      : 'Mark as Completed';
    toggleBtn.addEventListener('click', () => {
      const nowCompleted = toggleCompletion(weekNumber, day);
      toggleBtn.className = 'completion-toggle' + (nowCompleted ? ' is-completed' : '');
      toggleBtn.innerHTML = nowCompleted
        ? '&#10003; Completed — tap to undo'
        : 'Mark as Completed';
    });
    container.appendChild(toggleBtn);
  }

  // Stats bar
  const stats = document.createElement('div');
  stats.className = 'detail-stats';
  stats.innerHTML = `
    <div class="stat-box">
      <div class="stat-value">${formatDuration(workout.totalDurationMin)}</div>
      <div class="stat-label">Duration</div>
    </div>
    <div class="stat-box">
      <div class="stat-value">${workout.originalDistance}</div>
      <div class="stat-label">Miles</div>
    </div>
    <div class="stat-box">
      <div class="stat-value">${workout.originalElevationGain.toLocaleString()}'</div>
      <div class="stat-label">Elev Gain</div>
    </div>
    <div class="stat-box">
      <div class="stat-value">${workout.originalSummitElevation ? workout.originalSummitElevation.toLocaleString() + "'" : '-'}</div>
      <div class="stat-label">Summit</div>
    </div>
  `;
  container.appendChild(stats);

  // Elevation profile mini chart
  const profileSection = document.createElement('div');
  profileSection.className = 'elevation-profile';
  profileSection.innerHTML = '<div class="profile-label">Workout Profile</div>';

  const bars = document.createElement('div');
  bars.className = 'profile-bars';

  // Skip warmup and cooldown for the profile
  const hikeSegments = workout.segments.slice(1, -1);
  const maxIncline = Math.max(...hikeSegments.map(s => s.inclinePct), 1);

  for (const seg of hikeSegments) {
    const bar = document.createElement('div');
    bar.className = 'profile-bar';

    // Height based on incline (or flat minimum for descent)
    const heightPct = seg.inclinePct === 0
      ? 8
      : Math.max(10, (seg.inclinePct / maxIncline) * 100);
    bar.style.height = `${heightPct}%`;

    // Color class
    if (seg.inclinePct === 0) {
      bar.classList.add('descent');
    } else if (seg.inclinePct >= 12) {
      bar.classList.add('very-steep');
    } else if (seg.inclinePct >= 7) {
      bar.classList.add('steep');
    } else if (seg.inclinePct >= 3) {
      bar.classList.add('climb');
    } else {
      bar.classList.add('flat');
    }

    // Width proportional to duration
    bar.style.flexGrow = seg.durationMin;

    bar.title = `${seg.name}: ${seg.inclinePct}% @ ${seg.speedMph} mph`;
    bars.appendChild(bar);
  }

  profileSection.appendChild(bars);
  container.appendChild(profileSection);

  // Segment cards
  const segList = document.createElement('div');
  segList.className = 'segments-list';
  segList.innerHTML = '<div class="segments-heading">Treadmill Settings <span class="segments-hint">tap to mark done</span></div>';

  const canTrackSegments = weekNumber != null && day != null;

  workout.segments.forEach((seg, index) => {
    const segDone = canTrackSegments && isSegmentCompleted(workout.hikeId, weekNumber, day, index);
    const card = document.createElement('div');
    card.className = 'segment-card' + (segDone ? ' segment-done' : '');

    if (canTrackSegments) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const nowDone = toggleSegmentCompletion(workout.hikeId, weekNumber, day, index);
        card.classList.toggle('segment-done', nowDone);
      });
    }

    card.innerHTML = `
      <div class="segment-name">${seg.name}</div>
      <div class="segment-notes">${seg.notes}</div>
      <div class="segment-settings">
        <div class="setting">
          <div class="setting-value speed">${seg.speedMph}</div>
          <div class="setting-unit">mph</div>
        </div>
        <div class="setting">
          <div class="setting-value incline">${seg.inclinePct}%</div>
          <div class="setting-unit">incline</div>
        </div>
        <div class="setting">
          <div class="setting-value time">${seg.durationMin}</div>
          <div class="setting-unit">min</div>
        </div>
      </div>
    `;
    segList.appendChild(card);
  });

  container.appendChild(segList);
  return container;
}

export function renderLibraryView(foothillsWorkouts, fourteenerWorkouts, onWorkoutClick) {
  const container = document.createElement('div');
  container.className = 'library-view';

  function difficultyClass(d, category) {
    if (category === 'fourteener') {
      if (d <= 3) return 'easy';
      if (d <= 7) return 'moderate';
      return 'hard';
    }
    if (d <= 3) return 'easy';
    if (d <= 6) return 'moderate';
    return 'hard';
  }

  function renderSection(title, workouts) {
    const heading = document.createElement('div');
    heading.className = 'library-section-title';
    heading.textContent = title;
    container.appendChild(heading);

    for (const w of workouts) {
      const card = document.createElement('div');
      card.className = 'hike-card';
      card.addEventListener('click', () => onWorkoutClick(w));

      const dc = difficultyClass(w.difficulty, w.hikeCategory);
      card.innerHTML = `
        <div class="hike-info">
          <div class="hike-name">${w.hikeName}</div>
          <div class="hike-location-text">${w.hikeLocation}</div>
          <div class="hike-stats-row">
            <span class="hike-stat"><strong>${w.originalDistance}</strong> mi</span>
            <span class="hike-stat"><strong>${w.originalElevationGain.toLocaleString()}'</strong> gain</span>
            <span class="hike-stat"><strong>${formatDuration(w.totalDurationMin)}</strong></span>
            ${w.class ? `<span class="hike-stat">Class <strong>${w.class}</strong></span>` : ''}
          </div>
        </div>
        <div class="difficulty-badge ${dc}">${w.difficulty}</div>
        <span class="chevron">&#8250;</span>
      `;
      container.appendChild(card);
    }
  }

  renderSection('Foothills Warm-Ups', foothillsWorkouts);
  renderSection('14er Workouts', fourteenerWorkouts);

  return container;
}
