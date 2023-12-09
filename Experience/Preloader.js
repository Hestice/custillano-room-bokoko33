import EventEmitter from "events";
import Experience from "./Experience.js";
import GSAP from "gsap";
import convert from "./Utils/convertDivsToSpans.js";

export default class Preloader extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) =>{
            this.device = device;
        })

        this.world.on("worldready", ()=>{
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets(){
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-sub"));
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
    }

    firstIntro(){
        // console.log("get initial rotation: ", this.roomChildren.thin_book001.rotation);
        // console.log("target rotation:", this.roomChildren.closed_thin_book.rotation);
        return new Promise ((resolve)=>{
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
            this.timeline.to(".preloader", {
                opacity:0,
                delay: 1,
                ease: "power1.out",
                duration: 0.1,
                onComplete: ()=>{
                    document.querySelector(".preloader").classList.add("hidden");
                }
            });
            if(this.device === "desktop"){
                this.timeline.to(this.roomChildren.intro_cube.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.5)",
                    duration: 0.4,
                }).to(this.room.position, {
                    x: -1,
                    ease: "power1.out",
                    duration: 0.7,
                });
            } else {
                this.timeline.to(this.roomChildren.intro_cube.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.5)",
                    duration: 0.4,
                }).to(this.room.position, {
                    z: -0.8,
                    ease: "power1.out",
                    duration: 0.7,
                });
            }
            this.timeline.to(".intro-text .animatedis", {
                yPercent: 0,
                stagger: 0.045,
                ease: "back.out(1.7)",
            }).to(".arrow-svg-wrapper", {
                opacity: 1,
            },"same").to(".toggle-bar", {
                opacity: 1,
                onComplete:resolve,
            },"same");
        });
    }

    secondIntro(){
        return new Promise ((resolve)=>{
            this.secondTimeline = new GSAP.timeline();
            this.secondTimeline.to(".intro-text .animatedis", {
                yPercent: 100,
                stagger: 0.045,
                ease: "back.in(1.7)",
            },"fadeout").to(".arrow-svg-wrapper", {
                opacity: 0,
            },"fadeout").to(this.room.position, {
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out",
            },"same"
            ).to(this.roomChildren.intro_cube.rotation, {
                y: 2 * Math.PI + Math.PI / 4,
                ease: "power1.out",
            },"same"
            ).to(this.roomChildren.intro_cube.scale, {
                x: 6.97806,
                y: 6.97806,
                z: 6.97806,
                ease: "power1.out",
            },"same"
            ).to(this.camera.orthographicCamera.position, {
                y: 6.25,
                ease: "power1.out",
            },"same"
            ).to(this.roomChildren.intro_cube.position, {
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out",
            },"same"
            ).to(this.roomChildren.wall_1.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "power3.in",
            },"<0.17").to(this.roomChildren.wall_2.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "power3.in",
            },"<0.17").to(this.roomChildren.intro_cube.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.3,
                ease: "power1.out",
            },"introanimation").to(".hero-main-title .animatedis", {
                yPercent: 0,
                stagger: 0.06,
                ease: "back.out(1.7)",
            },"introanimation").to(".hero-main-description .animatedis", {
                yPercent: 0,
                stagger: 0.06,
                ease: "back.out(1.7)",
            },"introanimation").to(".first-sub .animatedis", {
                yPercent: 0,
                stagger: 0.06,
                ease: "back.out(1.7)",
            },"introanimation").to(".second-sub .animatedis", {
                yPercent: 0,
                stagger: 0.06,
                ease: "back.out(1.7)",
            },"introanimation")
            //Furniture animations -------------------------------------------
            .to(this.roomChildren.bed_1.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)", 
            },">-0.2").to(this.roomChildren.mini_cabinet.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.2").to(this.roomChildren.cabinet.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.2").to(this.roomChildren.wall_2.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.3,
                ease: "power1.out",
            }, ">-0.2").to(this.roomChildren.window.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "power1.out",
            },">-0.2").to(this.roomChildren.desk.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.1").to(this.roomChildren.carpet001.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.2").to(this.roomChildren.stool.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.2").to(this.roomChildren.box_2.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.3").to(this.roomChildren.box_1.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.2").to(this.roomChildren.pillow_1.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.3").to(this.roomChildren.pillow_1001.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",//next objects
            },">-0.2").to(this.roomChildren.lamp_stand001.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.2").to(this.roomChildren.lamp_shade001.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.2").to(this.roomChildren.picture_frame.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.2").to(this.roomChildren.coffee.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.1").to(this.roomChildren.monitor.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.2").to(this.roomChildren.keyboard.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.2").to(this.roomChildren.mouse.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.3").to(this.roomChildren.smartphonebody.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.3").to(this.roomChildren.thin_book.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.1").to(this.roomChildren.thin_book.children[21].rotation, {
                y: 3.1,
                duration: 0.3,
                ease: "power1.in",
            },">-0.1").to(this.roomChildren.guitar_stand001.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.2").to(this.roomChildren.guitar.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)", //next objects 2
            },">-0.1").to(this.roomChildren.poster_square.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.6").to(this.roomChildren.poster_portrait001.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.7").to(this.roomChildren.poster_landscape.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.6").to(this.roomChildren.clock_body.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.5").to(this.roomChildren.clock_long_hand.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.7").to(this.roomChildren.clock_short_hand.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.5").to(this.roomChildren.trash_can001.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.4").to(this.roomChildren.shelf_1.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.4").to(this.roomChildren.shelf_2.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.1").to(this.roomChildren.thick_book_1.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.2").to(this.roomChildren.thick_book_2.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.2").to(this.roomChildren.thick_book_3.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.2").to(this.roomChildren.thick_book_4.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.1").to(this.roomChildren.thick_book_5.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.2").to(this.roomChildren.thin_book_1.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.2").to(this.roomChildren.thin_book_2.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.3").to(this.roomChildren.purple_ball.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.3").to(this.roomChildren.outdoor_carpet001.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.3").to(this.roomChildren.chair_lower.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",//next objects
            },">-0.2").to(this.roomChildren.chair_upper.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",//next objects
            },">-0.2").to(this.roomChildren.chair_upper.rotation, {
                y: 4 * Math.PI + Math.PI / 4,
                ease: "power2.out",
                duration: 1,
            },">-0.2").to(this.roomChildren.outside_land001.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.6").to(this.roomChildren.wheel_base.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.6").to(this.roomChildren.wheel.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.2").to(this.roomChildren.plant_pot001.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.6").to(this.roomChildren.flower_stem003.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "back.out(1)",
            },">-0.2").to(".arrow-svg-wrapper", {
                opacity: 1,
                onComplete:resolve,
            },);
        });
    }

    onScroll(e){
        if(e.deltaY > 0){
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e){
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e){
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if(difference > 0 ){
            this.playSecondIntro();
            this.removeEventListeners();
        }
        this.initialY = null;
    }

    removeEventListeners(){
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro(){
        await this.firstIntro();
        this.moveFlag =true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }

    async playSecondIntro(){
        this.moveFlag = false;
        this.scaleFlag = true;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enablecontrols");
    }

    move(){
        if(this.device === "desktop"){
            this.room.position.set(-1, 0, 0);
        } else {
            this.room.position.set(0,0,-0.8)
        }
    }

    scale(){
        if(this.device === "desktop"){
            this.scaleAnimation = new GSAP.timeline();
            this.scaleAnimation.to(this.room.scale, {
                x:0.2, 
                y:0.2, 
                z:0.2,
                ease: "power1.out",
            });
        } else {
            this.scaleAnimation = new GSAP.timeline();
            this.scaleAnimation.to(this.room.scale, {
                x:0.13, 
                y:0.13, 
                z:0.13,
                ease: "power1.out",
            });
        }
    }

    update(){
        if(this.moveFlag){
            this.move();
        }
        if(this.scaleFlag){
            this.scale();
        }
    }

}