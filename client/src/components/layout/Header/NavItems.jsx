import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
const NavIcons = [
    {
        logo: <CiSearch/>,
        url: "/search"
    },
    {
        logo: <FaShoppingCart/>,
        url: "/cart"
    },
    {
        logo: <FaUserCircle/>,
        url: "/profile"
    }
]


const NavItems = [
    {
        title:"Home",
        url:"/"
    },
    {
        title:"Products",
        url:"/products"
    },
    {
        title:"Contact",
        url:"/contact"
    },
    {
        title:"About",
        url:"/about"
    },
]

export {NavIcons,NavItems}