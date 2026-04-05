// Converts hike elevation/distance data into treadmill workout settings
// Uses grade calculations and hiking pace models to set realistic speed/incline

const SPEED_TABLE = {
  flat:       3.5,  // 0-3% grade
  moderate:   3.0,  // 3-7% grade
  steep:      2.5,  // 7-12% grade
  very_steep: 2.0,  // 12-15% grade
  descent:    3.8   // downhill simulated at 0% incline
};

const MAX_INCLINE = 15.0;
const MIN_INCLINE = 0.0;

function roundToHalf(n) {
  return Math.round(n * 2) / 2;
}

function computeGrade(elevationChangeFt, distanceMi) {
  if (distanceMi <= 0) return 0;
  const horizontalFt = distanceMi * 5280;
  return (elevationChangeFt / horizontalFt) * 100;
}

function clampIncline(grade) {
  return Math.max(MIN_INCLINE, Math.min(MAX_INCLINE, grade));
}

function getBaseSpeed(terrain) {
  return SPEED_TABLE[terrain] || 3.0;
}

export function convertHikeToTreadmill(hike) {
  const isFourteener = hike.category === "fourteener";
  const totalSegments = hike.segments.length;

  const warmup = {
    name: "Warm Up",
    durationMin: 3,
    speedMph: 3.0,
    inclinePct: 0,
    distanceMi: 0.15,
    notes: "Easy pace to warm up"
  };

  const cooldown = {
    name: "Cool Down",
    durationMin: 3,
    speedMph: 2.5,
    inclinePct: 0,
    distanceMi: 0.13,
    notes: "Easy pace to cool down"
  };

  const convertedSegments = hike.segments.map((seg, index) => {
    const isDescending = seg.terrain === "descent" || seg.elevationChangeFt < 0;
    const grade = computeGrade(Math.abs(seg.elevationChangeFt), seg.distanceMi);

    let inclinePct, speedMph;

    if (isDescending) {
      inclinePct = 0;
      speedMph = SPEED_TABLE.descent;
    } else {
      inclinePct = clampIncline(grade);
      speedMph = getBaseSpeed(seg.terrain);
    }

    // Fatigue factor for 14ers: reduce speed 0-10% through the hike
    if (isFourteener && !isDescending) {
      const fatigueFactor = 1.0 - (index / totalSegments) * 0.10;
      speedMph *= fatigueFactor;
    }

    // Round to treadmill-friendly increments
    speedMph = roundToHalf(speedMph);
    inclinePct = roundToHalf(inclinePct);

    // Ensure minimum speed
    speedMph = Math.max(1.5, speedMph);

    const durationMin = Math.round((seg.distanceMi / speedMph) * 60);

    let notes = "";
    if (isDescending) {
      notes = "Flat pace — simulating descent";
    } else if (inclinePct >= 12) {
      notes = "Very steep — focus on short steps";
    } else if (inclinePct >= 7) {
      notes = "Steep sustained climb";
    } else if (inclinePct >= 3) {
      notes = "Moderate uphill grade";
    } else {
      notes = "Easy approach pace";
    }

    return {
      name: seg.name,
      durationMin: Math.max(1, durationMin),
      speedMph,
      inclinePct,
      distanceMi: seg.distanceMi,
      notes
    };
  });

  const allSegments = [warmup, ...convertedSegments, cooldown];
  const totalDurationMin = allSegments.reduce((sum, s) => sum + s.durationMin, 0);
  const totalDistanceMi = allSegments.reduce((sum, s) => sum + s.distanceMi, 0);

  return {
    hikeId: hike.id,
    hikeName: hike.name,
    hikeLocation: hike.location,
    hikeCategory: hike.category,
    hikeDescription: hike.description,
    originalDistance: hike.distance,
    originalElevationGain: hike.elevationGain,
    originalStartElevation: hike.startElevation,
    originalSummitElevation: hike.summitElevation,
    difficulty: hike.difficulty,
    class: hike.class || null,
    totalDurationMin,
    totalDistanceMi: Math.round(totalDistanceMi * 100) / 100,
    segments: allSegments
  };
}

export function formatDuration(minutes) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins}min`;
  return `${hrs}h ${mins}min`;
}
