import React from "react";
import VideosPlaceholder from "../ImagePlaceholders/Videosplaceholder";

// {
  //     "id": 4,
  //     "organization": {
  //       "id": 1,
  //       "name": "Innovations Cybercafe"
  //     },
  //     "thumbnail": null,
  //     "video": null,
  //     "video_url": null,
  //     "video_name": null,
  //     "img_url": null,
  //     "img_name": null,
  //     "category": {
  //       "id": 2,
  //       "category": "PostUTME",
  //       "description": "This is a Postutme Video"
  //     },
  //     "subcategory": {
  //       "id": 4,
  //       "category": {
  //         "id": 2,
  //         "category": "PostUTME",
  //         "description": "This is a Postutme Video"
  //       },
  //       "subcategory": "Physical Science"
  //     },
  //     "title": "Physical Science PostUtme intro",
  //     "description": "This is a Physical Science Introduction Video",
  //     "price": "3000.00",
  //     "video_token": "a8b535f14e1f429bbc7705f710b82ef1",
  //     "created_at": "2024-07-17T00:12:14.532976Z",
  //     "updated_at": "2024-07-17T00:12:14.532976Z",
  //     "free": false,
  //     "userIDs_that_bought_this_video": []
  //   },
const VideoCard = ({ video, openModal, cart, addToCart, removeFromCart }) => {
  return (
    <div className="card p-4 py-4">
      <div className="d-flex align-items-center">
        <div className="me-3">
          {video.thumbnail ? (
            <img
              src={video.img_url}
              alt="products"
              width={68}
              height={68}
              className="rounded-circle object-fit-cover"
              style={{ objectPosition: "center" }}
            />
          ) : (
            <VideosPlaceholder />
          )}
        </div>

        <div
          className="flex-fill d-flex flex-column justify-content-between"
          style={{ height: "100%" }}
        >
          <h6 className="flex-grow-1">{video.title}</h6>
          <p className="text-primary mb-1">
            {video.description.length > 80 ? (
              <span>
                {title.description.substring(0, 80)}...{" "}
                <span
                  className="text-secondary fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => openModal(video)}
                >
                  view more
                </span>
              </span>
            ) : (
              video.description
            )}
          </p>
          <div className="d-flex justify-content-between mt-3 flex-wrap">
            <span className="fw-bold text-primary me-2">
              &#8358;{parseFloat(video.price)}
            </span>

            <div className="me-2 me-md-3">
              {cart.find((item) => item.id === video.id) ? (
                <span
                  className="badge bg-secondary-light text-secondary p-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => removeFromCart(video.id)}
                >
                  remove video {"  "}
                  <i className="bi bi-cart-dash"></i>
                </span>
              ) : (
                <span
                  className="badge bg-success-light text-success p-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => addToCart(video)}
                >
                  Add video {"  "}
                  <i className="bi bi-cart-plus"></i>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
