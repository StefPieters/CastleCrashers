import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
void main() {
  float lanes = 7.0;
  float stripe = mod(floor(vUv.x * lanes), 2.0);
  vec3 color = mix(vec3(0.8, 0.8, 0.8), vec3(0.5, 0.5, 0.5), stripe);
  gl_FragColor = vec4(color, 1.0);
}
`;

export const groundShaderMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
});