import { useUserContext } from "@/data/usercontextdata";
import React from "react";
import { useSession } from "next-auth/react";
import { PiEmptyBold } from "react-icons/pi";

const UserVideos = () => {
  const { userOrder } = useUserContext();
  const { data: session } = useSession();
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

  return (
    <div>
      {userOrder.length > 0 ? (
        userOrder.map((order) => {
          const paidVideos = order.videos.filter((video) =>
            video.userIDs_that_bought_this_video.includes(
              parseInt(session?.user?.id)
            )
          );

          return (
            <div key={order.id}>
              {paidVideos.length > 0 ? (
                paidVideos.map((video) => (
                  <div key={video.id}>
                    <h1>{video.title}</h1>
                    <p>{video.description}</p>
                    <p>{video.price}</p>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <PiEmptyBold
                    className="mt-2"
                    style={{
                      fontSize: "6rem",
                      color: "var(--bgDarkerColor)",
                    }}
                  />
                  <h4>videos</h4>
                  <p>No videos paid for this order</p>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="text-center">
          <PiEmptyBold
            className="mt-2"
            style={{
              fontSize: "6rem",
              color: "var(--bgDarkerColor)",
            }}
          />
          <h4>Orders</h4>
          <p>It seems you have not placed any orders yet.</p>
        </div>
      )}
    </div>
  );
};

export default UserVideos;
