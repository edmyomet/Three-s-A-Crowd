import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight);


document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const orbit = new OrbitControls(camera,renderer.domElement)
const axesHelper  = new THREE.AxesHelper(3);
scene.add(axesHelper);

camera.position.set(-10,30,30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color:0xFFFFFF,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane)
plane.rotation.x = -0.5 * Math.PI;

const sphereGeometry = new THREE.SphereGeometry(4,50,50);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x00FF00,
    wireframe: false
});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphere);

sphere.position.set(-10,10,0);

const gui = new dat.GUI();

const option = {
    sphereColor: '#ffea00',
    wireframe: false

};
gui.addColor(option,'sphereColor').onChange(function(e){
    sphere.material.color.set(e);
});

gui.add(option,'wireframe').onChange(function(e){
    sphere.material.wireframe = e;
})

function animate(time){
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate)