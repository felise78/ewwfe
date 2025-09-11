import * as THREE from 'three';

// export function createCloudsMesh() {
//   const geometry = new THREE.IcosahedronGeometry(1, 12);
//   const cloudsMaterial = new THREE.MeshStandardMaterial({
//     map: new THREE.TextureLoader().load('./textures/Clouds.png'),
//     blending: THREE.AdditiveBlending,
//   });
  
//   const cloudsMesh = new THREE.Mesh(geometry, cloudsMaterial);
//   cloudsMesh.scale.set(1.01, 1.01, 1.01); // Légèrement plus grand
//   return cloudsMesh;
// }

export async function createCloudsMesh(textureManager, geometry) {
  
  const cloudsTexture = await textureManager.loadTexture('./textures/Clouds.png');
  
  const cloudsMaterial = new THREE.MeshStandardMaterial({
    map: cloudsTexture,
    blending: THREE.AdditiveBlending,
  });
  
  const cloudsMesh = new THREE.Mesh(geometry, cloudsMaterial);
  cloudsMesh.scale.set(1.01, 1.01, 1.01);
  return cloudsMesh;
}