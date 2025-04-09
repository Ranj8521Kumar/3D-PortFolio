import { Html, OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useEffect, useState } from 'react'
import CanvasLoader from '../Loader';

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf');
  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        intensity={1}
        angle={0.1}
        penumbra={1}
        position={[10, 15, 0]}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive 
      object={computer.scene} 
      scale={isMobile ? 0.5 : 0.75}
      position={isMobile ? [0, -3, -0.75] : [0, -3.25, -1.25]}
      rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    setIsMobile(mediaQuery.matches);

    // If the screen size is changed, update the state

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the event listener when the component mounts
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Remove the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={
          <CanvasLoader />
      }>
        <OrbitControls 
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas