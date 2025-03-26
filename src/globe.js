import ThreeGlobe from "three-globe";
import { WebGLRenderer, Scene } from "three";
import {
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  Color,
  Fog,
  // AxesHelper,
  // DirectionalLightHelper,
  // CameraHelper,
  PointLight,
  SphereGeometry,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createGlowMesh } from "three-glow-mesh";
import countries from "./globe_files/globe-data-min.json";
import travelHistory from "./globe_files/cleaned_flights.json";
import airportHistory from "./globe_files/cleaned_airports.json";
var renderer, camera, scene, controls;
let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
var Globe;
// Animation control variables
let animationFrameId = null;
let isPageVisible = true;

init();
initGlobe();
onWindowResize();
initVisibilityControl();
animate();

// SECTION Initializing core ThreeJS elements
function init() {
  // Initialize renderer
  renderer = new WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.outputEncoding = THREE.sRGBEncoding;
  document.body.appendChild(renderer.domElement);

  // Initialize scene, light
  scene = new Scene();
  scene.add(new AmbientLight(0xbbbbbb, 0.3));
  scene.background = new Color(0x121212);

  // Initialize camera, light
  camera = new PerspectiveCamera();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  var dLight = new DirectionalLight(0xffffff, 0.8);
  dLight.position.set(-800, 2000, 400);
  camera.add(dLight);

  var dLight1 = new DirectionalLight(0x7982f6, 1);
  dLight1.position.set(-200, 500, 200);
  camera.add(dLight1);

  var dLight2 = new PointLight(0x8566cc, 0.5);
  dLight2.position.set(-200, 500, 200);
  camera.add(dLight2);

  camera.position.z = 200;
  camera.position.x = 0;
  camera.position.y = 0;

  scene.add(camera);

  // Additional effects
  scene.fog = new Fog(0x535ef3, 400, 2000);

  // Helpers
  // const axesHelper = new AxesHelper(800);
  // scene.add(axesHelper);
  // var helper = new DirectionalLightHelper(dLight);
  // scene.add(helper);
  // var helperCamera = new CameraHelper(dLight.shadow.camera);
  // scene.add(helperCamera);

  // Initialize controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dynamicDampingFactor = 0.01;
  controls.enablePan = true;
  controls.minDistance = 200;
  controls.maxDistance = 500;
  controls.rotateSpeed = 0.6;
  controls.zoomSpeed = 1;
  controls.autoRotate = false;

  // controls.minPolarAngle = Math.PI / 3.5;

  window.addEventListener("resize", onWindowResize, false);
  document.addEventListener("mousemove", onMouseMove);
}

// Function to initialize page visibility control
function initVisibilityControl() {
  // Handle page visibility change
  document.addEventListener('visibilitychange', handleVisibilityChange, false);
  
  // Handle iframe visibility
  // This is needed when the globe is embedded in an iframe
  window.addEventListener('blur', pauseAnimation, false);
  window.addEventListener('focus', resumeAnimation, false);
  
  // If iframe parent page is using React Router or other SPA navigation
  // these listeners will help detect when the user navigates away
  window.addEventListener('pagehide', pauseAnimation, false);
  window.addEventListener('pageshow', resumeAnimation, false);
}

function handleVisibilityChange() {
  if (document.hidden) {
    pauseAnimation();
  } else {
    resumeAnimation();
  }
}

function pauseAnimation() {
  isPageVisible = false;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

function resumeAnimation() {
  if (!isPageVisible) {
    isPageVisible = true;
    animate();
  }
}

/**
 * Adjusts airport coordinates to prevent overlapping markers on the globe
 * @param {Array} airports - The array of airport objects
 * @param {Object} options - Configuration options
 * @returns {Array} - The array of airports with adjusted coordinates and no duplicates
 */
function adjustOverlappingAirports(airports, options = {}) {
  // Default options
  const defaults = {
    distanceThreshold: 1.0,  // Minimum distance in degrees to consider overlap
    adjustmentAmount: 0.3,   // How much to move an airport in degrees
    maxIterations: 8         // Maximum number of adjustment passes
  };
  
  const config = { ...defaults, ...options };
  
  // Make a deep copy of airports to avoid modifying the original
  const adjustedAirports = JSON.parse(JSON.stringify(airports));
  
  // Run multiple passes to handle cascading adjustments
  for (let iteration = 0; iteration < config.maxIterations; iteration++) {
    let adjustmentsMade = false;
    
    // For each pair of airports
    for (let i = 0; i < adjustedAirports.length; i++) {
      for (let j = i + 1; j < adjustedAirports.length; j++) {
        const airport1 = adjustedAirports[i];
        const airport2 = adjustedAirports[j];
        
        // Calculate Manhattan distance (sum of absolute differences)
        const latDiff = Math.abs(airport1.latitude - airport2.latitude);
        const lngDiff = Math.abs(airport1.longitude - airport2.longitude);
        const distance = latDiff + lngDiff;
        
        // If airports are too close
        if (distance < config.distanceThreshold) {
          // Move the second airport "below" the first (decrease latitude)
          airport2.latitude -= config.adjustmentAmount;
          
          console.log(`Adjusted ${airport2.airport_code} to avoid overlap with ${airport1.airport_code}`);
          adjustmentsMade = true;
        }
      }
    }
    
    // If no adjustments were made in this iteration, we can stop
    if (!adjustmentsMade) break;
  }
  
  // Deduplicate airports by IATA code
  const uniqueAirportMap = new Map();
  
  // Add airports to the map using airport_code as the key
  adjustedAirports.forEach(airport => {
    if (!uniqueAirportMap.has(airport.airport_code)) {
      uniqueAirportMap.set(airport.airport_code, airport);
    } else {
      console.log(`Removed duplicate airport: ${airport.airport_code}`);
    }
  });
  
  // Convert map values back to array
  const deduplicatedAirports = Array.from(uniqueAirportMap.values());
  
  console.log(`Removed ${adjustedAirports.length - deduplicatedAirports.length} duplicate airports`);
  
  return deduplicatedAirports;
}

// Add this function to determine the best orientation for each airport label
function calculateLabelOrientations(airports, options = {}) {
  // Default options
  const defaults = {
    proximityThreshold: 10,  // Longitude difference threshold to consider proximity
  };
  
  const config = { ...defaults, ...options };
  
  // Make a deep copy to avoid modifying the original
  const airportsWithOrientations = JSON.parse(JSON.stringify(airports));
  
  // Sort airports by longitude to make adjacency checks easier
  airportsWithOrientations.sort((a, b) => a.longitude - b.longitude);
  
  // Initialize all orientations to 'right' by default
  airportsWithOrientations.forEach(airport => {
    airport.labelOrientation = 'right';
  });
  
  // For each airport, check nearby airports and adjust orientations
  for (let i = 0; i < airportsWithOrientations.length; i++) {
    const airport = airportsWithOrientations[i];
    
    // Only look at airports ahead in the array (higher longitude)
    for (let j = i + 1; j < airportsWithOrientations.length; j++) {
      const nextAirport = airportsWithOrientations[j];
      
      // If airports are close in longitude
      if (Math.abs(nextAirport.longitude - airport.longitude) < config.proximityThreshold) {
        // If they're also close in latitude
        if (Math.abs(nextAirport.latitude - airport.latitude) < config.proximityThreshold) {
          // Alternate the orientation of adjacent airports
          if (airport.labelOrientation === 'right') {
            nextAirport.labelOrientation = 'left';
          } else if (airport.labelOrientation === 'left') {
            nextAirport.labelOrientation = 'right';
          } else if (airport.labelOrientation === 'top') {
            nextAirport.labelOrientation = 'bottom';
          } else {
            nextAirport.labelOrientation = 'top';
          }
          
          // If they're very close, use top/bottom orientation instead
          if (Math.abs(nextAirport.longitude - airport.longitude) < config.proximityThreshold / 2) {
            if (nextAirport.latitude > airport.latitude) {
              airport.labelOrientation = 'bottom';
              nextAirport.labelOrientation = 'top';
            } else {
              airport.labelOrientation = 'top';
              nextAirport.labelOrientation = 'bottom';
            }
          }
          
          console.log(`Adjusted label orientation for ${nextAirport.airport_code} to ${nextAirport.labelOrientation} (near ${airport.airport_code})`);
        }
      }
    }
    
    // Special case for DFW as in your original code
    if (airport.airport_code === "DFW") {
      airport.labelOrientation = "top";
    }
  }
  
  return airportsWithOrientations;
}

/**
 * Deduplicates flight routes based on source and destination airport pairs
 * @param {Array} flights - The array of flight objects
 * @param {Object} options - Configuration options
 * @returns {Array} - The array of flights with no duplicate routes
 */
function deduplicateFlights(flights, options = {}) {
  // Default options
  const defaults = {
    preserveMetadata: true  // Whether to combine metadata from duplicates
  };
  
  const config = { ...defaults, ...options };
  
  // Create a map to store unique flights
  const uniqueFlightsMap = new Map();
  
  // Process each flight in the array
  flights.forEach(flight => {
    // Create a unique key using source and destination airport codes
    const routeKey = `${flight.airport_code_src}-${flight.airport_code_dst}`;
    
    if (!uniqueFlightsMap.has(routeKey)) {
      // First time seeing this route - add it as is
      uniqueFlightsMap.set(routeKey, flight);
    } else if (config.preserveMetadata) {
      // We've seen this route before - combine metadata
      const existingFlight = uniqueFlightsMap.get(routeKey);
      
      // Combine flight dates (avoiding duplicates)
      const allDates = [...existingFlight.flight_takeoff_date];
      flight.flight_takeoff_date.forEach(date => {
        if (!allDates.includes(date)) {
          allDates.push(date);
        }
      });
      existingFlight.flight_takeoff_date = allDates;
      
      // Combine flight numbers (avoiding duplicates)
      const allFlightNumbers = [...existingFlight.flight_number];
      flight.flight_number.forEach(num => {
        if (!allFlightNumbers.includes(num)) {
          allFlightNumbers.push(num);
        }
      });
      existingFlight.flight_number = allFlightNumbers;
      
      // Update the map with the combined flight
      uniqueFlightsMap.set(routeKey, existingFlight);
    }
  });
  
  // Convert map values back to array
  const deduplicatedFlights = Array.from(uniqueFlightsMap.values());
  
  console.log(`Removed ${flights.length - deduplicatedFlights.length} duplicate flights`);
  
  return deduplicatedFlights;
}

// SECTION Globe
function initGlobe() {
  // Initialize the Globe
  Globe = new ThreeGlobe({
    waitForGlobeReady: true,
    animateIn: true,
  })
    .hexPolygonsData(countries.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.7)
    .showAtmosphere(true)
    .atmosphereColor("#3a228a")
    .atmosphereAltitude(0.25)
    .hexPolygonColor((e) => {
      if (
        ["KGZ", "KOR", "THA", "RUS", "UZB", "IDN", "KAZ", "MYS"].includes(
          e.properties.ISO_A3
        )
      ) {
        return "rgba(255,255,255, 1)";
      } else return "rgba(255,255,255, 0.7)";
    });

  // Adjust airport positions to prevent overlap
  const adjustedAirports = adjustOverlappingAirports(airportHistory.airports, {
    distanceThreshold: 1.0,
    adjustmentAmount: 0.3
  });

  // Calculate optimal label orientations
  const airportsWithOrientations = calculateLabelOrientations(adjustedAirports, {
    proximityThreshold: 5.0
  });

  // Deduplicate flights to prevent overlapping arcs
  const deduplicatedFlights = deduplicateFlights(travelHistory.flights, {
    preserveMetadata: true
  });
  
  // Create new objects with the adjusted data
  const adjustedAirportHistory = {
    ...airportHistory,
    airports: airportsWithOrientations
  };
  
  const adjustedTravelHistory = {
    ...travelHistory,
    flights: deduplicatedFlights
  };

  // NOTE Arc animations are followed after the globe enters the scene
  setTimeout(() => {
    Globe.arcsData(adjustedTravelHistory.flights)
      .arcStartLat((e) => e.flight_route.src_airport.latitude)
      .arcStartLng((e) => e.flight_route.src_airport.longitude)
      .arcEndLat((e) => e.flight_route.dst_airport.latitude)
      .arcEndLng((e) => e.flight_route.dst_airport.longitude)
      .arcColor((e) => {
        return "#9cff00";
      })
      // .arcStroke((e) => { can scale with distance
      //   return 0.5;
      // })
      .arcDashLength(0.9)
      .arcDashGap(1)
      .arcDashAnimateTime(1000)
      .arcDashInitialGap((e) => 1)
      .labelsData(adjustedAirportHistory.airports)
      .labelLat("latitude")
      .labelLng("longitude")
      .labelColor(() => "#ffcb21")
      .labelDotOrientation((e) => {
        // Use the calculated orientation instead of the fixed one
        return e.labelOrientation || "right";
      })
      .labelDotRadius(0.3)
      .labelSize((e) => 1.0)
      .labelText("city")
      .labelResolution(6)
      .labelAltitude(0.01)
      .pointsData(adjustedAirportHistory.airports)
      .pointLat("lat")
      .pointLng("lng")
      .pointColor(() => "#ffffff")
      .pointsMerge(true)
      .pointAltitude(0.05)
      .pointRadius(0.05);
  }, 1000);

  Globe.rotateY(-Math.PI * (5 / 9));
  Globe.rotateZ(-Math.PI / 6);
  const globeMaterial = Globe.globeMaterial();
  globeMaterial.color = new Color(0x3a228a);
  globeMaterial.emissive = new Color(0x220038);
  globeMaterial.emissiveIntensity = 0.1;
  globeMaterial.shininess = 0.7;

  // NOTE Cool stuff
  // globeMaterial.wireframe = true;

  scene.add(Globe);
}

function onMouseMove(event) {
  // mouseX = event.clientX - windowHalfX;
  // mouseY = event.clientY - windowHalfY;
  // console.log("x: " + mouseX + " y: " + mouseY);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  windowHalfX = window.innerWidth / 1.5;
  windowHalfY = window.innerHeight / 1.5;
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  if (!isPageVisible) return;
  
  // camera.position.x +=
  //   Math.abs(mouseX) <= windowHalfX / 2
  //     ? (mouseX / 2 - camera.position.x) * 0.005
  //     : 0;
  // camera.position.y += (-mouseY / 2 - camera.position.y) * 0.005;
  // camera.lookAt(scene.position);
  controls.update();
  renderer.render(scene, camera);
  animationFrameId = requestAnimationFrame(animate);
}
