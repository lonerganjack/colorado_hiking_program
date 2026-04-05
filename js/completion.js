// Tracks which scheduled workouts have been completed
// Uses localStorage for persistence
// Keys are "weekNumber-day" (e.g., "1-Tuesday") to track specific schedule slots

const STORAGE_KEY = 'trail-treadmill-completed';

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getCompletionKey(weekNumber, day) {
  return `${weekNumber}-${day}`;
}

export function isCompleted(weekNumber, day) {
  const data = load();
  return !!data[getCompletionKey(weekNumber, day)];
}

export function toggleCompletion(weekNumber, day) {
  const data = load();
  const key = getCompletionKey(weekNumber, day);
  if (data[key]) {
    delete data[key];
  } else {
    data[key] = Date.now();
  }
  save(data);
  return !!data[key];
}

export function getCompletedCount() {
  return Object.keys(load()).length;
}

// Segment-level completion tracking
const SEGMENTS_KEY = 'trail-treadmill-segments';

function loadSegments() {
  try {
    return JSON.parse(localStorage.getItem(SEGMENTS_KEY)) || {};
  } catch {
    return {};
  }
}

function saveSegments(data) {
  localStorage.setItem(SEGMENTS_KEY, JSON.stringify(data));
}

export function segmentKey(hikeId, weekNumber, day, segmentIndex) {
  return `${hikeId}-${weekNumber}-${day}-${segmentIndex}`;
}

export function isSegmentCompleted(hikeId, weekNumber, day, segmentIndex) {
  const data = loadSegments();
  return !!data[segmentKey(hikeId, weekNumber, day, segmentIndex)];
}

export function toggleSegmentCompletion(hikeId, weekNumber, day, segmentIndex) {
  const data = loadSegments();
  const key = segmentKey(hikeId, weekNumber, day, segmentIndex);
  if (data[key]) {
    delete data[key];
  } else {
    data[key] = Date.now();
  }
  saveSegments(data);
  return !!data[key];
}
