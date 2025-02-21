'use client'
import React from 'react'
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Container from './ui/container';
import Icons from './ui/icons'; 
import { Button } from './ui/button';
import { OrbitingCircles } from './magicui/orbiting-circles';


import Marquee from '@/components/Marquee'

const icons = [
    { src: "https://skillicons.dev/icons?i=react", alt: "React logo" },
    { src: "https://skillicons.dev/icons?i=mongodb", alt: "MongoDB logo" },
    { src: "https://skillicons.dev/icons?i=express", alt: "Express logo" },
    { src: "https://skillicons.dev/icons?i=nodejs", alt: "Node.js logo" },
    { src: "https://skillicons.dev/icons?i=nextjs", alt: "Next.js logo" },
    { src: "https://skillicons.dev/icons?i=bootstrap", alt: "Bootstrap logo" },
    { src: "https://skillicons.dev/icons?i=html", alt: "HTML5 logo" },
    { src: "https://skillicons.dev/icons?i=css", alt: "CSS3 logo" },
    { src: "https://skillicons.dev/icons?i=tailwind", alt: "Tailwind CSS logo" },
    { src: "https://skillicons.dev/icons?i=js", alt: "JavaScript logo" },
    { src: "https://skillicons.dev/icons?i=ts", alt: "TypeScript logo" },
    { src: "https://skillicons.dev/icons?i=java", alt: "Java logo" },
    { src: "https://skillicons.dev/icons?i=prisma", alt: "Prisma logo" },
    { src: "https://skillicons.dev/icons?i=cpp", alt: "C++ logo" },
    { src: "https://skillicons.dev/icons?i=gmail", alt: "Gmail logo" },
    { src: "https://skillicons.dev/icons?i=git", alt: "Git logo" },
    { src: "https://skillicons.dev/icons?i=mysql", alt: "MySQL logo" },
    { src: "https://skillicons.dev/icons?i=firebase", alt: "Firebase logo" },
    { src: "https://skillicons.dev/icons?i=vite", alt: "Vite logo" },
    { src: "https://skillicons.dev/icons?i=discord", alt: "Discord logo" },
    { src: "https://skillicons.dev/icons?i=npm", alt: "NPM logo" },
    { src: "https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/youtube/default.svg", alt: "YouTube logo" },
    { src: "https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/discord/default.svg", alt: "Discord logo" },
    { src: "https://skillicons.dev/icons?i=vscode", alt: "VS Code logo" },
    { src: "https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/telegram/default.svg", alt: "Telegram logo" },
    { src: "https://skillicons.dev/icons?i=windows", alt: "Windows logo" },
    { src: "https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/linkedin/default.svg", alt: "LinkedIn logo" },
    { src: "https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/visualstudio/default.svg", alt: "Visual Studio logo" },
    {
      img: "Instagram logo",
      src: "https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/instagram/default.svg"
    },
    {
      img: "Gmail logo",
      src: "https://skillicons.dev/icons?i=gmail"
    },
    {
      img: "WhatsApp logo",
      src: "https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/whatsapp/default.svg"
    },
    {
      img: "GitHub logo",
      src: "https://skillicons.dev/icons?i=github"
    },
    {
      img: "LinkedIn logo",
      src: "https://skillicons.dev/icons?i=linkedin"
    },
    {
      img: "Instagram logo",
      src: "https://skillicons.dev/icons?i=instagram"
    }
  ];

const LandingPage = () => {
  return (
  
    <div className="relative flex flex-col items-center justify-center w-full py-20">

            <div className="absolute flex lg:hidden size-40 rounded-full bg-blue-500 blur-[10rem] top-0 left-1/2 -translate-x-1/2 -z-10"></div>

            <div className="flex flex-col items-center justify-center gap-y-8 relative">
                <Container className="hidden lg:flex absolute inset-0 top-0 mb-auto flex-col items-center justify-center w-full min-h-screen -z-10">
                    <OrbitingCircles
                        speed={0.5}
                        radius={300}
                    >
                        <Icons.circle1 className="size-4 text-foreground/70" />
                        <Icons.circle2 className="size-1 text-foreground/80" />
                    </OrbitingCircles>
                    <OrbitingCircles
                        speed={0.25}
                        radius={400}
                    >
                        <Icons.circle2 className="size-1 text-foreground/50" />
                        <Icons.circle1 className="size-4 text-foreground/60" />
                        <Icons.circle2 className="size-1 text-foreground/90" />
                    </OrbitingCircles>
                    <OrbitingCircles
                        speed={0.1}
                        radius={500}
                    >
                        <Icons.circle2 className="size-1 text-foreground/50" />
                        <Icons.circle2 className="size-1 text-foreground/90" />
                        <Icons.circle1 className="size-4 text-foreground/60" />
                        <Icons.circle2 className="size-1 text-foreground/90" />
                    </OrbitingCircles>
                </Container>

                <div className="flex flex-col items-center justify-center text-center gap-y-4 bg-background/0">
                    <Container className="relative hidden lg:block overflow-hidden">
                        <button className="group relative grid overflow-hidden rounded-full px-2 py-1 shadow-[0_1000px_0_0_hsl(0_0%_15%)_inset] transition-colors duration-200 mx-auto">
                            <span>
                                <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
                            </span>
                            <span className="backdrop absolute inset-[1px] rounded-full bg-background transition-colors duration-200 group-hover:bg-neutral-800" />
                            <span className="z-10 py-0.5 text-sm text-neutral-100 flex items-center">
                                <span className="px-2 py-[0.5px] h-[18px] tracking-wide flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-[9px] font-medium mr-2 text-white">
                                    NEW
                                </span>
                                Explore MEDIGO
                            </span>
                        </button>
                    </Container>
                    <Container delay={0.15}>
                        <h1 className="text-4xl md:text-4xl lg:text-7xl font-bold text-center !leading-tight max-w-4xl mx-auto">
                        Revolutionize your {" "}
                            <span className="">
                                Health {" "}
                            </span>
                            with AI Precision
                        </h1>
                    </Container>
                    <Container delay={0.2}>
                        <p className="max-w-xl mx-auto mt-2 text-base lg:text-lg text-center text-muted-foreground">
                        AI-powered health and education solutions to enhance well-being and empower learning.
                        </p>
                    </Container>
                    <Container delay={0.25} className="z-20">
                        <div className="flex items-center justify-center mt-6 gap-x-4">
                            <Link href="#" className="flex items-center gap-2 group">
                                <Button variant="white" size="lg">
                                    Start Free Trial
                                    <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-all duration-300" />
                                </Button>

                            </Link>
                        </div>
                    </Container>
                    <Container delay={0.3} className="relative">
                    <div className="relative flex items-center justify-center pt-20 w-full">
                    <div className="absolute top-1/8 left-1/2 -z-10 bg-gradient-to-r from-sky-500 to-blue-600 w-1/2 lg:w-3/4 -translate-x-1/2 h-1/4 -translate-y-1/2 inset-0 blur-[4rem] lg:blur-[10rem] animate-image-glow"></div>
                    <div className="hidden lg:block absolute -top-1/8 left-1/2 -z-20 bg-blue-600 w-1/4 -translate-x-1/2 h-1/4 -translate-y-1/2 inset-0 blur-[10rem] animate-image-glow"></div>
                <div className="absolute top-1/2 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 h-3/4 -translate-y-1/2 inset-0 blur-[10rem]"></div>
                <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl text-center flex justify-center  items-center">
                  <Image
                    src='/assets/robot.png'
                    alt="banner image"
                    width={1080} // Reduced size
                    height={1920} // Reduced size
                    quality={100}
                    className="rounded-md w-100 h-100  lg:rounded-xl bg-foreground/10 shadow-2xl overflow-hidden ring-1 ring-border"
                    
                  />
                </div>
                
              </div>
                        <div className="bg-gradient-to-t from-background to-transparent absolute bottom-0 inset-x-0 w-full h-1/2"></div>
                    </Container>
                    <div className='mt-5'>

                    <Marquee items={icons} speed={10} reverse={false} pauseOnHover />
                    </div>
                </div>

            </div>
        </div>
    )
};

export default LandingPage

