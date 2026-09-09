import React, { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectCoverflow } from 'swiper/modules'
import { Link } from 'react-router-dom'

import album_cover from '../assets/album/album_cover.png'
import we_see_revival from '../assets/album/we_see_revival.png'
import messiah from '../assets/album/messiah.png'
import who_can_be_against from '../assets/album/who_can_be_against.png'
import you_saved_me from '../assets/album/you_saved_me.png'

import 'swiper/css/bundle'

import homepageVideo from '../assets/videos/homepage_video.mp4'
import aboutImage1 from '../assets/about-image-1.jpg'
import aboutImage2 from '../assets/about-image-2.jpg'
import EventsSection from '../Components/EventsSection'
import BookingHome from '../Components/BookingHome'

const LATEST_ALBUM = {
    title: 'Heal Our Land',
    subtitle: 'Album',
    cover: album_cover,
    link: '/music'
}

const RECENT_SONGS = [
    {
        id: 1,
        title: 'We See Revival',
        cover: we_see_revival,
        link: '/music'
    },
    {
        id: 2,
        title: 'You Saved Me',
        cover: you_saved_me,
        link: '/music'
    },
    {
        id: 3,
        title: 'Messiah',
        cover: messiah,
        link: '/music'
    },
    {
        id: 4,
        title: 'Who Can Be Against',
        cover: who_can_be_against,
        link: '/music'
    }
]

const SLIDES = [
    {
        id: 1,
        type: 'video',
        src: homepageVideo,
        title: 'Valley One Worship',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo dolorem cupiditate sit laborum facere consequuntur.',
        ctaText: 'Listen Now',
        ctaLink: '/music'
    },
    {
        id: 2,
        type: 'image',
        src: aboutImage1,
        title: 'Lorem ipsum',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo dolorem cupiditate sit laborum facere consequuntur.',
        ctaText: 'Listen Now',
        ctaLink: '/music'
    },
    {
        id: 3,
        type: 'image',
        src: aboutImage2,
        title: 'Lorem ipsum',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo dolorem cupiditate sit laborum facere consequuntur.',
        ctaText: 'Check out our events',
        ctaLink: '/events'
    }
]

export default function Home() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [showIndicator, setShowIndicator] = useState(false)

    const videoRefs = useRef({})
    const fadeTimeoutRef = useRef(null)

    // Drag detection coordinates
    const pointerStartRef = useRef({ x: 0, y: 0 })

    const triggerIndicatorTimer = () => {
        setShowIndicator(true)
        if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current)
        fadeTimeoutRef.current = setTimeout(() => {
            setShowIndicator(false)
        }, 2000)
    }

    // Handle slide changes & video play/pause
    useEffect(() => {
        if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current)

        SLIDES.forEach((slide, index) => {
            const videoEl = videoRefs.current[slide.id]
            if (videoEl) {
                if (index === activeIndex) {
                    videoEl
                        .play()
                        .then(() => {
                            setIsPlaying(true)
                            triggerIndicatorTimer()
                        })
                        .catch(() => {
                            setIsPlaying(false)
                            setShowIndicator(true)
                        })
                } else {
                    videoEl.pause()
                    videoEl.currentTime = 0
                }
            }
        })

        return () => {
            if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current)
        }
    }, [activeIndex])

    const handlePointerDown = (e) => {
        pointerStartRef.current = { x: e.clientX, y: e.clientY }
    }

    const handlePointerUp = (slideId, e) => {
        const deltaX = Math.abs(e.clientX - pointerStartRef.current.x)
        const deltaY = Math.abs(e.clientY - pointerStartRef.current.y)

        // If mouse/finger moved more than 6px, user was dragging/swiping: ignore click
        if (deltaX > 6 || deltaY > 6) return

        toggleVideo(slideId)
    }

    const toggleVideo = (slideId) => {
        const video = videoRefs.current[slideId]
        if (!video) return

        if (video.paused) {
            video.play().then(() => {
                setIsPlaying(true)
                triggerIndicatorTimer()
            })
        } else {
            video.pause()
            setIsPlaying(false)
            if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current)
            setShowIndicator(true)
        }
    }

    return (
        <div>
            <main className="home-container">
                <section className="hero-slider-wrapper">
                    <div className="slider-container">
                        <Swiper
                            modules={[Navigation, EffectCoverflow]}
                            effect="coverflow"
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView="auto"
                            loop={false}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 40,
                                depth: 140,
                                modifier: 1,
                                slideShadows: false,
                            }}
                            navigation={true}
                            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                            className="media-swiper"
                        >
                            {SLIDES.map((slide, index) => (
                                <SwiperSlide key={slide.id} className="slide-card">
                                    <div
                                        className="media-background"
                                        onPointerDown={handlePointerDown}
                                        onPointerUp={(e) => slide.type === 'video' && handlePointerUp(slide.id, e)}
                                    >
                                        {slide.type === 'video' ? (
                                            <>
                                                <video
                                                    ref={(el) => (videoRefs.current[slide.id] = el)}
                                                    src={slide.src}
                                                    loop
                                                    muted
                                                    playsInline
                                                />

                                                {index === activeIndex && (
                                                    <div
                                                        className={`video-status-icon ${!isPlaying ? 'visible' : showIndicator ? 'visible' : ''
                                                            }`}
                                                    >
                                                        {isPlaying ? (
                                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                                            </svg>
                                                        ) : (
                                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M8 5v14l11-7z" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <img src={slide.src} alt={slide.title} draggable={false} />
                                        )}
                                    </div>

                                    <div className="card-overlay" />

                                    <div className="card-content-bottom">
                                        <div className="card-text-left">
                                            <h2>{slide.title}</h2>
                                            <p>{slide.description}</p>
                                        </div>
                                        <div className="card-btn-right">
                                            <Link to={slide.ctaLink} className="action-button">
                                                {slide.ctaText}
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>
            </main>

            <section className="bg-black py-16 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Left Image */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img
                            src={aboutImage2}
                            alt="Valley One Image"
                            className="w-full max-w-137.5 h-auto rounded-[20px] object-cover shadow-lg"
                        />
                    </div>

                    {/* Right Text (Column Aligned) */}
                    <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-left text-white">
                        <h2 className="text-3xl font-bold mb-4">We Are Valley One Worship</h2>
                        <p className="text-white leading-relaxed mb-6">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo dolorem cupiditate sit laborum facere consequuntur at alias pariatur debitis ex, beatae minus iste quidem sed eum numquam error.
                        </p>
                        <Link to="/about" className="action-button bg-white! text-black! hover:bg-[#a8a7a7]!">
                            Read More →
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-white text-black py-20 px-6 sm:px-12 w-full">
                <div className="row mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
                    
                    {/* Left Section: Title, Description & More Button */}
                    <div className="w-full lg:w-1/4 flex flex-col items-center justify-center text-left">
                        <h2 className="text-3xl sm:text-4xl font-black text-center tracking-wider uppercase mb-4 leading-tight">
                            Music &amp;<br />Resources
                        </h2>
                        <p className="text-neutral-400 text-sm sm:text-base text-center leading-relaxed mb-8 max-w-sm">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta atque magni laudantium nulla mollitia vitae quod possimus distinctio inventore pariatur ullam itaque, natus id vel illo fugit temporibus. Necessitatibus, sapiente?
                        </p>
                        <Link
                            to="/music"
                            className="inline-flex items-center gap-2 border border-black text-black rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-200 hover:bg-black hover:text-white"
                        >
                            <span>More</span>
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    {/* Center Section: Latest Album with Title Below */}
                    <div className="w-full lg:w-2/5 flex flex-col items-center text-center">
                        <Link
                            to={LATEST_ALBUM.link}
                            className="group block w-full aspect-square rounded-3xl overflow-hiddeen bg-neutral-900 shadow-2xl relative"
                        >
                            <img
                                src={LATEST_ALBUM.cover}
                                alt={LATEST_ALBUM.title}
                                className="w-full h-full object-cover transition-transform rounded-2xl duration-500 group-hover:scale-101"
                            />
                        </Link>
                        <div className="mt-4 text-center">
                            <h3 className="text-xl font-bold tracking-wide">{LATEST_ALBUM.title}</h3>
                            <p className="text-xs uppercase tracking-widest text-neutral-400 mt-0.6">
                                {LATEST_ALBUM.subtitle}
                            </p>
                        </div>
                    </div>

                    {/* Right Section: 2x2 Grid with Text Overlaid at the Bottom Center */}
                    <div className="w-full lg:w-1/3 flex items-center gap-4">
                        <div className="grid grid-cols-2 gap-4 w-full text-center">
                            {RECENT_SONGS.map((song) => (
                                <Link
                                    key={song.id}
                                    to={song.link}
                                    className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 block"
                                >
                                    <img
                                        src={song.cover}
                                        alt={song.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Subtle Gradient Shadow Behond the Bottom Text */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                                    {/* Song Title Text in Bottom Center */}
                                    <div className="absolute bottom-0 inset-x-0 p-3 flex justify-center text-center z-10">
                                        <span className="text-xs sm:text-sm font-semibold tracking-wider text-white uppercase line-clamp-1 drop-shadow-md">
                                            {song.title}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            <EventsSection />

            <BookingHome />

        </div>
    )
}