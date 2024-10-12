import { v4 as uuidv4 } from 'uuid';

const navlist = [
  {
    id: uuidv4(),
    title: "Home",
    link: "/",
  },
  {
    id: uuidv4(),
    title: "About",
    link: "/#about",
  },
  {
    id: uuidv4(),
    title: "Services",
    link: "/#services",
  },
  {
    id: uuidv4(),
    title: "Departments",
    link: "/#staffs",
  },
  {
    id: uuidv4(),
    title: "Testimonials",
    link: "/#testimonials",
  },
  {
    id: uuidv4(),
    title: "Contact us",
    link: "/#contact",
  },
  {
    id: uuidv4(),
    title: "Articles",
    link: "/articles",
  },
];

export default navlist;
