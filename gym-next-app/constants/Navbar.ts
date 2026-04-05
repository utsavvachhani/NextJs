import HomeIcon from "@mui/icons-material/Home";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import AccessibilityRoundedIcon from "@mui/icons-material/AccessibilityRounded";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CloseIcon from "@mui/icons-material/Close";

export const NAVBAR_LINKS = [
  { name: "Home", link: "/", icon: HomeIcon },
  { name: "About", link: "/about", icon: InfoIcon },
  { name: "Gym", link: "/gym", icon: FitnessCenterIcon },
  { name: "Shop", link: "/shop", icon: ShoppingBagRoundedIcon },
  { name: "Trainer", link: "/trainer", icon: AccessibilityRoundedIcon },
];

export const USER_MENU = [
  {
    label: "Profile",
    href: "/profile",
    icon: AssignmentIndIcon,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: FitnessCenterIcon,
  },
  {
    label: "Todo",
    href: "/todo",
    icon: ListAltIcon,
  },
  {
    label: "Videos",
    href: "/videos",
    icon: VideoLibraryIcon,
  },
  {
    label: "Sign Out",
    href: "/logout",
    icon: CloseIcon,
  },
];