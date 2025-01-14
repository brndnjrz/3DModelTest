// Import Three.js (if using a module system like npm, otherwise skip this line)
import * as THREE from 'three';

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<h1>Hello, World!</h1>);

// 1️⃣ Create Scene
const scene = new THREE.Scene();


// 2️⃣ Create Camera
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 10);
// camera.lookAt(0, 0, 0);


// 3️⃣ Create Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio)

document.body.appendChild(renderer.domElement);

// Create mesh 
const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32 );
// const groundGeometry = new THREE.PlaneGeometry( 1, 1, 1 );
// groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x55555,
    side: THREE.DoubleSide
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(groundMesh);

camera.position.z = 3;

// 4️⃣ Add Light (So the model is visible)
const spotLight = new THREE.SpotLight( 0xffffff, 3, 100, 0.2, 0.5 );
// const spotLight = new THREE.SpotLight( 0xffffff);
spotLight.position.set( 0, 4, 2);
scene.add(spotLight);

// without this you can't see the light
const ambientLight = new THREE.AmbientLight(0xffffff, .1); // Dim ambient light
scene.add(ambientLight);

// 4️⃣ Add Light (Fix Spotlight Issues)
// const spotLight = new THREE.SpotLight(0xffffff, 2, 3, 100, 0.2, 0.5);
// spotLight.position.set(0, 5, 2);
// spotLight.target.position.set(0, 0, 0);
// spotLight.distance = 10;
// spotLight.angle = Math.PI / 4;
// spotLight.penumbra = 0.5;
// spotLight.decay = 2;
// spotLight.castShadow = true; // Enable shadows

// scene.add(spotLight);
// scene.add(spotLight.target); // Add target to the scene

// // Add ambient light
// const ambientLight = new THREE.AmbientLight(0xff0000, 0.2);
// scene.add(ambientLight);




// 5️⃣ Render Loop

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
