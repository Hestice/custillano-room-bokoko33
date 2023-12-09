import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;

        this.lampLight = this.experience.world.room.lampLight;
        this.addLight = this.experience.world.room.pointLight;
        this.theme = this.experience.world.theme.theme;
        
        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThird = this.experience.world.floor.circleThird;
        this.circleFourth = this.experience.world.floor.circleFourth;
        this.circleFifth = this.experience.world.floor.circleFifth;
        this.circleFinal = this.experience.world.floor.circleFinal;

        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";
        

        this.setSmoothScroll();
        this.setScrollTrigger();
        
        console.log(this.roomChildren);
        // console.log(this.roomChildren.thin_book.rotation);
        // console.log(this.roomChildren.thin_book.position);
    }

    setSmoothScroll(){  
        // this.asscroll = this.();
    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            // desktop
            "(min-width: 969px)": ()=> {
                this.room.scale.set(0.2, 0.2, 0.2);
                //first section
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }            
                }).to(this.room.position, {
                    x: ()=>{
                        return this.sizes.width * 0.0012;
                    },
                }, "same"
                ).to(this.room.scale, {
                    x: 0.17,
                    y: 0.17,
                    z: 0.17,
                }, "same"
                );

                //second section
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.position, {
                    x: ()=>{
                        return -2;
                    },
                    z: ()=>{
                        return this.sizes.height *0.0029
                    }
                }, "same" 
                ).to(this.room.scale, {
                    x: 0.6,
                    y: 0.6,
                    z: 0.6,
                }, "same"
                );

                //third section
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.position, {
                    x: ()=>{
                        return -1.65;
                    },
                    z: ()=>{
                        return this.sizes.height *0.0021
                    }
                }, "same" 
                ).to(this.room.scale, {
                    x: 0.55,
                    y: 0.55,
                    z: 0.55,
                }, "same"
                ).to(this.room.position, {
                    x: ()=>{
                        return -2.2;
                    },
                    z: ()=>{
                        return this.sizes.height *0.004
                    }
                }, "same2"
                ).to(this.room.scale, {
                    x: 0.85,
                    y: 0.85,
                    z: 0.85,
                }, "same2");
            
                //fourth section
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale, {
                    x: 0.4,
                    y: 0.4,
                    z: 0.4,
                }
                ).to(this.room.position, {
                    x: ()=>{
                        return -0.15;
                    },
                    z: ()=>{
                        return this.sizes.height *0.007
                    }
                }
                );
                //fifth section
                this.fifthMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".fifth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.position, {
                    x: ()=>{
                        return this.sizes.width * 0.0025;
                    },
                    z: ()=>{
                        return -5;
                    }
                }, "same"
                ).to(this.room.scale, {
                    x: 0.7,
                    y: 0.7,
                    z: 0.7,
                }, "same"
                );

                //finale section
                this.finalMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".final-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.position, {
                    x: ()=>{
                        return this.sizes.width * -0.0012;
                    },
                    z: ()=>{
                        return this.sizes.height *0.001;
                    }
                }, "same"
                ).to(this.room.scale, {
                    x: 0.2,
                    y: 0.2,
                    z: 0.2,
                }, "same"
                );
             },
            // mobile
            "(max-width: 968px)": ()=> {

                this.room.scale.set(0.13, 0.13, 0.13);
                this.room.position.set(0, 0, 0);
                //first section
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }            
                }).to(this.room.scale, {
                    x: 0.15,
                    y: 0.15,
                    z: 0.15,
                }, "same"
                );

                //second section
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.position, {
                    x: ()=>{
                        return -0.3;
                    },
                    z: ()=>{
                        return this.sizes.height *0.005
                    }
                }, "same" 
                ).to(this.room.scale, {
                    x: 0.6,
                    y: 0.6,
                    z: 0.6,
                }, "same"
                ).to(this.room.position, {
                    y: 0.6,
                }, "same"
                );

                //picture frame
                this.firstMove2Timeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "center center",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }            
                }).to(this.roomChildren.picture_frame.position, {
                    x: 1.4157,
                    y: 16.5373 ,
                    z: 37.1496  ,
                },"same"
                ).to(this.roomChildren.picture_frame.scale, {
                    x: 13,
                    y: 13,
                    z: 13,
                },"same"
                ).to(this.roomChildren.picture_frame.rotation, {
                    y: 6.4,
                },"same"
                );

                //third section
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.position, {
                    x: ()=>{
                        return -2.25;
                    },
                    z: ()=>{
                        return this.sizes.height *0.0035
                    }
                }, "same" 
                ).to(this.room.scale, {
                    x: 0.65,
                    y: 0.65,
                    z: 0.65,
                }, "same"
                ).to(this.room.position, {
                    x: ()=>{
                        return -3.4;
                    },
                    z: ()=>{
                        return this.sizes.height *0.0075
                    }
                }, "same2"
                ).to(this.room.scale, {
                    x: 0.85,
                    y: 0.85,
                    z: 0.85,
                }, "same2");
            
                //fourth section
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale, {
                    x: 0.55,
                    y: 0.55,
                    z: 0.55,
                }
                ).to(this.room.position, {
                    x: ()=>{
                        return 1;
                    },
                    z: ()=>{
                        return this.sizes.height *0.014
                    }
                }
                );
                //fifth section
                this.fifthMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".fifth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.position, {
                    x: ()=>{
                        return this.sizes.width * 0.005;
                    },
                    z: ()=>{
                        return -5;
                    }
                }, "same"
                ).to(this.room.scale, {
                    x: 0.7,
                    y: 0.7,
                    z: 0.7,
                }, "same"
                );

                //finale section
                this.finalMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".final-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.position, {
                    x: ()=>{
                        return 0;
                    },
                    y: ()=>{
                        return 0;
                    },
                    z: ()=>{
                        return this.sizes.height *0.002;
                    }
                }, "same"
                ).to(this.room.scale, {
                    x: 0.13,
                    y: 0.13,
                    z: 0.13,
                }, "same"
                );
            },
            
            // all
            all: ()=> {

                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section) => {
                    this.progressWrapper =
                        section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if (section.classList.contains("right")) {
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    } else {
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },
                    });
                });

            //picture frame
            this.firstMove2Timeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".first-move",
                    start: "center center",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }            
            }).to(this.roomChildren.picture_frame.position, {
                x: 1.4157,
                y: 16.5373 ,
                z: 37.1496  ,
            },"same"
            ).to(this.roomChildren.picture_frame.scale, {
                x: 13,
                y: 13,
                z: 13,
            },"same"
            ).to(this.roomChildren.picture_frame.rotation, {
                y: 6.4,
            },"same"
            );

            this.firstMove2TimelineClosing = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }            
            }).to(this.roomChildren.picture_frame.position, {
                x: 2.360583543777466,
                y: 3.097943067550659 ,
                z: -2.2040770053863525  ,
            },"same"
            ).to(this.roomChildren.picture_frame.scale, {
                x: 1,
                y: 1,
                z: 1,
            },"same"
            ).to(this.roomChildren.picture_frame.rotation, {
                y: -0.5127268226480698,
            },"same"
            )
            
            // thin book
            this.secondMove2Timeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".second-move",
                    start: "center center",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },
            }).to(this.roomChildren.thin_book.children[21].rotation, {
                y: 0,
                ease: "power1.in",
            },"same" 
            ).to(this.roomChildren.thin_book.position, {
                x: 0.7,
                y: 8,
                z: 9.66667,
            }, "same" 
            ).to(this.roomChildren.thin_book.scale, {
                x: 4.5,
                y: 4.5,
                z: 4.5,
            }, "same" 
            ).to(this.roomChildren.thin_book.rotation, {
                x: 3.1415924550989778,
                y: -1.3171478792206157,
                z: 0.9831934341594485,
            }, "same" 
            );

            this.thirdMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },
            }).to(this.roomChildren.thin_book.children[21].rotation, {
                y: 3.14,
                ease: "power1.in",
            },"same" 
            ).to(this.roomChildren.thin_book.position, {
                x: -1.2172966003417969,
                y: 2.712033271789551,
                z: 1.7924392223358154,
            }, "same" 
            ).to(this.roomChildren.thin_book.scale, {
                x: 1,
                y: 1,
                z: 1,
            }, "same" 
            ).to(this.roomChildren.thin_book.rotation, {
                x: 1.570796505608895,
                y: -1.5707963267948966,
                z: 0,
            }, "same" 
            );
            
                
                // circles -------
            //first section
            this.firstMoveCircleTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }            
            }).to(this.circleFirst.scale, {
                x: 3,
                y: 3,
                z: 3,
            }, "same").to(this.circleFirst.position, {
                x: ()=>{
                    return this.sizes.width * 0.0012;
                },
            }, "same");

            //second section
            this.secondMoveCircleTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },
            }).to(this.circleSecond.scale, {
                x: 3,
                y: 3,
                z: 3,
            },"same").to(this.circleSecond.position, {
                x: ()=>{
                    return -2;
                },
                z: ()=>{
                    return this.sizes.height *0.0029
                }
            },"same");
 
            //third section
            this.thirdMoveCircleTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },
            }).to(this.circleThird.scale, {
                x: 3,
                y: 3,
                z: 3,
            }).to(this.circleThird.position, {
                x: ()=>{
                    return -1.65;
                },
                z: ()=>{
                    return this.sizes.height *0.0021
                }
            },"same").to(this.circleThird.position, {
                x: ()=>{
                    return -2.2;
                },
                z: ()=>{
                    return this.sizes.height *0.004
                }
            },"same");
        
            //fourth section
            this.fourthMoveCircleTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".fourth-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },
            }).to(this.circleFourth.scale, {
                x: 3,
                y: 3,
                z: 3,
            },"same").to(this.circleFourth.position, {
                x: ()=>{
                    return -0.15;
                },
                z: ()=>{
                    return this.sizes.height *0.007
                }
            },"same"
            );
            //fifth section
            this.fifthMoveCircleTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".fifth-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },
            }).to(this.circleFifth.scale, {
                x: 3,
                y: 3,
                z: 3,
            },"same").to(this.circleFifth.position, {
                x: ()=>{
                    return this.sizes.width * 0.0025;
                },
                z: ()=>{
                    return -5;
                }
            }, "same"
            );

            //finale section
            this.finalMoveCircleTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".final-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },
            }).to(this.circleFinal.scale, {
                x: 3,
                y: 3,
                z: 3,
            },"same").to(this.circleFinal.position, {
                x: ()=>{
                    return this.sizes.width * -0.0012;
                },
                z: ()=>{
                    return this.sizes.height *0.001;
                }
            }, "same"
            );

               //mini platform animations

            //fifth section
            this.secondPartMailTimeline = new GSAP.timeline({
            scrollTrigger:{
                trigger: ".fifth-move",
                start: "center center",
            },
            });

            this.room.children.forEach(child =>{
                if(child.name === "Outside_Land001"){
                    this.first = GSAP.to(child.position, {
                        x: -1.8116,
                        z: 5.26703,
                        ease: "back.out(2)",
                        duration: 0.3,
                    });
                }
            });

            this.room.children.forEach(child =>{
                if(child.name === "mailbox_Stand001"){
                    this.second = GSAP.to(child.scale, {
                        x: 1,
                        z: 1,
                        y: 1,
                        duration: 0.2,
                    });
                }
            });
            this.room.children.forEach(child =>{
                if(child.name === "Lamp001"){
                    this.third = GSAP.to(child.scale, {
                        x: 1,
                        z: 1,
                        y: 1,
                        ease: "back.out(2)",
                        duration: 0.2,
                    });
                }
            });
            this.room.children.forEach(child =>{
                if(child.name === "Soil"){
                    this.fourth = GSAP.to(child.scale, {
                        x: 1,
                        z: 1,
                        y: 1,
                        ease: "back.out(2)",
                        duration: 0.2,
                    });
                }
            });
            this.room.children.forEach(child =>{
                if(child.name === "Flower_Stem_1"){
                    this.fifth = GSAP.to(child.scale, {
                        x: 1,
                        z: 1,
                        y: 1,
                        ease: "back.out(2)",
                        duration: 0.1,
                    });
                }
            });
            this.room.children.forEach(child =>{
                if(child.name === "Flower_1"){
                    this.sixth = GSAP.to(child.scale, {
                        x: 1,
                        z: 1,
                        y: 1,
                        ease: "back.out(2)",
                        duration: 0.1,
                    });
                }
            });
            this.room.children.forEach(child =>{
                if(child.name === "Flower_Stem_1001"){
                    this.seventh = GSAP.to(child.scale, {
                        x: 1,
                        z: 1,
                        y: 1,
                        ease: "back.out(2)",
                        duration: 0.1,
                    });
                }
            });
            this.room.children.forEach(child =>{
                if(child.name === "Flower_2"){
                    this.eight = GSAP.to(child.scale, {
                        x: 1,
                        z: 1,
                        y: 1,
                        ease: "back.out(2)",
                        duration: 0.1,
                    });
                }
            });
            this.room.children.forEach(child =>{
                if(child.name === "Path003"){
                    this.ninth = GSAP.to(child.scale, {
                        x: 1,
                        z: 1,
                        y: 1,
                        ease: "back.out(2)",
                        duration: 0.2,
                    });
                }
            });
            this.room.children.forEach(child =>{
                if(child.name === "Path004"){
                    this.tenth = GSAP.to(child.scale, {
                        x: 1,
                        z: 1,
                        y: 1,
                        ease: "back.out(2)",
                        duration: 0.2,
                    });
                }
            });
            this.room.children.forEach(child =>{
                if(child.name === "Path005"){
                    this.eleventh = GSAP.to(child.scale, {
                        x: 1,
                        z: 1,
                        y: 1,
                        ease: "back.out(2)",
                        duration: 0.2,
                    });
                }
            });

            this.secondPartMailTimeline.add(this.first);
            this.secondPartMailTimeline.add(this.second);
            this.secondPartMailTimeline.add(this.third);
            this.secondPartMailTimeline.add(this.fourth);
            this.secondPartMailTimeline.add(this.fifth);
            this.secondPartMailTimeline.add(this.sixth);
            this.secondPartMailTimeline.add(this.seventh);
            this.secondPartMailTimeline.add(this.eight);
            this.secondPartMailTimeline.add(this.ninth);
            this.secondPartMailTimeline.add(this.tenth);
            this.secondPartMailTimeline.add(this.eleventh);

            },
        });
    }

    switchTheme(theme){
        this.theme = theme;
    }

    resize(){

    }

    update(){
        // console.log(this.lampLight.intensity, this.addLight.intensity, this.theme)
    }
}