import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import AccessibilityRoundedIcon from '@mui/icons-material/AccessibilityRounded';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

export const NAVBAR_LINKS = [
  {name: "Home", link: "/" , icon: HomeIcon},
  {name: "About", link: "/about", icon: InfoIcon},
  {name: "Gym", link: "/gym", icon: FitnessCenterIcon},
  {name: "Videos", link: "/videos", icon: VideoLibraryIcon},
  {name: "Shop", link: "/shop", icon: ShoppingBagRoundedIcon},
  {name: "Trainer", link: "/trainer", icon: AccessibilityRoundedIcon},
];


export const USER_MENU = [
  {
    label: "Profile",
    href: "/profile",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Todo",
    href: "/todo",
  },
  {
    label: "Sign Out",
    href: "/logout",
  },
]
