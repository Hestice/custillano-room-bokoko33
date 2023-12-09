import * as THREE from "three";
import Experience from "../Experience.js";

export default class Floor{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;

        this.setFloor();
        this.setCircles();
    }

    setFloor(){
        this.geometry = new THREE.PlaneGeometry(100,100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            side:THREE.BackSide,
        })
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI/2;
        this.plane.position.y = -0.25;
        this.plane.receiveShadow = true;
    }

    setCircles(){
        const geometry = new THREE.CircleGeometry( 5, 64 ); 
        const material = new THREE.MeshStandardMaterial( { color: 0x8068B8 } ); 
        const material2 = new THREE.MeshStandardMaterial( { color: 0x8FC0A9 } ); 
        const material3 = new THREE.MeshStandardMaterial( { color: 0x6D8CCA} ); 
        const material4 = new THREE.MeshStandardMaterial( { color: 0xebaf9b} ); 
        const material5 = new THREE.MeshStandardMaterial( { color: 0xd46074 } ); 
        const material6 = new THREE.MeshStandardMaterial( { color: 0xececec } ); 
        this.circleFirst = new THREE.Mesh( geometry, material ); 
        this.circleSecond = new THREE.Mesh( geometry, material2 ); 
        this.circleThird = new THREE.Mesh( geometry, material3 ); 
        this.circleFourth = new THREE.Mesh( geometry, material4 ); 
        this.circleFifth = new THREE.Mesh( geometry, material5 ); 
        this.circleFinal = new THREE.Mesh( geometry, material6 ); 

        this.circleFirst.position.y = -0.24
        this.circleSecond.position.y = -0.23
        this.circleThird.position.y = -0.22
        this.circleFourth.position.y = -0.21
        this.circleFifth.position.y = -0.20
        this.circleFinal.position.y = -0.19 

        this.circleSecond.position.x = this.sizes.width * 0.0012;
        this.circleThird.position.x = -2;
        this.circleThird.position.z = this.sizes.height *0.0029;
        this.circleFourth.position.x = -2.2;
        this.circleFourth.position.z = this.sizes.height *0.004;
        this.circleFifth.position.x = -0.15;
        this.circleFifth.position.z = this.sizes.height *0.007;
        this.circleFinal.position.x = this.sizes.width * 0.0025;
        this.circleFinal.position.z = -5;

        this.circleFirst.scale.set(0, 0, 0)
        this.circleSecond.scale.set(0, 0, 0)
        this.circleThird.scale.set(0, 0, 0)
        this.circleFourth.scale.set(0, 0, 0)
        this.circleFifth.scale.set(0, 0, 0)
        this.circleFinal.scale.set(0, 0, 0) 

        this.circleFirst.rotation.x =
        this.circleSecond.rotation.x =
        this.circleThird.rotation.x =
        this.circleFourth.rotation.x =
        this.circleFifth.rotation.x =
        this.circleFinal.rotation.x =
            -Math.PI / 2;

        this.circleFirst.receiveShadow =
        this.circleSecond.receiveShadow =
        this.circleThird.receiveShadow =
        this.circleFourth.receiveShadow = 
        this.circleFifth.receiveShadow = 
        this.circleFinal.receiveShadow = 
            true;

        this.scene.add(this.circleFirst);
        this.scene.add(this.circleSecond);
        this.scene.add(this.circleThird);
        this.scene.add(this.circleFourth);
        this.scene.add(this.circleFifth);
        this.scene.add(this.circleFinal);
    }

    resize(){

    }

    update(){

    }
}