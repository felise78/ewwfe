import * as THREE from 'three';

export async function createEarthMesh(textureManager) {
  const geometry = new THREE.IcosahedronGeometry(1, 12);
  const mainTexture = await textureManager.loadTexture('./textures/Albedo.jpg');
  
  const material = new THREE.MeshPhongMaterial({
    map: mainTexture,
  });
  
  return new THREE.Mesh(geometry, material);
}