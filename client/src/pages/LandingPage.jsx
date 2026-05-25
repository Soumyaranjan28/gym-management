import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function LandingPage() {
  return (
    <div className="landing-page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">#1 Fitness Center</span>

          <h1>
            TRANSFORM <br />
            <span>YOUR BODY</span>
          </h1>

          <p>
            Build strength, confidence, and fitness with expert trainers and
            world-class equipment.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="join-btn">
              Join Now
            </Link>

            <Link to="/login" className="login-btn">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          <h3>Modern Equipment</h3>
          <p>Top-quality machines for strength training.</p>
        </div>

        <div className="feature-card">
          <h3>Expert Trainers</h3>
          <p>Professional trainers to guide your workouts.</p>
        </div>

        <div className="feature-card">
          <h3>Flexible Timing</h3>
          <p>Morning and evening batches available.</p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="slider-gallery">
        <h2>Our Gym Gallery</h2>

        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="gymSwiper"
        >
          <SwiperSlide>
            <img src="/images/gym1.jpg" alt="" />
          </SwiperSlide>

          <SwiperSlide>
            <img src="/images/gym2.jpg" alt="" />
          </SwiperSlide>

          <SwiperSlide>
            <img src="/images/gym3.jpg" alt="" />
          </SwiperSlide>

          <SwiperSlide>
            <img src="/images/gym6.jpg" alt="" />
          </SwiperSlide>

          <SwiperSlide>
            <img src="/images/gym5.jpg" alt="" />
          </SwiperSlide>
        </Swiper>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h2>eFitness Gym</h2>
        <p>Train Hard • Stay Strong • Be Fit</p>
      </footer>
    </div>
  );
}

export default LandingPage;
