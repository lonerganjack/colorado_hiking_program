// Real Colorado foothills hikes — ordered easy to hard
// Each hike has hand-authored segments based on actual trail profiles
// 16 hikes = one unique hike per warmup slot across 8 weeks

export const foothillsHikes = [
  {
    id: "flatirons-loop",
    name: "Flatirons Loop",
    location: "Boulder, CO",
    category: "foothills",
    distance: 2.0,
    elevationGain: 300,
    startElevation: 5600,
    summitElevation: 5900,
    difficulty: 1,
    description: "Easy loop along the base of Boulder's iconic Flatirons. Great starter hike.",
    segments: [
      { name: "Chautauqua Meadow", distanceMi: 0.5, elevationChangeFt: 50, terrain: "flat" },
      { name: "Flatirons Base Trail", distanceMi: 0.5, elevationChangeFt: 150, terrain: "moderate" },
      { name: "South Loop Climb", distanceMi: 0.3, elevationChangeFt: 100, terrain: "moderate" },
      { name: "Return Descent", distanceMi: 0.7, elevationChangeFt: -300, terrain: "descent" }
    ]
  },
  {
    id: "lair-o-the-bear",
    name: "Lair o' the Bear",
    location: "Idledale, CO",
    category: "foothills",
    distance: 2.5,
    elevationGain: 350,
    startElevation: 6500,
    summitElevation: 6850,
    difficulty: 2,
    description: "Easy creekside trail west of Denver through Bear Creek canyon. Great early-season warm-up.",
    segments: [
      { name: "Bear Creek Trail", distanceMi: 0.6, elevationChangeFt: 40, terrain: "flat" },
      { name: "Bruin Bluff Climb", distanceMi: 0.5, elevationChangeFt: 180, terrain: "moderate" },
      { name: "Castor Cutoff", distanceMi: 0.3, elevationChangeFt: 130, terrain: "moderate" },
      { name: "Creek Return", distanceMi: 1.1, elevationChangeFt: -350, terrain: "descent" }
    ]
  },
  {
    id: "deer-creek-canyon",
    name: "Deer Creek Canyon",
    location: "Southwest Denver Metro, CO",
    category: "foothills",
    distance: 2.9,
    elevationGain: 534,
    startElevation: 6100,
    summitElevation: 6634,
    difficulty: 3,
    description: "Meadowlark Trail loop through a scenic foothill canyon with creek access.",
    segments: [
      { name: "Creek Trail Start", distanceMi: 0.5, elevationChangeFt: 50, terrain: "flat" },
      { name: "Meadowlark Climb", distanceMi: 0.6, elevationChangeFt: 200, terrain: "moderate" },
      { name: "Ridge Section", distanceMi: 0.5, elevationChangeFt: 184, terrain: "steep" },
      { name: "Plymouth Creek Return", distanceMi: 0.5, elevationChangeFt: 100, terrain: "moderate" },
      { name: "Descent to Trailhead", distanceMi: 0.8, elevationChangeFt: -534, terrain: "descent" }
    ]
  },
  {
    id: "north-table-mountain",
    name: "North Table Mountain",
    location: "Golden, CO",
    category: "foothills",
    distance: 3.8,
    elevationGain: 650,
    startElevation: 5800,
    summitElevation: 6450,
    difficulty: 4,
    description: "Mesa loop above Golden with views of the Coors brewery and Clear Creek canyon.",
    segments: [
      { name: "North Table Loop Start", distanceMi: 0.5, elevationChangeFt: 50, terrain: "flat" },
      { name: "Mesa Rim Climb", distanceMi: 0.7, elevationChangeFt: 350, terrain: "steep" },
      { name: "Mesa Top Trail", distanceMi: 0.8, elevationChangeFt: 100, terrain: "flat" },
      { name: "Tilting Mesa Traverse", distanceMi: 0.5, elevationChangeFt: 150, terrain: "moderate" },
      { name: "Descent to Trailhead", distanceMi: 1.3, elevationChangeFt: -650, terrain: "descent" }
    ]
  },
  {
    id: "lookout-mountain",
    name: "Lookout Mountain",
    location: "Golden, CO",
    category: "foothills",
    distance: 4.5,
    elevationGain: 790,
    startElevation: 7200,
    summitElevation: 7990,
    difficulty: 5,
    description: "Climb from Windy Saddle Park to the summit near Buffalo Bill Museum with Denver views.",
    segments: [
      { name: "Windy Saddle Start", distanceMi: 0.5, elevationChangeFt: 80, terrain: "flat" },
      { name: "Beaver Brook Climb", distanceMi: 0.8, elevationChangeFt: 250, terrain: "moderate" },
      { name: "Upper Switchbacks", distanceMi: 0.5, elevationChangeFt: 260, terrain: "steep" },
      { name: "Summit Approach", distanceMi: 0.4, elevationChangeFt: 200, terrain: "steep" },
      { name: "Descent", distanceMi: 2.3, elevationChangeFt: -790, terrain: "descent" }
    ]
  },
  {
    id: "matthews-winters",
    name: "Matthews/Winters Park",
    location: "Morrison, CO",
    category: "foothills",
    distance: 3.5,
    elevationGain: 700,
    startElevation: 6000,
    summitElevation: 6700,
    difficulty: 6,
    description: "Red Rocks hogback trail with Dakota Ridge views. Popular Front Range training loop.",
    segments: [
      { name: "Village Walk Start", distanceMi: 0.4, elevationChangeFt: 60, terrain: "flat" },
      { name: "Red Rocks Trail Climb", distanceMi: 0.7, elevationChangeFt: 300, terrain: "steep" },
      { name: "Dakota Ridge", distanceMi: 0.6, elevationChangeFt: 200, terrain: "moderate" },
      { name: "Morrison Slide Section", distanceMi: 0.4, elevationChangeFt: 140, terrain: "moderate" },
      { name: "Descent", distanceMi: 1.4, elevationChangeFt: -700, terrain: "descent" }
    ]
  },
  {
    id: "green-mountain",
    name: "Green Mountain",
    location: "Boulder, CO",
    category: "foothills",
    distance: 4.0,
    elevationGain: 800,
    startElevation: 6200,
    summitElevation: 8148,
    difficulty: 7,
    description: "Boulder's accessible summit with panoramic views of the Indian Peaks and Continental Divide.",
    segments: [
      { name: "Gregory Canyon Start", distanceMi: 0.4, elevationChangeFt: 80, terrain: "flat" },
      { name: "Ranger Trail Climb", distanceMi: 0.7, elevationChangeFt: 250, terrain: "moderate" },
      { name: "E.M. Greenman Trail", distanceMi: 0.5, elevationChangeFt: 270, terrain: "steep" },
      { name: "Summit Push", distanceMi: 0.4, elevationChangeFt: 200, terrain: "steep" },
      { name: "Descent via Saddle Rock", distanceMi: 2.0, elevationChangeFt: -800, terrain: "descent" }
    ]
  },
  {
    id: "flatirons-first-second",
    name: "First & Second Flatiron",
    location: "Boulder, CO",
    category: "foothills",
    distance: 3.0,
    elevationGain: 600,
    startElevation: 5700,
    summitElevation: 7100,
    difficulty: 8,
    description: "Trail to the base of the First and Second Flatirons with rock scrambling sections.",
    segments: [
      { name: "Chautauqua to Bluebell", distanceMi: 0.5, elevationChangeFt: 80, terrain: "flat" },
      { name: "First Flatiron Trail", distanceMi: 0.5, elevationChangeFt: 200, terrain: "steep" },
      { name: "Scramble Section", distanceMi: 0.3, elevationChangeFt: 200, terrain: "very_steep" },
      { name: "Traverse to Second", distanceMi: 0.3, elevationChangeFt: 120, terrain: "moderate" },
      { name: "Descent", distanceMi: 1.4, elevationChangeFt: -600, terrain: "descent" }
    ]
  },
  {
    id: "mount-falcon",
    name: "Mount Falcon",
    location: "Morrison, CO",
    category: "foothills",
    distance: 3.7,
    elevationGain: 900,
    startElevation: 6800,
    summitElevation: 7700,
    difficulty: 9,
    description: "Loop past historic Walker Home ruins with sweeping views of Denver and Red Rocks.",
    segments: [
      { name: "East Trailhead Start", distanceMi: 0.4, elevationChangeFt: 60, terrain: "flat" },
      { name: "Castle Trail Climb", distanceMi: 0.7, elevationChangeFt: 350, terrain: "steep" },
      { name: "Walker Home Ridge", distanceMi: 0.5, elevationChangeFt: 250, terrain: "moderate" },
      { name: "Summit Loop", distanceMi: 0.4, elevationChangeFt: 240, terrain: "steep" },
      { name: "Descent via Meadow", distanceMi: 1.7, elevationChangeFt: -900, terrain: "descent" }
    ]
  },
  {
    id: "royal-arch",
    name: "Royal Arch Trail",
    location: "Boulder, CO",
    category: "foothills",
    distance: 3.0,
    elevationGain: 700,
    startElevation: 5700,
    summitElevation: 6400,
    difficulty: 10,
    description: "Strenuous trail to a natural stone arch with views of Indian Peaks.",
    segments: [
      { name: "Chautauqua Trail", distanceMi: 0.4, elevationChangeFt: 50, terrain: "flat" },
      { name: "Bluebell-Baird Climb", distanceMi: 0.5, elevationChangeFt: 200, terrain: "moderate" },
      { name: "Sentinel Pass Scramble", distanceMi: 0.4, elevationChangeFt: 300, terrain: "very_steep" },
      { name: "Arch Approach", distanceMi: 0.2, elevationChangeFt: 150, terrain: "steep" },
      { name: "Descent", distanceMi: 1.5, elevationChangeFt: -700, terrain: "descent" }
    ]
  },
  {
    id: "red-rocks-trail",
    name: "Red Rocks Trail Loop",
    location: "Morrison, CO",
    category: "foothills",
    distance: 6.0,
    elevationGain: 1300,
    startElevation: 6280,
    summitElevation: 7580,
    difficulty: 11,
    description: "Long loop through spectacular red rock formations near the famous amphitheatre.",
    segments: [
      { name: "Trading Post Start", distanceMi: 0.8, elevationChangeFt: 100, terrain: "flat" },
      { name: "Red Rocks Trail Climb", distanceMi: 1.0, elevationChangeFt: 400, terrain: "moderate" },
      { name: "Morrison Slide", distanceMi: 0.7, elevationChangeFt: 350, terrain: "steep" },
      { name: "Upper Ridge", distanceMi: 0.5, elevationChangeFt: 250, terrain: "steep" },
      { name: "Dakota Ridge", distanceMi: 0.8, elevationChangeFt: 200, terrain: "moderate" },
      { name: "Descent", distanceMi: 2.2, elevationChangeFt: -1300, terrain: "descent" }
    ]
  },
  {
    id: "mount-sanitas",
    name: "Mount Sanitas",
    location: "Boulder, CO",
    category: "foothills",
    distance: 3.17,
    elevationGain: 1257,
    startElevation: 5700,
    summitElevation: 6957,
    difficulty: 12,
    description: "Boulder's classic steep training hike — sharp elevation gain in a short distance.",
    segments: [
      { name: "Trailhead Approach", distanceMi: 0.3, elevationChangeFt: 50, terrain: "flat" },
      { name: "East Ridge Climb", distanceMi: 0.7, elevationChangeFt: 500, terrain: "very_steep" },
      { name: "Summit Push", distanceMi: 0.5, elevationChangeFt: 400, terrain: "very_steep" },
      { name: "Sanitas Valley Trail", distanceMi: 0.6, elevationChangeFt: 307, terrain: "steep" },
      { name: "Valley Return", distanceMi: 1.07, elevationChangeFt: -1257, terrain: "descent" }
    ]
  },
  {
    id: "south-boulder-peak",
    name: "South Boulder Peak",
    location: "Boulder, CO",
    category: "foothills",
    distance: 5.5,
    elevationGain: 1800,
    startElevation: 6100,
    summitElevation: 8549,
    difficulty: 13,
    description: "Highest point in Boulder's mountain parks. Sustained climb with Front Range panorama from summit.",
    segments: [
      { name: "Mesa Trail Start", distanceMi: 0.8, elevationChangeFt: 150, terrain: "flat" },
      { name: "Shadow Canyon Approach", distanceMi: 0.6, elevationChangeFt: 300, terrain: "moderate" },
      { name: "Shadow Canyon Climb", distanceMi: 0.7, elevationChangeFt: 600, terrain: "very_steep" },
      { name: "South Boulder Ridge", distanceMi: 0.5, elevationChangeFt: 400, terrain: "steep" },
      { name: "Summit Push", distanceMi: 0.3, elevationChangeFt: 350, terrain: "very_steep" },
      { name: "Descent via Homestead", distanceMi: 2.6, elevationChangeFt: -1800, terrain: "descent" }
    ]
  },
  {
    id: "bear-peak",
    name: "Bear Peak",
    location: "Boulder, CO",
    category: "foothills",
    distance: 5.0,
    elevationGain: 1600,
    startElevation: 5700,
    summitElevation: 8461,
    difficulty: 14,
    description: "Boulder's toughest standard foothills hike. Steep scrambling to a dramatic summit with 360-degree views.",
    segments: [
      { name: "NCAR Trail Start", distanceMi: 0.7, elevationChangeFt: 100, terrain: "flat" },
      { name: "Bear Canyon Climb", distanceMi: 0.8, elevationChangeFt: 450, terrain: "steep" },
      { name: "Upper Bear Canyon", distanceMi: 0.5, elevationChangeFt: 400, terrain: "very_steep" },
      { name: "West Ridge Scramble", distanceMi: 0.4, elevationChangeFt: 400, terrain: "very_steep" },
      { name: "Summit Block", distanceMi: 0.2, elevationChangeFt: 250, terrain: "very_steep" },
      { name: "Descent via Fern Canyon", distanceMi: 2.4, elevationChangeFt: -1600, terrain: "descent" }
    ]
  },
  {
    id: "horsetooth-rock",
    name: "Horsetooth Rock",
    location: "Fort Collins, CO",
    category: "foothills",
    distance: 5.0,
    elevationGain: 1500,
    startElevation: 5800,
    summitElevation: 7259,
    difficulty: 15,
    description: "Fort Collins classic with steady switchbacks, two summits, and scrambling near the top.",
    segments: [
      { name: "Soderberg Trail Start", distanceMi: 0.6, elevationChangeFt: 100, terrain: "flat" },
      { name: "Lower Switchbacks", distanceMi: 0.8, elevationChangeFt: 350, terrain: "moderate" },
      { name: "Spring Creek Climb", distanceMi: 0.7, elevationChangeFt: 400, terrain: "steep" },
      { name: "Horsetooth Falls Junction", distanceMi: 0.4, elevationChangeFt: 250, terrain: "steep" },
      { name: "Summit Scramble", distanceMi: 0.3, elevationChangeFt: 300, terrain: "very_steep" },
      { name: "Rock Traverse", distanceMi: 0.2, elevationChangeFt: 100, terrain: "moderate" },
      { name: "Descent", distanceMi: 2.0, elevationChangeFt: -1500, terrain: "descent" }
    ]
  },
  {
    id: "eldorado-canyon",
    name: "Eldorado Canyon State Park",
    location: "Eldorado Springs, CO",
    category: "foothills",
    distance: 5.2,
    elevationGain: 1700,
    startElevation: 6000,
    summitElevation: 7700,
    difficulty: 16,
    description: "Rattlesnake Gulch to Continental Divide overlook. The ultimate Front Range foothills challenge.",
    segments: [
      { name: "Fowler Trail Start", distanceMi: 0.5, elevationChangeFt: 80, terrain: "flat" },
      { name: "Rattlesnake Gulch Climb", distanceMi: 0.8, elevationChangeFt: 500, terrain: "steep" },
      { name: "Crags Hotel Ruins", distanceMi: 0.5, elevationChangeFt: 300, terrain: "moderate" },
      { name: "Continental Divide View", distanceMi: 0.6, elevationChangeFt: 500, terrain: "very_steep" },
      { name: "Eldorado Summit Push", distanceMi: 0.3, elevationChangeFt: 320, terrain: "very_steep" },
      { name: "Descent via Gulch", distanceMi: 2.5, elevationChangeFt: -1700, terrain: "descent" }
    ]
  }
];
