const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
let keys = {};
document.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
document.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

// Ground of cubes
const blockSize = 1;
const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

for (let x = -10; x <= 10; x++) {
  for (let z = -10; z <= 10; z++) {
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, -1, z);
    scene.add(cube);
  }
}

// Camera start
camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0);

// Resize support
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Movement
function updatePlayer() {
  const speed = 0.1;
  if (keys['w']) camera.position.z -= speed;
  if (keys['s']) camera.position.z += speed;
  if (keys['a']) camera.position.x -= speed;
  if (keys['d']) camera.position.x += speed;
}

// Loop
function animate() {
  requestAnimationFrame(animate);
  updatePlayer();
  renderer.render(scene, camera);
}
animate();

