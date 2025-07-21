// Variables globales
let scene, camera, renderer;
let earthMesh, moonMesh;

// Initialisation
function init() {
    // Création de la scène
    scene = new THREE.Scene();
    
    // Création de la caméra
    camera = new THREE.PerspectiveCamera(
        75, // Field of view
        window.innerWidth / window.innerHeight, // Aspect ratio
        0.1, // Near clipping plane
        1000 // Far clipping plane
    );
    
    // Création du renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000011); // Couleur de fond (bleu très foncé)

    // Ajout du canvas au DOM
    document.getElementById('container').appendChild(renderer.domElement);
    
    // Position de la caméra
    camera.position.set(0, 0, 10);
    
    // Ajout d'une lumière basique
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Pour l'instant, on ajoute juste un cube de test
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const material = new THREE.MeshLambertMaterial({        color: 0x00ff00, wireframe: true });
    earthMesh = new THREE.Mesh(geometry, material);

    scene.add(earthMesh);

    // Gestion du redimensionnement
    window.addEventListener('resize', onWindowResize);
    
    // Démarrage de la boucle de rendu
    animate();
}

// Fonction d'animation
function animate() {
    requestAnimationFrame(animate);
    
    earthMesh.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}

// Gestion du redimensionnement
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Démarrage de l'application
init();