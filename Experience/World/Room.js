import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};
        this.lerp = {   
            current: 0,
            target: 0,
            ease:0.1
        };
        
        GSAP.registerPlugin(ScrollTrigger);
        
        this.setModel();
        this.setHoverEffects();
        this.setAnimation();
        this.onMouseMove();
        this.lightingLerp();
        
    }

    lightingLerp(a, b, t) {
        const result = a + t * (b - a);
        return Math.max(result, 0.01);
    }
    

    setModel(){
        this.actualRoom.children.forEach((child)=>{
            child.castShadow = true;
            child.receiveShadow = true;
            if (child instanceof THREE.Group){
                child.children.forEach((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            }
            // console.log(child);
            if (child.name === "Monitor"){
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
                child.children[2].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.ppm,
                });
            }

            if (child.name === "SmartphoneBody"){
                child.children[4].material = new THREE.MeshPhysicalMaterial();
                child.children[4].material.roughness = 0.03;
                child.children[4].material.color.set(0xffffff);
                child.children[4].material.ior =1.18;
                child.children[4].material.transmission = 1;
                child.children[4].material.opacity = 1;
                child.children[4].material.metalness = 0.05;
                child.children[4].material.specularintensity = 1;
                child.children[4].material.depthWrite = false;
                child.children[4].material.depthTest = false;
            }

            if (child.name === "SmartphoneBody"){
                child.children[4].children[0].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.phonescreen,
                });
                child.children[4].children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.plmnav,
                });
                child.children[4].children[2].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.virtuallab,
                });
                child.children[4].children[3].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.supplychain,
                });
                child.children[4].children[4].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.payrollviewer,
                });
            }

            if (child.name === "Lamp_Shade001"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0.35;
                child.material.color.set(0xededed);
                child.material.ior =2;
                child.material.transmission = 0.61;
                child.material.opacity = 1;
                child.material.specularintensity = 0.26;
                child.material.depthWrite = false;
                child.material.depthTest = false;
            }

            if (child.name === "Lamp001"){
                child.children[1].material = new THREE.MeshPhysicalMaterial();
                child.children[1].material.roughness = 0.35;
                child.children[1].material.color.set(0xededed);
                child.children[1].material.ior =2;
                child.children[1].material.transmission = 0.61;
                child.children[1].material.opacity = 1;
                child.children[1].material.specularintensity = 0.26;
                child.children[1].material.depthWrite = false;
                child.children[1].material.depthTest = false;
            }

            if (child.name === "Outside_Land001"){
                child.position.x = 0.603951;
                child.position.z = 2.85148;
            }
            // if (child.name === "Lamp001" || 
            //     child.name === "mailbox_Stand001" || 
            //     child.name === "Flower_Stem_1" ||
            //     child.name === "Flower_Stem_1001" ||
            //     child.name === "Soil" ||
            //     child.name === "Flower_1" ||
            //     child.name === "Flower_2" ||
            //     child.name === "Path003" ||
            //     child.name === "Path004" ||
            //     child.name === "Path005" ||
            //     child.name === "Wall_2"){
            //         child.scale.set (0, 0, 0);
            // }
            child.scale.set (0, 0, 0);
            if(child.name === "Intro_Cube"){
                // child.scale.set (1, 1, 1);
                child.position.set(0, -1.1, 0);
                child.rotation.y = Math.PI/4
            }
    
            this.roomChildren[child.name.toLowerCase()] = child;
        });

        this.lampLight = new THREE.PointLight( 0xffffff, 0, 10, 3.5);
        this.lampLight.position.set( 2.028735876083374, 3.87467885017395, -2.8473055362701416);
        this.actualRoom.add( this.lampLight );
        this.roomChildren["lampLight"] = this.lampLight;

        this.pointLight = new THREE.PointLight( 0xffffff, 0, 7, 3.5);
        this.pointLight.position.set( 2.028735876083374, 5, -2.8473055362701416);
        this.actualRoom.add( this.pointLight );
        this.roomChildren["pointLight"] = this.pointLight;

        this.outsideLight = new THREE.PointLight( 0xffffff, 0, 10, 3.5);
        this.outsideLight.position.set( -1.54342, 1.63564 , 6.51323);
        this.actualRoom.add( this.outsideLight );
        this.roomChildren["outsideLight"] = this.outsideLight;

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.2,0.2,0.2);
        // this.actualRoom.rotation.y = Math.PI;
        this.roomChildren.thin_book.children.forEach((thinBookChild)=>{
            if(thinBookChild.name === "Thin_Book001" ||
            thinBookChild.name === "Cube174" ||
            thinBookChild.name === "Cube174_1" ||
            thinBookChild.name === "1_main"
            ){
                thinBookChild.scale.set(1, 1, 1);
            }else{
                thinBookChild.scale.set(0, 0, 0);
            }
           
        });

        this.roomChildren.smartphonebody.children[4].children.forEach((smartphoneChild)=>{
            if(smartphoneChild.name === "0_ScreenContent"){
                smartphoneChild.scale.set(1, 1, 1);
            }else{
                smartphoneChild.scale.set(0, 0, 0);
            }
           
        });

        this.roomChildren.monitor.children[2].scale.set(0,0,0);
        console.log(this.roomChildren);
    }

    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.spin = this.mixer.clipAction(this.room.animations[0]);
        this.spin.play();
    }

    setHoverEffects() {
        console.log("setHoverInitialized");
    
        this.roomChildren.thin_book.children[2].scale.set(1, 1, 1);
        this.previousTechPage = this.roomChildren.thin_book.children[2];
        this.previousMobileProject = this.roomChildren.smartphonebody.children[4].children[0];

        this.flutter = document.querySelector('.flutter');
        this.three = document.querySelector('.three');
        this.bootstrap = document.querySelector('.bootstrap');
        this.react = document.querySelector('.react');
        this.next = document.querySelector('.next');
        this.laravel = document.querySelector('.laravel');
        this.node = document.querySelector('.node');
        this.firebase = document.querySelector('.firebase');
        this.mysql = document.querySelector('.mysql');
        this.mariadb = document.querySelector('.mariadb');
        this.sqlite = document.querySelector('.sqlite');
        this.vite = document.querySelector('.vite');
        this.figma = document.querySelector('.figma');
        this.blender = document.querySelector('.blender');
        this.unity = document.querySelector('.unity');
        this.unreal = document.querySelector('.unreal');
        this.sanity = document.querySelector('.sanity');
        this.git = document.querySelector('.git');

        this.plmnav = document.querySelector('.plm-nav');
        this.vlab = document.querySelector('.virtual-lab');
        this.ppm = document.querySelector('.project-proper-management');
        this.supply = document.querySelector('.supply-chain');
        this.payroll = document.querySelector('.payroll-viewer');
    
        // Function to handle mouseover events
        const handleMouseover = (currentTechPageIndex) => {
            this.tempPreviousTechPage = this.previousTechPage;
            this.currentTechPage = this.roomChildren.thin_book.children[currentTechPageIndex];
            this.previousTechPage = this.currentTechPage;
        
            if (this.tempPreviousTechPage === this.currentTechPage) {
                return;
            }
        
            const tl = new GSAP.timeline();
        
            tl.to(this.roomChildren.thin_book.children[21].rotation, {
                y: 3.14,
                ease: "power1.in",
                duration: 0.2,
            })
            .to(this.tempPreviousTechPage.scale, { 
                x: 0,
                y: 0,
                z: 0,
                duration: 0,
            }, "same")
            .to(this.currentTechPage.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0,
            }, "same")
            .to(this.roomChildren.thin_book.children[21].rotation, {
                y: 0,
                ease: "power1.in",
                duration: 0.2,
            });
        };  
        
        const handleProjectMobile = (currentProjectIndex) =>{
            this.tempPreviousMobileProject = this.previousMobileProject;
            this.currentMobileProject = this.roomChildren.smartphonebody.children[4].children[currentProjectIndex];
            this.previousMobileProject = this.currentMobileProject;
        
            const tlMobile = new GSAP.timeline();
        
            tlMobile.to(this.tempPreviousMobileProject.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0,
            },"same").to(this.currentMobileProject.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0,
            },"same");
        };

        const handleProjectWeb = (currentProjectIndex) =>{
            const tlWeb = new GSAP.timeline();
            tlWeb.to(this.roomChildren.monitor.children[currentProjectIndex].scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0,
            });
        };

        const handleProjectWebOff = (currentProjectIndex) =>{
            const tlWeb = new GSAP.timeline();
            tlWeb.to(this.roomChildren.monitor.children[currentProjectIndex].scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0,
            });
        };

        this.plmnav.addEventListener('mouseover', () => {
            handleProjectMobile(1);
        });

        this.vlab.addEventListener('mouseover', () => {
            handleProjectMobile(2);
        });

        this.ppm.addEventListener('mouseover', () => {
            handleProjectWeb(2);
        });

        this.ppm.addEventListener('mouseleave', () => {
            handleProjectWebOff(2);
        });

        this.supply.addEventListener('mouseover', () => {
            handleProjectMobile(3);
        });

        this.payroll.addEventListener('mouseover', () => {
            handleProjectMobile(4);
        });
        
        // Event listeners for buttons
        this.flutter.addEventListener('mouseover', () => {
            handleMouseover(12);
        });
    
        this.three.addEventListener('mouseover', () => {
            handleMouseover(14);
        }); 
        
        this.bootstrap.addEventListener('mouseover', () => {
            handleMouseover(15);
        });
    
        this.react.addEventListener('mouseover', () => {
            handleMouseover(16);
        });

        this.next.addEventListener('mouseover', () => {
            handleMouseover(17);
        });
    
        this.laravel.addEventListener('mouseover', () => {
            handleMouseover(18);
        });

        this.node.addEventListener('mouseover', () => {
            handleMouseover(19);
        });
    
        this.firebase.addEventListener('mouseover', () => {
            handleMouseover(20);
        });

        this.mysql.addEventListener('mouseover', () => {
            handleMouseover(3);
        });
    
        this.mariadb.addEventListener('mouseover', () => {
            handleMouseover(4);
        });

        this.sqlite.addEventListener('mouseover', () => {
            handleMouseover(5);
        });
    
        this.vite.addEventListener('mouseover', () => {
            handleMouseover(6);
        });

        this.figma.addEventListener('mouseover', () => {
            handleMouseover(7);
        });
    
        this.blender.addEventListener('mouseover', () => {
            handleMouseover(8);
        });

        this.unity.addEventListener('mouseover', () => {
            handleMouseover(9);
        });
    
        this.unreal.addEventListener('mouseover', () => {
            handleMouseover(10);
        });

        this.sanity.addEventListener('mouseover', () => {
            handleMouseover(11);
        });
    
        this.git.addEventListener('mouseover', () => {
            handleMouseover(13);
        });
 
        console.log("setHoverEnded");
    }    

    
    
    onMouseMove(){
        window.addEventListener("mousemove", (e)=>{
            this.rotation = ((e.clientX - window.innerWidth/2)*2)/innerWidth;
            this.lerp.target = this.rotation * 0.05;
        });
    }

    switchTheme(theme){
        if(theme === "dark"){
            this.theme = "dark"; 
        }else{
            this.theme = "light";
            GSAP.to(this.pointLight, {
                intensity: 0,
            });
            GSAP.to(this.lampLight, {
                intensity: 0,
            });
            GSAP.to(this.outsideLight, {
                intensity: 0,
            });
        }
    }

    resize(){

    }

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.002);
        if(this.theme === "dark" && this.roomChildren.lamp_shade001.scale.x === 1){
            GSAP.to(this.pointLight, {
                intensity: this.lightingLerp(0.01, 1, (this.actualRoom.scale.x - 0.2) / (0.85 - 0.2)),
            });
            
            GSAP.to(this.lampLight, {
                intensity: this.lightingLerp(0.01, 1, (this.actualRoom.scale.x - 0.2) / (0.85 - 0.2)),
            });
        }

        if(this.theme === "dark" && this.roomChildren.lamp001.scale.x === 1){
            GSAP.to(this.outsideLight, {
                intensity: this.lightingLerp(0.01, 1, (this.actualRoom.scale.x - 0.2) / (0.85 - 0.2)),
            });
        }
    }
}