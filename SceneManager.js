import * as THREE from 'three';
import TextureManager from './TextureManager.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import getStarfield from './getStarfield.js';
import { createEarth } from './earth/EarthGroup.js';

// Gestionnaire de scène Three.js
class SceneManager {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.screenDimensions = {
      width: width,
      height: height,
      ratio: width / height,
      pixelRatio: window.devicePixelRatio || 1
    };
    
    // Initialisation des composants Three.js
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.screenDimensions.ratio, 0.1, 1000);
    this.camera.position.z = 5;
    
    this.renderer = new THREE.WebGLRenderer({canvas, antialias: true});
    this.renderer.setSize(this.screenDimensions.width, this.screenDimensions.height);

    this.textureManager = new TextureManager();
    this.earth = null;
    this.init();
  }

  async init() {
    // Création de la Terre
    this.earth = await createEarth(this.textureManager);
    this.scene.add(this.earth.group);

    // Matériau Fresnel (pas utilisé actuellement)
    const fresnelMaterial = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.1,
    });

    // Ajout des étoiles
    const stars = getStarfield();
    this.scene.add(stars);

    // Éclairage solaire
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(-2, 0.5, 1.5);
    this.scene.add(sunLight);
  }

  update() {
    // Mise à jour des objets de la scène
    if (this.earth) {
      this.earth.group.rotation.y += 0.002;
    }
    
    // Rendu de la scène
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize = () => {
    // Récupérer les nouvelles dimensions
    this.screenDimensions.width = window.innerWidth;
    this.screenDimensions.height = window.innerHeight;
    
    // Mettre à jour la caméra
    this.camera.aspect = this.screenDimensions.width / this.screenDimensions.height;
    this.camera.updateProjectionMatrix();
    
    // Mettre à jour le renderer
    this.renderer.setSize(this.screenDimensions.width, this.screenDimensions.height);
  }
}

export default SceneManager;