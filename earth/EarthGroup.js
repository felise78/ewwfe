import * as THREE from 'three';
import { createEarthMesh } from './EarthMesh.js';
import { createCloudsMesh } from './CloudsMesh.js';
import { createNightLightsMesh } from './NightlightsMesh.js';

export async function createEarth(textureManager) {
  // Créer le groupe conteneur
  const earthGroup = new THREE.Group();
  earthGroup.rotation.z = -23.4 * (Math.PI / 180); // Inclinaison
  
  // Ajouter tous les éléments
  const earthMesh = await createEarthMesh(textureManager);
  const cloudsMesh = createCloudsMesh();
  const lightsMesh = createNightLightsMesh();
  
  earthGroup.add(earthMesh);
  earthGroup.add(cloudsMesh);  
  earthGroup.add(lightsMesh);
  
  // Retourner le groupe ET les meshes individuels pour l'animation
  return {
    group: earthGroup,
    meshes: {
      earth: earthMesh,
      clouds: cloudsMesh,
      lights: lightsMesh
    }
  };
}