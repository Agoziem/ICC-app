import { useUserContext } from "@/data/users/usercontextdata";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { PiEmptyBold } from "react-icons/pi";
import VideosPlaceholder from "../ImagePlaceholders/Videosplaceholder";
import Link from "next/link";

const UserVideos = () => {
  const { userOrder } = useUserContext();
  const { data: session } = useSession();
  const [video, setVideo] = useState("");
  const [paidVideos, setPaidVideos] = useState([]);

  useEffect(() => {
    if (userOrder.length > 0 && session?.user?.id) {
      const userId = parseInt(session.user.id);
      const allPaidVideos = userOrder.flatMap((order) =>
        order.videos.filter((video) =>
          video.userIDs_that_bought_this_video.includes(userId)
        )
      );
      setPaidVideos(allPaidVideos);
    }
  }, [userOrder, session]);

  return (
    <div className="row">
      <h4 className="my-3">Videos Purchased</h4>
      {paidVideos.length > 0 ? (
        paidVideos.map((video) => (
          <div key={video.id} className="col-12 col-md-4">
            <div className="card p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="me-3">
                  {video.thumbnail ? (
                    <img
                      src={video.img_url}
                      alt="video"
                      width={68}
                      height={68}
                      className="rounded-circle object-fit-cover"
                      style={{ objectPosition: "center" }}
                    />
                  ) : (
                    <VideosPlaceholder />
                  )}
                </div>
                <div className="flex-fill">
                  <h6 className="text-capitalize">{video.title}</h6>
                  <p className="text-capitalize mb-1">
                    {video.description.length > 80 ? (
                      <span>{video.description.substring(0, 80)}... </span>
                    ) : (
                      video.description
                    )}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <p className="small mb-1">
                      {video.category.category} Video
                    </p>
                    <div
                      className="badge bg-primary-light text-primary py-2 px-2"
                      style={{ cursor: "pointer" }}
                    >
                      <Link
                        href={`/dashboard/my-orders/video/?videotoken=${video.video_token}`}
                        className="text-primary"
                      >
                        View Video
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <PiEmptyBold
            className="mt-2"
            style={{ fontSize: "6rem", color: "var(--bgDarkerColor)" }}
          />
          <h4>Videos</h4>
          <p>you have not purchased any video</p>
        </div>
      )}
    </div>
  );
};

export default UserVideos;
