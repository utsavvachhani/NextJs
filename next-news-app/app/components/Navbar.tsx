"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  Newspaper,
  Search as SearchIcon,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

/* ---------- TYPES ---------- */
type NavItem = {
  label: string;
  href?: string;
  subItems?: { label: string; href: string; subSubItems?: { label: string; href: string }[] }[];
};

/* ---------- CONSTANTS ---------- */
const NAV_ITEMS: NavItem[] = [
  {
    label: "World",
    href: "/news/world",
  },
  {
    label: "Business",
    href: "/news/business",
  },
  {
    label: "Technology",
    href: "/news/technology",
  },
  {
    label: "Sports",
    href: "/news/sports",
  },
  {
    label: "Cities",
    href: "/news/cities",
    subItems: [
      { label: "New York", href: "/news/cities/ny" },
      { label: "London", href: "/news/cities/london" },
      { label: "Tokyo", href: "/news/cities/tokyo" },
    ],
  },
  {
    label: "Case Studies",
    href: "/case-studies",
  },
];

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; avatar: string; bio: string } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    setUser(null);
    router.push("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${searchQuery}`);
  };

  return (
    <nav className="bg-slate-900 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Newspaper className="w-7 h-7 text-blue-400" />
            <span>DailyNews</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href || "#"}
                  className="px-3 py-2 hover:text-blue-400 transition flex items-center gap-1"
                >
                  {item.label}
                  {item.subItems && <ChevronDown size={14} />}
                </Link>

                {/* Dropdown */}
                {item.subItems && (
                  <ul className="absolute top-10 left-0 w-48 bg-slate-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.subItems.map((sub) => (
                      <li key={sub.href} className="relative group">
                        <Link
                          href={sub.href}
                          className="block px-4 py-2 hover:bg-slate-700 hover:text-blue-400 transition"
                        >
                          {sub.label}
                        </Link>

                        {sub.subSubItems && (
                          <ul className="absolute top-0 left-full w-44 bg-slate-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            {sub.subSubItems.map((subSub) => (
                              <li key={subSub.href}>
                                <Link
                                  href={subSub.href}
                                  className="block px-4 py-2 hover:bg-slate-600 hover:text-blue-400 transition"
                                >
                                  {subSub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="ml-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="px-3 py-1 rounded-md text-black focus:outline-none"
              />
              <button type="submit" className="ml-1 text-blue-400">
                <SearchIcon size={18} />
              </button>
            </form>
          </div>

          {/* Right Side (User/Login) */}
          <div className="flex items-center gap-4">
            {!user ? (
              <button
                onClick={() => router.push("/login")}
                className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-md text-sm font-semibold"
              >
                Login
              </button>
            ) : (
              <div className="relative group">
                <div className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition">
                  <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                  <span>{user.name}</span>
                  <ChevronDown size={14} />
                </div>
                <div className="absolute right-0 top-10 w-48 bg-slate-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4 z-50">
                  <p className="text-sm">{user.bio}</p>
                  <Link href="/profile" className="block mt-2 hover:text-blue-400">
                    My Account
                  </Link>
                  <Link href="/settings" className="block mt-1 hover:text-blue-400">
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-900 px-4 py-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="space-y-1">
              <Link href={item.href || "#"} className="block px-2 py-2 hover:text-blue-400">
                {item.label}
              </Link>
              {item.subItems &&
                item.subItems.map((sub) => (
                  <div key={sub.href} className="pl-4">
                    <Link href={sub.href} className="block px-2 py-1 hover:text-blue-400">
                      {sub.label}
                    </Link>
                    {sub.subSubItems &&
                      sub.subSubItems.map((subSub) => (
                        <Link
                          key={subSub.href}
                          href={subSub.href}
                          className="block pl-4 px-2 py-1 hover:text-blue-400"
                        >
                          {subSub.label}
                        </Link>
                      ))}
                  </div>
                ))}
            </div>
          ))}

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mt-2 flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 px-3 py-2 rounded-md text-black focus:outline-none"
            />
            <button type="submit" className="text-blue-400">
              <SearchIcon size={18} />
            </button>
          </form>

          {/* Mobile Login/User */}
          {!user ? (
            <button
              onClick={() => router.push("/login")}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-md text-sm font-semibold"
            >
              Login
            </button>
          ) : (
            <div className="mt-2 border-t border-slate-700 pt-2">
              <p className="text-sm">{user.name}</p>
              <p className="text-xs text-slate-400">{user.bio}</p>
              <Link href="/profile" className="block mt-1 hover:text-blue-400">
                My Account
              </Link>
              <Link href="/settings" className="block mt-1 hover:text-blue-400">
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
