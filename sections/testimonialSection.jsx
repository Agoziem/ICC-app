"use client";
import React, { useState, useEffect, useContext } from "react";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import StarRating from "@/components/StarRating/StarRating";
import styles from "./TestimonialSwiper.module.css";
import "./section.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { OrganizationContext } from "@/data/Organizationalcontextdata";

const CustomSwiper = () => {
  const { OrganizationData } = useContext(OrganizationContext);
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
          {OrganizationData?.testimonials &&
          OrganizationData?.testimonials.length > 0 ? (
            OrganizationData?.testimonials?.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="card p-4">
                  <div className="card-body">
                    <div>
                      <BiSolidQuoteAltRight
                        className="float-end text-primary"
                        style={{ fontSize: "35px" }}
                      />
                    </div>
                    <p className="card-text">{testimonial.content}</p>
                    <div className="d-flex align-items-center">
                      {testimonial.img ? (
                        <img
                          src={testimonial.img_url}
                          alt="testimonial"
                          className="img-fluid rounded-circle"
                          style={{ width: "50px", height: "50px" }}
                        />
                      ) : (
                        <div
                          className="rounded-circle text-white d-flex justify-content-center align-items-center"
                          style={{
                            width: 75,
                            height: 75,
                            fontSize: "30px",
                            backgroundColor: "var(--bgDarkerColor)",
                          }}
                        >
                          {testimonial.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="ms-3">
                        <h6 className="mb-1">{testimonial.name}</h6>
                        <p className="my-0 small">{testimonial.role}</p>
                        <StarRating rating={testimonial.rating} />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p
              className="p-3 text-light text-center bg-primary-light my-3 rounded"
              style={{ background: "var(--bgDarkerColor)" }}
            >
              No Reviews yet
            </p>
          )}
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
