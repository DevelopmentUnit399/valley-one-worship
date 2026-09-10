import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { assets } from '../assets/assets'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const ABOUT_MEDIA = {
    main: assets.aboutimage1,
    side1: assets.aboutimage2,
    side2: assets.aboutimage3
}

const ALL_SLIDES = [
    { id: 1, src: ABOUT_MEDIA.main, alt: 'Main Band Photo' },
    { id: 2, src: ABOUT_MEDIA.side1, alt: 'Band Photo' },
    { id: 3, src: ABOUT_MEDIA.side2, alt: 'Band On Stage' },
]

const ABOUT_TEXT = [
    { id: 1, type: 'h2', text: 'Who We Are' },
    { id: 2, type: 'p', text: "Born from the heart of California’s Central Valley, Valley One Worship is a dynamic worship collective dedicated to uniting believers, resourcing churches, and amplifying the move of God through music. Launched in June 2024, from Visalia First—a thriving, multigenerational church led by Dr. Mark Merrill—the collective exists to serve the body of Christ both locally and beyond. With deep roots in their home church and an expanding influence across the Christian music landscape, Valley One Worship seeks to write songs that capture the stories, testimonies, and faith of the Central Valley, creating a sound that illustrates the move of God in the region." },
    { id: 3, type: 'p', text: "Valley One Worship brings a fresh yet deeply rooted expression to the world of Contemporary Christian Music (CCM). Their sound is CCM at its core, enriched by a subtle yet consistent gospel influence. Harmonies and vocal-driven arrangements define their music, which seamlessly weaves together diverse subgenres, including pop, country, alternative, and Motown. This multigenre approach allows Valley One Worship to craft songs that engage worshippers across generational and cultural lines, creating anthems that resonate with a broad audience." },
    { id: 4, type: 'h2', text: "Born In Revival" },
    { id: 5, type: 'p', text: "The collective draws inspiration from groups like Elevation Worship, Bethel Music, Transformation Worship, and The Belonging Co—movements known for their innovation, spiritual depth, and cultural relevance. Like these influences, Valley One Worship seeks to create Spirit-led worship experiences that are culturally diverse and generationally inclusive, while remaining rooted in biblical truth and artistic excellence." },
    { id: 6, type: 'p', text: "Though Valley One Worship is a newly launched collective, its members bring years of seasoned experience to the movement. The group was founded and is directed by Medi Kikoni, a songwriter, artist (Medi Kay), and producer with over 18 years of experience across African gospel, Christian hip-hop, and the U.S. CCM and gospel industries. He has collaborated with Elevation Worship, Brandon Lake, Tasha Cobbs Leonard, We the Kingdom, David Crowder, Dante Bowe, Joe L Barnes, and Maverick City Music, and was part of the GRAMMY-winning Old Church Basement album as well as numerous Dove and Stellar Award-winning projects. His own artistry has garnered over 800,000 streams and views, and he has also served as an exclusive songwriter under Tyscot Records/Warner Chappell Music." },
    { id: 7, type: 'p', text: "Valley One Worship also includes accomplished songwriters and artists such as Abigail Kikoni and Megan Jean Wright. With decades of combined experience in songwriting, touring, and recording, their backgrounds include collaborations with Elevation Worship, Brandon Lake, We the Kingdom, David Crowder, UPPERROOM, and Maverick City Music, among others. Their contributions to GRAMMY and Dove Award-winning albums and their growing independent reach—with over 75,000 streams from recent solo releases—add depth and dimension to Valley One Worship’s sound." },
    { id: 8, type: 'p', text: "Every song written by Valley One Worship is born from a place of encounter and connection with God. The collective leads worship weekly at Visalia First, where thousands gather to encounter God’s presence. Their music is shaped by witnessing radical life changes, including countless salvations, baptisms, and healings—both in their church and throughout the Central Valley. This spiritual movement was a key catalyst in forming the group, as they felt compelled to document and share these stories through song. Their heart is not to draw attention to themselves, but to magnify the transformative work of God in their region." },
    { id: 9, type: 'p', text: "Valley One Worship is preparing for an exciting season ahead. Their debut single, New Life, was released in February 2025, introducing the world to their unique sound. This was followed by their next three singles, Communion, Always, and Who Can Be Against, leading up to their first full-length album, Songs from the Valley in August 2025." },
    { id: 10, type: 'p', text: "As one of the first worship expressions to emerge from California’s Central Valley, Valley One Worship stands as a voice for a region rich in faith yet often overlooked in the larger worship movement. Their music seeks to unify the Church, empower leaders, and offer songs that echo the faith of the Valley and beyond. With a heart for worship, a passion for excellence, and a commitment to Spirit-led artistry, Valley One Worship is poised to make a lasting impact in the world of Christian music." },
]

export default function About() {
    return (
        <section data-theme="light">
            <main className="w-full min-h-screen bg-white text-black pt-0 pb-20 overflow-x-clip">
                {/* 1. Mobile View (< md): Carousel starts at top */}
                <div className="block md:hidden w-full">
                    {/* Mobile Swiper Banner */}
                    <section data-theme="dark">
                        <div className="w-full h-[60vh] min-h-95 overflow-hidden mb-8 shadow-xl">
                            <Swiper
                                modules={[Navigation, Pagination]}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                                className="w-full h-full"
                            >
                                {ALL_SLIDES.map((slide) => (
                                    <SwiperSlide key={slide.id}>
                                        <img
                                            src={slide.src}
                                            alt={slide.alt}
                                            className="w-full h-full object-cover"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </section>

                    {/* Mobile Centered Text (bounded by .row) */}
                    <div className="row">
                        <div className="max-w-xl mx-auto text-center space-y-6">
                            <h2 className="text-3xl font-black tracking-tight uppercase">{ABOUT_TEXT[0].text}</h2>
                            <p className="text-neutral-500 leading-relaxed text-sm">{ABOUT_TEXT[1].text}</p>
                            <p className="text-neutral-500 leading-relaxed text-sm">{ABOUT_TEXT[2].text}</p>
                            <br />
                            <h2 className="text-3xl font-black tracking-tight uppercase">{ABOUT_TEXT[3].text}</h2>
                            <p className="text-neutral-500 leading-relaxed text-sm">{ABOUT_TEXT[4].text}</p>
                            <p className="text-neutral-500 leading-relaxed text-sm">{ABOUT_TEXT[5].text}</p>
                            <p className="text-neutral-500 leading-relaxed text-sm">{ABOUT_TEXT[6].text}</p>
                            <p className="text-neutral-500 leading-relaxed text-sm">{ABOUT_TEXT[7].text}</p>
                            <p className="text-neutral-500 leading-relaxed text-sm">{ABOUT_TEXT[8].text}</p>
                            <p className="text-neutral-500 leading-relaxed text-sm">{ABOUT_TEXT[9].text}</p>
                        </div>
                    </div>
                </div>

                {/* 2. Desktop View (>= md): Full-bleed image top + sticky row */}
                <div className="hidden md:block">
                    {/* Main Image reaching the very top behind sticky navbar */}
                    <section data-theme="dark">
                        <div className="w-full h-[80vh] min-h-125 overflow-hidden mb-16 shadow-2xl">
                            <img
                                src={ABOUT_MEDIA.main}
                                alt="Valley One Worship Banner"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </section>

                    {/* Desktop Content constrained to your custom .row */}
                    <div className="row">
                        <div className="grid grid-cols-12 gap-12 items-start relative">
                            {/* LEFT: Flowing Scrolled Text Column */}
                            <div className="col-span-7 space-y-12 pr-4 py-2">
                                <div>
                                    <h2 className="text-4xl font-extrabold tracking-tight mt-2 mb-6">
                                        {ABOUT_TEXT[0].text}
                                    </h2>
                                    <p className="text-lg text-neutral-500 leading-relaxed">{ABOUT_TEXT[1].text}</p>
                                    <br />
                                    <p className="text-lg text-neutral-500 leading-relaxed">{ABOUT_TEXT[2].text}</p>
                                </div>

                                <div className="space-y-6 text-neutral-500 leading-relaxed text-lg">
                                    <h3 className="text-2xl font-bold text-black">{ABOUT_TEXT[3].text}</h3>
                                    <p>{ABOUT_TEXT[4].text}</p>
                                    <p>{ABOUT_TEXT[5].text}</p>
                                    <p>{ABOUT_TEXT[6].text}</p>
                                    <p>{ABOUT_TEXT[7].text}</p>
                                    <p>{ABOUT_TEXT[8].text}</p>
                                    <p>{ABOUT_TEXT[9].text}</p>
                                </div>
                            </div>

                            {/* RIGHT: Sticky Pinned Column */}
                            <div className="col-span-5 sticky top-24 self-start space-y-6 pb-4">
                                <div className="w-full h-auto overflow-hidden shadow-lg group">
                                    <img
                                        src={ABOUT_MEDIA.side1}
                                        alt="Side Gallery 1"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="w-full h-auto overflow-hidden shadow-lg group">
                                    <img
                                        src={ABOUT_MEDIA.side2}
                                        alt="Side Gallery 2"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}