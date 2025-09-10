import * as THREE from 'three';

class TextureManager {
    constructor() {
        this.loader = new THREE.TextureLoader();
        this.textures = new Map(); // Cache des textures chargées
        this.loadingPromises = new Map(); // Cache des promesses de chargement
    }

    /**
     * Charge une texture de façon asynchrone
     * @param {string} url - URL de la texture
     * @param {string} name - Nom pour identifier la texture (optionnel)
     * @returns {Promise<THREE.Texture>}
     */
    async loadTexture(url, name = null) {
        const key = name || url;
        
        // Si la texture est déjà chargée, la retourner
        if (this.textures.has(key)) {
            return this.textures.get(key);
        }
        
        // Si le chargement est en cours, retourner la promesse existante
        if (this.loadingPromises.has(key)) {
            return this.loadingPromises.get(key);
        }
        
        // Créer une nouvelle promesse de chargement
        const loadingPromise = new Promise((resolve, reject) => {
            this.loader.load(
                url,
                (texture) => {
                    this.textures.set(key, texture);
                    this.loadingPromises.delete(key);
                    resolve(texture);
                },
                (progress) => {
                    // Callback de progression (optionnel)
                    console.log(`Chargement texture ${url}: ${(progress.loaded / progress.total * 100)}%`);
                },
                (error) => {
                    this.loadingPromises.delete(key);
                    console.error(`Erreur lors du chargement de la texture ${url}:`, error);
                    reject(error);
                }
            );
        });
        
        this.loadingPromises.set(key, loadingPromise);
        return loadingPromise;
    }

    /**
     * Charge plusieurs textures en parallèle
     * @param {Array} textureConfigs - Tableau d'objets {url, name}
     * @returns {Promise<Map>} - Map avec les textures chargées
     */
    async loadMultipleTextures(textureConfigs) {
        const loadingPromises = textureConfigs.map(config => 
            this.loadTexture(config.url, config.name)
                .then(texture => ({ key: config.name || config.url, texture }))
        );
        
        const results = await Promise.all(loadingPromises);
        const textureMap = new Map();
        results.forEach(result => textureMap.set(result.key, result.texture));
        
        return textureMap;
    }

    /**
     * Récupère une texture du cache
     * @param {string} key - Nom ou URL de la texture
     * @returns {THREE.Texture|null}
     */
    getTexture(key) {
        return this.textures.get(key) || null;
    }

    /**
     * Configure une texture avec des paramètres communs
     * @param {THREE.Texture} texture - La texture à configurer
     * @param {Object} options - Options de configuration
     */
    configureTexture(texture, options = {}) {
        const {
            wrapS = THREE.RepeatWrapping,
            wrapT = THREE.RepeatWrapping,
            magFilter = THREE.LinearFilter,
            minFilter = THREE.LinearMipmapLinearFilter,
            repeat = [1, 1],
            flipY = true
        } = options;

        texture.wrapS = wrapS;
        texture.wrapT = wrapT;
        texture.magFilter = magFilter;
        texture.minFilter = minFilter;
        texture.repeat.set(repeat[0], repeat[1]);
        texture.flipY = flipY;
        texture.needsUpdate = true;

        return texture;
    }

    /**
     * Charge et configure une texture en une fois
     * @param {string} url - URL de la texture
     * @param {Object} options - Options de configuration
     * @param {string} name - Nom pour identifier la texture
     * @returns {Promise<THREE.Texture>}
     */
    async loadAndConfigureTexture(url, options = {}, name = null) {
        const texture = await this.loadTexture(url, name);
        return this.configureTexture(texture, options);
    }

    /**
     * Supprime une texture du cache et libère la mémoire
     * @param {string} key - Nom ou URL de la texture
     */
    disposeTexture(key) {
        const texture = this.textures.get(key);
        if (texture) {
            texture.dispose();
            this.textures.delete(key);
        }
    }

    /**
     * Vide complètement le cache et libère toutes les textures
     */
    disposeAll() {
        this.textures.forEach(texture => texture.dispose());
        this.textures.clear();
        this.loadingPromises.clear();
    }

    /**
     * Retourne la liste des textures chargées
     * @returns {Array<string>}
     */
    getLoadedTextureKeys() {
        return Array.from(this.textures.keys());
    }
}

// Exemple d'utilisation :
/*
const textureManager = new TextureManager();

// Charger une texture simple
const diffuseTexture = await textureManager.loadTexture('./textures/brick_diffuse.jpg', 'brick_diffuse');

// Charger et configurer une texture
const normalTexture = await textureManager.loadAndConfigureTexture(
    './textures/brick_normal.jpg',
    {
        repeat: [2, 2],
        wrapS: THREE.RepeatWrapping,
        wrapT: THREE.RepeatWrapping
    },
    'brick_normal'
);

// Charger plusieurs textures en parallèle
const textures = await textureManager.loadMultipleTextures([
    { url: './textures/wood_diffuse.jpg', name: 'wood_diffuse' },
    { url: './textures/wood_normal.jpg', name: 'wood_normal' },
    { url: './textures/wood_roughness.jpg', name: 'wood_roughness' }
]);

// Utiliser une texture chargée
const material = new THREE.MeshStandardMaterial({
    map: textureManager.getTexture('wood_diffuse'),
    normalMap: textureManager.getTexture('wood_normal'),
    roughnessMap: textureManager.getTexture('wood_roughness')
});
*/

export default TextureManager;