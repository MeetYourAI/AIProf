import Image from 'next/image'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Video from '@/components/Video'
import AboutSectionOne from '@/components/About/AboutSectionOne' 
import AboutSectionTwo from '@/components/About/AboutSectionTwo'
import Testimonials from '@/components/Testimonials'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'
import ScrollUp from "@/components/Common/ScrollUp";

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  )
}
