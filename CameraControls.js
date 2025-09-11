import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class CameraControls {
    constructor(camera, domElement, options = {}) {
        this.camera = camera;
        this.domElement = domElement;
        
        // Configuration par défaut
        const defaultConfig = {
            enableDamping: true,
            dampingFactor: 0.05,
            screenSpacePanning: false,
            minDistance: 2,
            maxDistance: 50,
            maxPolarAngle: Math.PI,
            enablePan: true,
            enableZoom: true,
            enableRotate: true,
            autoRotate: false,
            autoRotateSpeed: 0.5
        };
        
        this.config = { ...defaultConfig, ...options };
        this.controls = this.createControls();
    }
    
    createControls() {
        const controls = new OrbitControls(this.camera, this.domElement);
        
        // Appliquer la configuration
        Object.keys(this.config).forEach(key => {
            if (key in controls) {
                controls[key] = this.config[key];
            }
        });
        
        return controls;
    }
    
    // Presets pour différents types d'interactions
    setPreset(preset) {
        switch (preset) {
            case 'earth-viewer':
                this.controls.minDistance = 1.5;
                this.controls.maxDistance = 20;
                this.controls.enablePan = false;
                this.controls.autoRotate = true;
                this.controls.autoRotateSpeed = 0.5;
                break;
                
            case 'free-camera':
                this.controls.minDistance = 0.1;
                this.controls.maxDistance = 1000;
                this.controls.enablePan = true;
                this.controls.autoRotate = false;
                break;
                
            case 'locked-distance':
                this.controls.enableZoom = false;
                this.controls.enablePan = false;
                break;
        }
    }
    
    update() {
        this.controls.update();
    }
    
    // Méthodes utiles
    resetToHome(homePosition = { x: 0, y: 0, z: 5 }) {
        this.camera.position.set(homePosition.x, homePosition.y, homePosition.z);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }
    
    smoothTransitionTo(targetPosition, targetLookAt, duration = 1000) {
        // Animation fluide vers une position (nécessiterait une lib comme GSAP)
        // Ou implémentation custom avec requestAnimationFrame
    }
    
    handleResize() {
        // Les OrbitControls se mettent à jour automatiquement
        // mais on peut ajouter une logique custom ici
    }
    
    dispose() {
        this.controls.dispose();
    }
    
    // Getters utiles
    get isUserInteracting() {
        return this.controls.enabled && 
               (this.controls.mouseButtons.LEFT !== -1 || 
                this.controls.mouseButtons.MIDDLE !== -1 || 
                this.controls.mouseButtons.RIGHT !== -1);
    }
    
    get target() {
        return this.controls.target;
    }
    
    // Méthodes de contrôle programmatique
    enableAutoRotate(speed = 0.5) {
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = speed;
    }
    
    disableAutoRotate() {
        this.controls.autoRotate = false;
    }
    
    toggleControls(enabled = !this.controls.enabled) {
        this.controls.enabled = enabled;
    }
}