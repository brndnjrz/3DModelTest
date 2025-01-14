// This code creates a #D scene using Three.js library for rendering 3D graphics in the browser using WebGL
// Sets up a scene with a ground plane, a spotlight, an orbiting camera, and loads a 3D model which is in GLTF format 


// main Three.js library
import * as THREE from 'three';
// A loader for importing GLTF models
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// A control system to allow the user to orbit around the scene
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// 1️⃣ uses WebGLRenderer for rendering 3D graphics
const renderer = new THREE.WebGLRenderer({ antialias: true });      // anti-aliasing smoothens edges
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);       // sets background color to black 
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;      // enables shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap;       // uses a soft shadow mapping technique 

document.body.appendChild(renderer.domElement);


// 2️⃣ Scene is created where objects, lights and cameras are placed 
const scene = new THREE.Scene();


// 3️⃣ Setting up the camera
    // PerspectiveCamera: realistic 3D View 
    // FOV = 45 degrees
    // Aspect Ratio = maintains correct proportions
    // Near & Far clipping planes = 1 to 100; objects outside this range aren't rendered 
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(4, 5, 11);      // Camera position x, y, z


// 4️⃣ Adding Orbit Controls
    // Allows user to rotate around the scene with the mouse 
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;      // Adds smooth movement when rotating
controls.enablePan = false;         // Disables panning; moving the camera left/right 
controls.minDistance = 5;           // min and max limits zooming 
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;       // min and max restricts vertical movement 
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;        
controls.target = new THREE.Vector3(0, 1, 0);       // Focuses on a point x, y, z 
controls.update();


// 5️⃣ creating the Ground plane 
const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);     // creates a 20 x 20 plane 
groundGeometry.rotateX(-Math.PI / 2);       // rotates the plane to lie flat
const groundMaterial = new THREE.MeshStandardMaterial({     // supports lighting & shadows 
  color: 0x555555,
  side: THREE.DoubleSide
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;      // plane doesn't cast shadows 
groundMesh.receiveShadow = true;    // plane receives shadows
scene.add(groundMesh);              // adds the groundMesh to the scene 


// 6️⃣ creates a spotlight
    // color: 0xffffff(white); hexadecimal color of the light
    // intensity: 3000; numeric value of the light's strength/intensity
    // distance: 100; maximum range of the light 
    // decay: 0.22; The amount the light dims along the distance of the light 
    // penumbra: 1; percent of the spotlight cone that is attenuated due to penumbra
const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.25, 1.2);
spotLight.position.set(0, 25, 0);       // shining from above 
spotLight.castShadow = true;            
spotLight.shadow.bias = -0.0001;        //reduces shadow artifacts
scene.add(spotLight);


// 7️⃣ Loading the GLTF Model 
    // GLTFLoader: to load a 3D model 
const loader = new GLTFLoader().setPath('public/2021_czinger_21c/');
// const loader = new GLTFLoader().setPath('public/space_station_3/');
loader.load('scene.gltf', (gltf) => {
  console.log('loading model');
  const mesh = gltf.scene;

//   Traverses all children of the model to enable shadows 
  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  mesh.scale.set(175, 175, 175);        // scales the model by 175 times
  // mesh.scale.set(0.9, 0.9, 0.9);        // smaller scale for the space station 3 

  mesh.position.set(0, 1, 0);           // positions the model 
  scene.add(mesh);

  document.getElementById('progress-container').style.display = 'none';
}, (xhr) => {
  console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
  console.error(error);
});


// 8️⃣ Window Resize Event 
    // updates camera aspect ratio and renderer size when the window is resized 
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// 9️⃣ Animation Loop
function animate() {
  requestAnimationFrame(animate);       // runs continuously 
  controls.update();                    // updates orbit controls 
  renderer.render(scene, camera);       // renders the scene 
}

animate();
