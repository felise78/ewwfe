import * as THREE from 'three';
import { createEarthMesh } from './EarthMesh.js';
import { createCloudsMesh } from './CloudsMesh.js';
import { createNightLightsMesh } from './NightlightsMesh.js';

export async function createEarth(textureManager) {
  
  const earthGroup = new THREE.Group();
  earthGroup.rotation.z = -23.4 * (Math.PI / 180); // Inclinaison
  const geometry = new THREE.IcosahedronGeometry(1, 12);

  const earthMesh = await createEarthMesh(textureManager, geometry);
  const cloudsMesh = await createCloudsMesh(textureManager, geometry);
  const nightLightsMesh = await createNightLightsMesh(textureManager, geometry);


  // console.log('🌍 Earth position:', earthMesh.position);
  // console.log('☁️ Clouds position:', cloudsMesh.position);
  // console.log('💡 Lights position:', nightLightsMesh.position);

  // console.log('🌍 Earth scale:', earthMesh.scale);
  // console.log('☁️ Clouds scale:', cloudsMesh.scale);
  // console.log('💡 Lights scale:', nightLightsMesh.scale);

  earthGroup.add(earthMesh);
  earthGroup.add(cloudsMesh);  
  earthGroup.add(nightLightsMesh);
  
  return {
    group: earthGroup,
    meshes: {
      earth: earthMesh,
      clouds: cloudsMesh,
      lights: nightLightsMesh
    }
  };
}