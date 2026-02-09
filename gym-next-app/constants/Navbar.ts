import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import AccessibilityRoundedIcon from '@mui/icons-material/AccessibilityRounded';

export const NAVBAR_LINKS = [
  {name: "Home", link: "/" , icon: HomeIcon},
  {name: "About", link: "/about", icon: InfoIcon},
  {name: "Gym", link: "/gym", icon: FitnessCenterIcon},
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
    label: "Sign Out",
    href: "/logout",
  },
]
