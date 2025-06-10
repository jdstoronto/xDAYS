import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import { GLView } from 'react-native-threejs';
import { Renderer } from 'react-native-threejs';
import * as THREE from 'three';

const WordFreq3DChart = ({ wordCounts }) => {
  const onContextCreate = async gl => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 10;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 10);
    scene.add(light);

    const entries = Object.entries(wordCounts || {});

    entries.forEach(([word, count], index) => {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({ color: 0x2194ce });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = (index - entries.length / 2) * 2;
      const scale = 0.5 + count * 0.5;
      cube.scale.set(scale, scale, scale);
      cube.userData = { word };
      scene.add(cube);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      scene.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.rotation.x += 0.01;
          child.rotation.y += 0.01;
        }
      });
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    animate();
  };

  return <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />;
};

export default WordFreq3DChart;

