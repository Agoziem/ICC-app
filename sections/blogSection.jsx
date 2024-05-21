import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./section.css";
import { FaLongArrowAltRight } from "react-icons/fa";

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      title: "Jamb Result Update",
      content:
        "Jamb result is out. candidates are advised to check their results now ....",
      img: "/student writing exam image.avif",
      link: "#",
    },
    {
      id: 2,
      title: "Jamb Result Update",
      content:
        "Jamb result is out. candidates are advised to check their results now ....",
      img: "/Jamb Result image.jpeg",
      link: "#",
    },
    {
      id: 3,
      title: "Jamb Result Update",
      content:
        "Jamb result is out. candidates are advised to check their results now ....",
      img: "/back to School images.avif",
      link: "#",
    },
  ];

  return (
    <>
      <hr className="text-primary pt-4 mx-5" />
      <section className="blog-section px-4 px-md-5">
        <div className=" blog-text text-center d-flex flex-column align-items-center mb-4">
          <h2>Articles and news</h2>
          <p className="align-self-center">
            Get the latest news and updates on our blog, stay informed and never
            miss out on any important information.
          </p>
        </div>

        <div className="row px-0 px-md-5">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="col-12 col-md d-flex justify-content-center"
            >
              <div className="card">
                <div
                  className="blog-image"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "200px",
                  }}
                >
                  <Image
                    src={blog.img}
                    alt="blog1"
                    width={100}
                    height={100}
                    style={{
                      borderRadius: "10px 10px 0px 0px",
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <div className="px-4 py-3">
                  <div className="text-center">
                    <h6 className="text-primary mb-2">{blog.title}</h6>
                    <p className="mb-1 small ">{blog.content}</p>
                  </div>
                  <div
                    className="d-flex justify-content-center my-3 text-primary"
                    style={{ fontSize: "1rem" }}
                  >
                    <Link
                      href={blog.link}
                      className="mx-2 fw-medium "
                      style={{ cursor: "pointer" }}
                    >
                      Read more <FaLongArrowAltRight className="ms-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="d-flex justify-content-center mt-0 mb-5">
            <Link href="/blog" className="btn btn-primary px-5">
              View more
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSection;
