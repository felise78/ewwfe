import * as THREE from 'three';

// export function createNightLightsMesh() {
//   const geometry = new THREE.IcosahedronGeometry(1, 12);
//   const lightsMaterial = new THREE.MeshBasicMaterial({
//     map: new THREE.TextureLoader().load('./textures/night_lights_modified.png'),
//     blending: THREE.AdditiveBlending,
//   });
  
//   return new THREE.Mesh(geometry, lightsMaterial);
// }

export async function createNightLightsMesh(textureManager, geometry) {
  const lightsTexture = await textureManager.loadTexture('./textures/night_lights_modified.png');

  // // debugg
  // console.log('✅ Texture night lights chargée:', lightsTexture);
  // console.log('📏 Dimensions:', lightsTexture.image?.width, 'x', lightsTexture.image?.height);

  
  const lightsMaterial = new THREE.MeshBasicMaterial({
    map: lightsTexture,
    blending: THREE.AdditiveBlending,
  });
  
  // const lightsMaterial = new THREE.MeshBasicMaterial({
  //   color: 0x00ff00, // Vert fluo
  //   transparent: true,
  //   opacity: 0.5,
  // });

  
  // console.log('🎨 Material créé:', lightsMaterial);
  // console.log('🗺️ Material map:', lightsMaterial.map);

  const mesh = new THREE.Mesh(geometry, lightsMaterial);
  mesh.scale.set(1.02, 1.02, 1.02);

  return mesh;
}