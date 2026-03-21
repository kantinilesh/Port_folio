import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

const COIN_COUNT = 30;
const BLOCK_COUNT = 15;

const coinGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16);
const staticCoinMat = new THREE.MeshStandardMaterial({
  color: '#FFD700',
  metalness: 0.8,
  roughness: 0.2,
});

const blockGeo = new THREE.BoxGeometry(1, 1, 1);
const blockMat = new THREE.MeshStandardMaterial({
  color: '#1a1a1a',
  metalness: 0.2,
  roughness: 0.8,
});

export function Scene() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  const coinsRef = useRef<THREE.InstancedMesh>(null);
  const blocksRef = useRef<THREE.InstancedMesh>(null);

  // Initialize instances
  useFrame(() => {
    if (!coinsRef.current || !blocksRef.current) return;
    
    // Only set transforms on first frame
    if (coinsRef.current.userData.initialized) return;
    coinsRef.current.userData.initialized = true;

    const dummy = new THREE.Object3D();

    for (let i = 0; i < COIN_COUNT; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        -Math.random() * 45 // Spread along Z from 0 to -45
      );
      dummy.rotation.x = Math.PI / 2;
      dummy.rotation.y = Math.random() * Math.PI;
      dummy.updateMatrix();
      coinsRef.current.setMatrixAt(i, dummy.matrix);
    }
    coinsRef.current.instanceMatrix.needsUpdate = true;

    for (let i = 0; i < BLOCK_COUNT; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15 - 5,
        -Math.random() * 45
      );
      dummy.rotation.set(Math.random(), Math.random(), Math.random());
      const s = Math.random() * 1.5 + 0.5;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      blocksRef.current.setMatrixAt(i, dummy.matrix);
    }
    blocksRef.current.instanceMatrix.needsUpdate = true;
  });

  // Camera + Subtly rotate coins
  useFrame((state) => {
    const t = scroll.offset; // 0 to 1

    // 1. Camera Movement
    const targetZ = -42 * t;
    const targetX = 5 * t;

    state.camera.position.z += (targetZ - state.camera.position.z) * 0.08;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.08;
    
    // Slight mouse tilt for parallax depth
    const mx = (state.pointer.x * Math.PI) / 20;
    const my = (state.pointer.y * Math.PI) / 20;
    
    state.camera.lookAt(targetX + mx, my, targetZ - 10);

    // 2. Rotate Coins
    if (coinsRef.current) {
      const time = state.clock.getElapsedTime();
      const dummy = new THREE.Object3D();
      for (let i = 0; i < COIN_COUNT; i++) {
        coinsRef.current.getMatrixAt(i, dummy.matrix);
        dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
        dummy.rotation.y = time * 2 + i;
        dummy.position.y += Math.sin(time * 2 + i) * 0.005; // tiny float
        dummy.updateMatrix();
        coinsRef.current.setMatrixAt(i, dummy.matrix);
      }
      coinsRef.current.instanceMatrix.needsUpdate = true;
    }
    
    // 3. Float blocks
    if (blocksRef.current) {
      const time = state.clock.getElapsedTime();
      const dummy = new THREE.Object3D();
      for (let i = 0; i < BLOCK_COUNT; i++) {
        blocksRef.current.getMatrixAt(i, dummy.matrix);
        dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
        dummy.position.y += Math.sin(time + i) * 0.002; 
        dummy.rotation.x += 0.001;
        dummy.rotation.y += 0.001;
        dummy.updateMatrix();
        blocksRef.current.setMatrixAt(i, dummy.matrix);
      }
      blocksRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#049CD8" />
      <fog attach="fog" args={['#000000', 5, 25]} />

      <instancedMesh ref={coinsRef} args={[coinGeo, staticCoinMat, COIN_COUNT]} />
      <instancedMesh ref={blocksRef} args={[blockGeo, blockMat, BLOCK_COUNT]} />
    </group>
  );
}
