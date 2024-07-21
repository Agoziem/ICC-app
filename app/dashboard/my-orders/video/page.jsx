"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageTitle from "@/components/PageTitle/PageTitle";
import { useVideoContext } from "@/data/Videoscontext";
//   {
//     "id": 5,
//     "organization": {
//         "id": 1,
//         "name": "Innovations Cybercafe"
//     },
//     "thumbnail": null,
//     "video": "/media/videos/Lawson_example.mp4",
//     "video_url": "http://127.0.0.1:8000/media/videos/Lawson_example.mp4",
//     "video_name": "Lawson_example.mp4",
//     "img_url": null,
//     "img_name": null,
//     "category": {
//         "id": 1,
//         "category": "Jamb",
//         "description": "This is the Jamb Category for the Videos"
//     },
//     "subcategory": {
//         "id": 1,
//         "category": {
//             "id": 1,
//             "category": "Jamb",
//             "description": "This is the Jamb Category for the Videos"
//         },
//         "subcategory": "Chemistry"
//     },
//     "title": "My Test Video Project",
//     "description": "My Test Video Project",
//     "price": "2999.00",
//     "video_token": "aeb98620724043779bd2e6f96095e684",
//     "number_of_times_bought": 2,
//     "created_at": "2024-07-18T11:55:33.451609Z",
//     "updated_at": "2024-07-19T20:56:52.880137Z",
//     "free": false,
//     "userIDs_that_bought_this_video": [
//         1
//     ]
// }
const VideoPage = () => {
  const searchParams = useSearchParams();
  const videotoken = searchParams.get("videotoken");
  const { fetchVideoByToken } = useVideoContext();
  const [video, setVideo] = useState(null);

  // fetch video by token
  useEffect(() => {
    if (videotoken) {
      fetchVideoByToken(videotoken).then((data) => {
        setVideo(data);
      });
    }
  }, [videotoken]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <PageTitle pathname="Video" />
      <div>
        <h4 className="text-center mb-4">{video?.title}</h4>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12 col-md-7">
              <video
                onContextMenu={(e) => e.preventDefault()}
                src={video?.video_url}
                controls
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "contain",
                  objectPosition: "top center",
                }}
              ></video>
            </div>
            <div className="col-12 col-md-5 ps-0 ps-md-5">
              <h6>Description</h6>
              <hr />
              <p>{video?.description}</p>
              <h6>Category</h6>
              <p
                className="badge bg-secondary-light text-secondary rounded-pill px-4 py-2"
                style={{
                  border: "1px solid var(--secondary)",
                }}
              >
                {video?.category.category}
              </p>
              <h6>Subcategory</h6>
              <p
                className="badge bg-success-light text-success rounded-pill px-4 py-2"
                style={{
                  border: "1px solid var(--success)",
                }}
              >
                {video?.subcategory.subcategory}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
