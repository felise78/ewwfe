import * as THREE from 'three';

export async function createEarthMesh(textureManager, geometry) {
  
  const mainTexture = await textureManager.loadTexture('./textures/Albedo.jpg');
  
  const material = new THREE.MeshPhongMaterial({
    map: mainTexture,
    // opacity: 1,
  });
  
  return new THREE.Mesh(geometry, material);
}