// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff, 1.5);
spotLight.position.set(15, 20, 15);
spotLight.castShadow = true;
scene.add(spotLight);

// Birthday Cake
function createCake() {
  const cakeGeometry = new THREE.CylinderGeometry(3, 3, 2, 64);
  const cakeMaterial = new THREE.MeshStandardMaterial({ color: 0xffc0cb });
  const cake = new THREE.Mesh(cakeGeometry, cakeMaterial);

  // Icing
  const icingGeometry = new THREE.CylinderGeometry(3.2, 3.2, 0.5, 64);
  const icingMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const icing = new THREE.Mesh(icingGeometry, icingMaterial);
  icing.position.y = 1.25;
  cake.add(icing);

  // Candles
  for (let i = 0; i < 5; i++) {
    const candleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1);
    const candleMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    const candle = new THREE.Mesh(candleGeometry, candleMaterial);
    candle.position.set(Math.cos((i / 5) * Math.PI * 2) * 2, 2, Math.sin((i / 5) * Math.PI * 2) * 2);
    
    const flameGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const flameMaterial = new THREE.MeshStandardMaterial({ color: 0xff4500, emissive: 0xff6347 });
    const flame = new THREE.Mesh(flameGeometry, flameMaterial);
    flame.position.y = 0.6;
    candle.add(flame);

    cake.add(candle);
  }

  return cake;
}

const cake = createCake();
scene.add(cake);

// Balloons
function createBalloon(color) {
  const balloonGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const balloonMaterial = new THREE.MeshPhysicalMaterial({ color, clearcoat: 1, reflectivity: 1 });
  const balloon = new THREE.Mesh(balloonGeometry, balloonMaterial);

  const stringGeometry = new THREE.CylinderGeometry(0.02, 0.02, 2);
  const stringMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
  const string = new THREE.Mesh(stringGeometry, stringMaterial);
  string.position.y = -1.5;

  balloon.add(string);
  return balloon;
}

const balloonColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff69b4, 0x8a2be2];
const balloons = [];

for (let i = 0; i < 10; i++) {
  const balloon = createBalloon(balloonColors[Math.floor(Math.random() * balloonColors.length)]);
  balloon.position.set((Math.random() - 0.5) * 10, -5, (Math.random() - 0.5) * 10);
  scene.add(balloon);
  balloons.push(balloon);
}

// Animate Objects
function animateBalloons() {
  balloons.forEach((balloon) => {
    balloon.position.y += 0.02;
    balloon.rotation.x += 0.01;
    balloon.rotation.y += 0.01;

    if (balloon.position.y > 10) {
      balloon.position.y = -5;
      balloon.position.x = (Math.random() - 0.5) * 10;
      balloon.position.z = (Math.random() - 0.5) * 10;
    }
  });
}

// Position Camera
camera.position.set(0, 5, 15);
camera.lookAt(0, 2, 0);

// Render Loop
function animate() {
  requestAnimationFrame(animate);
  animateBalloons();
  renderer.render(scene, camera);
}
animate();

// Resize Renderer on Window Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
