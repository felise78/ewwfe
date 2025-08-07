import * as THREE from 'three';
import TextureManager from './TextureManager.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import getStarfield from './getStarfield.js';

// mettre en exposition global pour pouvoir explorer l'API dans la console du navigateur :
// window.THREE = THREE;

const canvas = document.getElementById('canvas');
const w = window.innerWidth; 
const h = window.innerHeight; 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.setSize(w, h);
////////////////////////////////////////////////////////////////////

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * (Math.PI / 180); 
scene.add(earthGroup);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

scene.background = new THREE.Color(0x000000);

const geometry = new THREE.IcosahedronGeometry(1, 12);

// const loader = new THREE.TextureLoader();

const textureManager = new TextureManager();
const mainTexture = await textureManager.loadTexture('./textures/Albedo.jpg');

const material = new THREE.MeshPhongMaterial({
  map: mainTexture,
  // specularMap: loader.load("./textures/02_earthspec1k.jpg"),
  // bumpMap: loader.load("./textures/01_earthbump1k.jpg"),
//   bumpScale: 0.04,
});



const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const stars = getStarfield();
scene.add(stars);


const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );
// const light = new THREE.PointLight(0xeeeeee, 20);
// light.position.set(0, 0, 5);
// scene.add(light);


function animate() {

  requestAnimationFrame(animate);

  earthMesh.rotation.y += 0.002; 
  renderer.render(scene, camera);
}

animate();

// global.THREE = THREE // voir comment debug
// ajouter des update de controls pour ameliorer l'interaction
// dat.gui ?
// rajouter le event listeners pour resize et update camera
// stats pour les performances