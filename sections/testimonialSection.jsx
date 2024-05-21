"use client";
import React, { useState, useEffect, useRef } from "react";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import StarRating from "@/components/StarRating/StarRating";
import styles from "./TestimonialSwiper.module.css";
import "./section.css";

const testimonials = [
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quidem, cumque, quibusdam voluptatibus quas quod necessitatibus",
    name: "John Doe",
    role: "CEO, Company",
    rating: 2,
    img: "https://randomuser.me/api/portraits/med/men/75.jpg",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quidem, cumque, quibusdam voluptatibus quas quod necessitatibus",
    name: "Jane Doe",
    role: "CTO, Company",
    rating: 3.5,
    img: "https://randomuser.me/api/portraits/med/women/75.jpg",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quidem, cumque, quibusdam voluptatibus quas quod necessitatibus",
    name: "Michael Smith",
    role: "Manager, Company",
    rating: 5,
    img: "https://randomuser.me/api/portraits/med/men/76.jpg",
  },
  // Add more testimonials as needed
];

const CustomSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const containerRef = useRef(null);

  const updateSlidesToShow = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setSlidesToShow(3);
    } else if (width >= 768) {
      setSlidesToShow(2);
    } else {
      setSlidesToShow(1);
    }
  };

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <hr className="text-primary pt-3 mx-5" />
      <section id="testimonials" className="testimonials p-3 pb-4 p-md-5">
        <div className="mb-4 px-3 px-md-5">
          <h6>Testimonials</h6>
          <h4>Here what our Clients are Saying</h4>
        </div>

        <div
          className={`${styles.swiperContainer} px-2 px-md-4`}
          ref={containerRef}
        >
          <div
            className={styles.swiperWrapper}
            style={{
              transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
              width: `${testimonials.length * (100 / slidesToShow)}%`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                className={styles.swiperSlide}
                style={{ width: `${100 / slidesToShow}%` }}
                key={index}
              >
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
                      />
                      <div className="ms-3">
                        <h6 className="mb-1">{testimonial.name}</h6>
                        <p className="my-0 small">{testimonial.role}</p>
                        <StarRating rating={testimonial.rating} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* the control button */}

        <div className=" px-2 pb-4 px-md-5 text-primary">
          <div className="float-end d-flex">
            <div
              className={`${styles.prevButton} me-3 d-flex align-items-center justify-content-center`}
              onClick={prevSlide}
            >
              <FaLongArrowAltLeft />
            </div>
            <div
              className={`${styles.nextButton} d-flex align-items-center justify-content-center`}
              onClick={nextSlide}
            >
              <FaLongArrowAltRight />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomSwiper;
