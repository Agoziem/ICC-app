import { useUserContext } from "@/data/usercontextdata";
import React from "react";
import { useSession } from "next-auth/react";
import { PiEmptyBold } from "react-icons/pi";

const UserServices = () => {
  const { userOrder } = useUserContext();
  const { data: session } = useSession();

//   {
//     "id": 16,
//     "organization": {
//         "id": 1,
//         "name": "Innovations Cybercafe"
//     },
//     "preview": null,
//     "img_url": null,
//     "img_name": null,
//     "category": {
//         "id": 1,
//         "category": "Olevel",
//         "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam excepturi culpa dolore possimus suscipit assumenda ad id officia consequuntur"
//     },
//     "subcategory": null,
//     "name": "Testing3",
//     "description": "Testing3",
//     "service_flow": "None",
//     "price": "3000.00",
//     "number_of_times_bought": 1,
//     "created_at": "2024-07-02T08:22:10.585182Z",
//     "updated_at": "2024-07-19T20:56:52.521752Z",
//     "userIDs_that_bought_this_service": [
//         1
//     ]
// }

  return (
    <div>
      {userOrder.length > 0 ? (
        userOrder.map((order) => {
          const paidServices = order.services.filter((service) =>
            service.userIDs_that_bought_this_service.includes(
              parseInt(session?.user?.id)
            )
          );

          return (
            <div key={order.id}>
              {paidServices.length > 0 ? (
                paidServices.map((service) => (
                  <div key={service.id}>
                    <h1>{service.name}</h1>
                    <p>{service.description}</p>
                    <p>{service.price}</p>
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
                  <h4>Services</h4>
                  <p>No services paid for this order</p>
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

export default UserServices;
