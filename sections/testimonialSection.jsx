"use client";
import React, { useState, useEffect } from "react";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import StarRating from "@/components/StarRating/StarRating";
import styles from "./TestimonialSwiper.module.css";
import "./section.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const testimonials = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quidem, cumque, quibusdam voluptatibus quas quod necessitatibus",
    name: "John Doe",
    role: "CEO, Company",
    rating: 2,
    img: "https://randomuser.me/api/portraits/med/men/75.jpg",
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quidem, cumque, quibusdam voluptatibus quas quod necessitatibus",
    name: "Jane Doe",
    role: "CTO, Company",
    rating: 3.5,
    img: "https://randomuser.me/api/portraits/med/women/75.jpg",
  },
  {
    id: 3,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quidem, cumque, quibusdam voluptatibus quas quod necessitatibus",
    name: "Michael Smith",
    role: "Manager, Company",
    rating: 5,
    img: "https://randomuser.me/api/portraits/med/men/76.jpg",
  },
  // Add more testimonials as needed
];

const CustomSwiper = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesCount, setSlidesCount] = useState(0);

  useEffect(() => {
    if (swiperInstance) {
      setSlidesCount(
        swiperInstance.slides.length - swiperInstance.params.slidesPerView
      );
      swiperInstance.on("slideChange", () => {
        setActiveIndex(swiperInstance.activeIndex);
      });
    }
  }, [swiperInstance]);

  return (
    <>
      <hr className="text-primary pt-3 mx-5" />
      <section id="testimonials" className="testimonials p-3 pb-4 p-md-5">
        <div className="mb-4 px-3 px-md-5">
          <h6>Testimonials</h6>
          <h4>Hear what our Clients are Saying</h4>
        </div>

        <Swiper
          className="px-3 px-md-5 mt-2"
          spaceBetween={50}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          breakpoints={{
            576: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="card p-4">
                <div className="card-body">
                  <div>
                    <BiSolidQuoteAltRight
                      className="float-end text-primary"
                      style={{ fontSize: "35px" }}
                    />
                  </div>
                  <p className="card-text">{testimonial.text}</p>
                  <div className="d-flex align-items-center">
                    <img
                      src={testimonial.img}
                      alt="testimonial"
                      className="img-fluid rounded-circle"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div className="ms-3">
                      <h6 className="mb-1">{testimonial.name}</h6>
                      <p className="my-0 small">{testimonial.role}</p>
                      <StarRating rating={testimonial.rating} />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="px-2 pb-4 px-md-5 text-primary">
          <div className="float-end d-flex">
            {activeIndex > 0 && (
              <div
                className={`${styles.prevButton} me-3 d-flex align-items-center justify-content-center`}
                onClick={() => swiperInstance && swiperInstance.slidePrev()}
              >
                <FaLongArrowAltLeft />
              </div>
            )}
            {activeIndex < slidesCount && (
              <div
                className={`${styles.nextButton} d-flex align-items-center justify-content-center`}
                onClick={() => swiperInstance && swiperInstance.slideNext()}
              >
                <FaLongArrowAltRight />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomSwiper;
