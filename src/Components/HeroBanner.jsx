import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper/modules'
import { Link } from 'react-router-dom'

const HeroBanner = ({ SLIDES }) => {

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
        <main className="home-container">
            <section className="hero-slider-wrapper">
                <div className="slider-container">
                    <Swiper
                        modules={[Navigation, EffectFade]}
                        effect="coverflow"
                        fadeEffect={{ crossFade: true }}
                        grabCursor={true}
                        centeredSlides={false}
                        slidesPerView={1}
                        spaceBetween={0}
                        loop={false}
                        navigation={true}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        className="w-full h-full"
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
    )
}

export default HeroBanner