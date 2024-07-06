const navList = [
  {
    _id: 1,
    name: "Dashboard",
    icon: "bi bi-speedometer2",
    link: "/dashboard",
  },
  {
    _id: 2,
    name: "Services",
    icon: "bi bi-person-gear",
    link: "/dashboard/services",
  },
  {
    _id: 3,
    name: "Applications",
    icon: "bi bi-google-play",
    link: "/dashboard/applications",
  },
  {
    _id: 4,
    name: "CBT Practice",
    icon: "bi bi-laptop",
    link: "/dashboard/cbt",
  },
  {
    _id: 5,
    name: "Chat",
    icon: "bi bi-wechat",
    link: "/dashboard/chat",
  },
  {
    _id: 6,
    name: "Payments",
    icon: "bi bi-cash-coin",
    link: "/dashboard/payments",
  },
  {
    _id: 7,
    name: "Customers",
    icon: "bi bi-people",
    link: "/dashboard/customers",
  },
  {
    _id: 8,
    name: "Configurations",
    icon: "bi bi-gear",
    link: "#",
    content: [
      {
        _id: 1,
        name: "Homepage",
        icon: "bi bi-house",
        link: "/dashboard/configuration/homepage",
      },
      {
        _id: 2,
        name: "Services & Applications",
        icon: "bi bi-person-gear",
        link: "/dashboard/configuration/services",
      },
      {
        _id: 3,
        name: "Articles",
        icon: "bi bi-journal-bookmark-fill",
        link: "/dashboard/configuration/articles",
      },
      {
        _id: 4,
        name: "CBTPractice",
        icon: "bi bi-laptop",
        link: "/dashboard/configuration/cbt",
      },
    ],
  },
  {
    _id: 9,
    name: "Profile",
    icon: "bi bi-person-circle",
    link: "/dashboard/profile",
  },
  {
    _id: 10,
    name: "Logout",
    icon: "bi bi-box-arrow-in-right",
    link: "#",
  },
];

export default navList;
