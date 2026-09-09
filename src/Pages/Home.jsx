import React, { useState, useRef, useEffect } from 'react'

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
import MusicResourcesHome from '../Components/MusicResourcesHome'
import AboutHome from '../Components/AboutHome'
import HeroBanner from '../Components/HeroBanner'

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
    return (
        <div>
            
            <HeroBanner SLIDES={SLIDES} />

            <AboutHome about_image={aboutImage2} />

            <MusicResourcesHome LATEST_ALBUM={LATEST_ALBUM} RECENT_SONGS={RECENT_SONGS} />

            <EventsSection />

            <BookingHome />

        </div>
    )
}