import * as THREE from 'three';
import TextureManager from './TextureManager.js';
import { CameraControls } from './CameraControls.js';
import getStarfield from './getStarfield.js';
import { createEarth } from './earth/EarthGroup.js';

class SceneManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.clock = new THREE.Clock();
        
        this.screenDimensions = {
            width: canvas.width,
            height: canvas.height
        };
        
        this.scene = this.buildScene();
        this.renderer = this.buildRenderer(this.screenDimensions);
        this.camera = this.buildCamera(this.screenDimensions);
        this.textureManager = new TextureManager();
        this.cameraControls = new CameraControls(this.camera, this.canvas);
        // Initialisation asynchrone
        this.init();
    }

    buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#000");
        return scene;
    }

    buildRenderer({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas, 
            antialias: true, 
            alpha: true 
        });
        
        const DPR = window.devicePixelRatio || 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);
        
        // Note: gammaInput/gammaOutput sont dépréciés dans les versions récentes
        // renderer.outputEncoding = THREE.sRGBEncoding; // Alternative moderne
        
        return renderer;
    }

    buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 75;
        const nearPlane = 0.1;
        const farPlane = 1000;
        
        const camera = new THREE.PerspectiveCamera(
            fieldOfView, 
            aspectRatio, 
            nearPlane, 
            farPlane
        );
        
        camera.position.z = 5;
        return camera;
    }

    async createSceneSubjects() {
        const sceneSubjects = [];
        
        // Création de la Terre
        this.earth = await createEarth(this.textureManager);
        sceneSubjects.push({
            object: this.earth,
            update: (elapsedTime) => {
                if (this.earth) {
                    this.earth.group.rotation.y += 0.002;
                }
            }
        });
        
        // Ajout des étoiles
        const stars = getStarfield();
        this.scene.add(stars);
        
        // Éclairage solaire
        const sunLight = new THREE.DirectionalLight(0xffffff, 1);
        sunLight.position.set(-2, 0.5, 1.5);
        this.scene.add(sunLight);
        
        // Ajout de la terre à la scène
        this.scene.add(this.earth.group);
        
        return sceneSubjects;
    }

    async init() {
        this.sceneSubjects = await this.createSceneSubjects();
    }

    update() {
        const elapsedTime = this.clock.getElapsedTime();
        
        // Mise à jour de tous les objets de la scène
        if (this.sceneSubjects) {
            for (let i = 0; i < this.sceneSubjects.length; i++) {
                this.sceneSubjects[i].update(elapsedTime);
            }
        }
        
        // Rendu de la scène
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.screenDimensions.width = window.innerWidth;
        this.screenDimensions.height = window.innerHeight;
        
        this.camera.aspect = this.screenDimensions.width / this.screenDimensions.height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(this.screenDimensions.width, this.screenDimensions.height);
    }
}

export default SceneManager;