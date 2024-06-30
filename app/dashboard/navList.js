const navList = [
  {
    _id: 1,
    name: "Dashboard",
    icon: "bi bi-speedometer2",
    link: "/dashboard",
  },
  {
    _id: 2,
    name: "services",
    icon: "bi bi-person-gear",
    link: "/dashboard/services",
  },
  {
    _id: 3,
    name: "applications",
    icon: "bi bi-google-play",
    link: "/dashboard/applications",
  },
  {
    _id: 4,
    name: "cbt practice",
    icon: "bi bi-laptop",
    link: "/dashboard/cbt",
  },
  {
    _id: 5,
    name: "chat",
    icon: "bi bi-wechat",
    link: "/dashboard/chat",
  },
  {
    _id: 6,
    name: "payments",
    icon: "bi bi-cash-coin",
    link: "/dashboard/payments",
  },
  {
    _id: 7,
    name: "customers",
    icon: "bi bi-people",
    link: "/dashboard/customers",
  },
  {
    _id: 8,
    name: "configurations",
    icon: "bi bi-gear",
    link: "#",
    content: [
      {
        _id: 1,
        name: "homepage",
        icon: "bi bi-house",
        link: "/dashboard/configuration/homepage",
      },
      {
        _id: 2,
        name: "services & applications",
        icon: "bi bi-person-gear",
        link: "/dashboard/configuration/services",
      },
      {
        _id: 3,
        name: "articles",
        icon: "bi bi-journal-bookmark-fill",
        link: "/dashboard/configuration/articles",
      },
      {
        _id: 4,
        name: "cbtpractice",
        icon: "bi bi-laptop",
        link: "/dashboard/configuration/cbt",
      },
    ],
  },
  {
    _id: 9,
    name: "profile",
    icon: "bi bi-person-circle",
    link: "/dashboard/profile",
  },
  {
    _id: 10,
    name: "logout",
    icon: "bi bi-box-arrow-in-right",
    link: "#",
  },
];

export default navList;
