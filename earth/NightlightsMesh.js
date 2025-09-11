import * as THREE from 'three';

export function createNightLightsMesh() {
  const geometry = new THREE.IcosahedronGeometry(1, 12);
  const lightsMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./textures/night_lights_modified.png'),
    blending: THREE.AdditiveBlending,
  });
  
  return new THREE.Mesh(geometry, lightsMaterial);
}