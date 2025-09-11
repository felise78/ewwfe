import SceneManager from './SceneManager.js';

// Point d'entrée de l'application - gestion du DOM et de l'interface
const canvas = document.getElementById('canvas');
const w = window.innerWidth; 
const h = window.innerHeight; 

// Initialisation du gestionnaire de scène
const sceneManager = new SceneManager(canvas, w, h);

// bindEventListeners();
render();

function render() {
  requestAnimationFrame(render);
  sceneManager.update();
}