"use client";
import React, { useEffect, useRef } from 'react'
import courses from '../data/courses'
import { motion } from 'framer-motion'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Lenis from "@studio-freight/lenis";
import { useRouter } from 'next/navigation';


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);




const Page = () => {

  const router = useRouter();

  useEffect(() => {
    const lenis = new Lenis()

    lenis.on('scroll',ScrollTrigger.update)

    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0);

    const services =  gsap.utils.toArray('.service')
    const observerOprions = {
      root : null,
      rootMargin :'0px',
      threshold : 0.1
    }

    const observerCallback = (entries:IntersectionObserverEntry[] , observer:IntersectionObserver)=>{
      entries.forEach((entry:IntersectionObserverEntry)=>{
        if(entry.isIntersecting){
          const service =  entry.target
          const imgContainer  = service.querySelector('.img')

          ScrollTrigger.create({
            trigger : service,
            start : "bottom bottom",
            end : "top top",
            scrub : true,
            onUpdate : (self)=>{
              const progress = self.progress;
              const newWidth = 30 + 70 * progress
              gsap.to(imgContainer,{
                width:newWidth + '%',
                duration : 0.1,
                ease : 'none'
              })
            }
          })

          ScrollTrigger.create({
            trigger : service,
            start : "top bottom",
            end : "top top",
            scrub : true,
            onUpdate : (self)=>{
              const progress = self.progress;
              const newHeight = 150 + 300 * progress
              gsap.to(imgContainer,{
                height:newHeight + 'px',
                duration : 0.1,
                ease : 'none'
              })
            }
          })

          observer.unobserve(service)
        }
      })
    }
    const observer = new IntersectionObserver(observerCallback , observerOprions)
    services.forEach((service:any)=>{
      observer.observe(service)
    })
    
  }, []);

  const featured = courses.slice(0, 3);
  const container = useRef(null);

  return (
    <div ref={container} className="min-h-screen" style={{ scrollBehavior: 'smooth' }}>
        <div className='bg-gradient-to-br from-black via-black bg-black text-white flex flex-col md:flex-row items-center justify-between p-8 py-30 px-16 min-h-screen'>
          <div className='md:w-2/4   text-center md:text-left space-y-4'>
            <motion.h1 initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}transition={{ duration: 0.3 }} className='hero-learn text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'> <span className='font-bold text-white bg-clip-text '>  Learn </span> Today, </motion.h1>
            <motion.h1 initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}transition={{ duration: 0.6 }} className='hero-lead text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'><span className='font-bold text-white'>Lead</span> Tomorrow,</motion.h1>
            <motion.h1 initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}transition={{ duration: 0.9 }} className='hero-succeed text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'><span className='font-bold bg-gradient-to-r from-yellow-400 via-yellow-600 to-red-500 bg-clip-text text-transparent'> Succeed</span> Forever. </motion.h1>
          </div>
          
          <div className="hero-image w-[250px] sm:w-[300px] md:w-2/4 relative h-[250px] sm:h-[300px] lg:h-[400px] lg:w-[400px] rounded-lg overflow-hidden">
            <motion.img initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}transition={{ duration: 0.9 }} src="/bgg.jpg" alt="Logo"  className="object-contain"/>
          </div>

        </div>




          <section className='services'>
            <div className='services-header'>
              <div className='col'><motion.h1 className='text-white text-center text-4xl md:text-5xl lg:text-7xl pb-4'>All Services</motion.h1></div>
            </div>
            <div className='service flex flex-col md:flex-row gap-4 border-t border-white/20 py-8'>
              <div className="service-info w-full md:w-2/5 space-y-4 px-4">
                <h1 className=' text-2xl md:text-4xl lg:text-5xl '>TRENDING COURSES</h1>
                <p>Stay ahead with the latest and most in-demand courses carefully curated to fit your learning needs.From web development to business strategies, access a wide range of updated courses designed to keep you relevant in today’s dynamic market</p>
              </div>
              <div className="service-img w-full md:w-3/5 px-4">
                <div className="img w-full h-56 md:h-96 rounded-lg overflow-hidden">
                  <img src="/img1.jpg" className="w-full h-full object-cover" alt="" />
                </div>
              </div>
            </div>
            <div className='service flex flex-col md:flex-row gap-4 border-t border-white/20 py-8' >
              <div className="service-info w-full md:w-2/5 space-y-4 px-4">
                <h1 className=' text-2xl md:text-4xl lg:text-5xl '>PROFESSIONAL EDUCATORS</h1>
                <p>Learn from the best in the industry with experts who bring practical insights and years of experience.Our educators go beyond theory, offering real-world applications to empower your learning journey.</p>
              </div>
              <div className="service-img">
                <div className='img'><img src="/img2.jpg" alt="" /></div>
              </div>
            </div>
            <div className='service flex flex-col md:flex-row gap-4 border-t border-white/20 py-8'>
              <div className="service-info w-full md:w-2/5 space-y-4 px-4">
                <h1 className=' text-2xl md:text-4xl lg:text-5xl '>PROGRESS TRACKINGS</h1>
                <p>Monitor your journey and achievements with detailed insights into your growth.Track completed courses, test scores, and milestones to stay motivated and focused on your goals.</p>
              </div>
              <div className="service-img">
                <div className='img'><img src="/img3.jpg" alt="" /></div>
              </div>
            </div>
            <div className='service flex flex-col md:flex-row gap-4 border-t border-white/20 py-8'>
              <div className="service-info w-full md:w-2/5 space-y-4 px-4">
                <h1 className=' text-2xl md:text-4xl lg:text-5xl '>ONE-ON-ONE INTERACTION WITH EDUCATORS</h1>
                <p>Get personalized guidance and mentorship from dedicated educators.Engage in meaningful one-on-one sessions tailored to your learning pace and goals.</p>
              </div>
              <div className="service-img">
                <div className='img'><img src="/img4.jpg" alt="" /></div>
              </div>
            </div>

          </section>      


          <section className="bg-black ">
              <div className="col">
                <h1 className="text-white text-center text-4xl md:text-6xl lg:text-7xl font-bold">
                  TOP COURSES
                </h1>
              </div>

              <div className="grid gap-6 md:grid-cols-2 px-6 pt-4 lg:grid-cols-3">
                {featured.map((course) => (
                  <div  key={course.id}  className="relative bg-white/20 backdrop-blur-lg p-4 rounded-xl shadow-lg border border-white/10 text-white overflow-hidden">
                    <div className="absolute inset-0 rounded-xl bg-cover bg-center z-0"style={{ backgroundImage: `url(${course.thumbnailUrl})` }}></div>
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-xl z-0"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <img src={course.thumbnailUrl}  alt={course.title} className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md mb-4" />

                      <h2 className="font-bold text-lg text-center">{course.title}</h2>
                      <p className="text-sm font-bold text-white">
                        {course.category} | {course.type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <h3 onClick={() => router.push('/all-courses')} className="text-white font-bold border border-white px-6 py-2 rounded-full cursor-pointer hover:bg-white hover:text-black transition duration-300 w-max mx-auto mt-6">
                SHOW ALL COURSES
              </h3>

            </section>

        </div>

    
  );
};

export default Page;