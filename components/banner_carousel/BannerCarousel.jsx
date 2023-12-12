import { Container, Img } from "./Elements"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const BannerCarousel = () => {
    return (
        <Container>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide><Img src="https://drive.google.com/uc?export=view&id=1mDw1YepwuSKyubLkSd40aiYvMUW0yGey" alt="" width={1920} height={400} priority /></SwiperSlide>
                <SwiperSlide><Img src="https://drive.google.com/uc?export=view&id=1mDw1YepwuSKyubLkSd40aiYvMUW0yGey" alt="" width={1920} height={400} priority /></SwiperSlide>
                <SwiperSlide><Img src="https://drive.google.com/uc?export=view&id=1mDw1YepwuSKyubLkSd40aiYvMUW0yGey" alt="" width={1920} height={400} priority /></SwiperSlide>
                <SwiperSlide><Img src="https://drive.google.com/uc?export=view&id=1mDw1YepwuSKyubLkSd40aiYvMUW0yGey" alt="" width={1920} height={400} priority /></SwiperSlide>
            </Swiper>
        </Container>
    )
}

export default BannerCarousel