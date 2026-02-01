'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import "@/styles/globals.css"
import { logoWhite, logoBlack } from '@/sources'
import ThemeToggle from './theme-toggale/ThemeToggale'
import { useTheme } from './theme-toggale/useTheme'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useRouter } from 'next/navigation'

function Navbar() {
  const { theme } = useTheme()
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen)

  const handleNavigation = (path: string) => {
    router.push(path)
    setMobileMenuOpen(false)
  }

  return (
    <nav className='navbar w-full bg-transparent px-4 py-3 shadow-md relative z-50'>
      <div className='max-w-screen-xl mx-auto flex items-center justify-between p-7'>
        {/* Logo */}
        <div className='w-32 cursor-pointer' onClick={() => handleNavigation('/')}>
          {
            theme === 'dark' ?
              <Image src={logoWhite} alt='Logo' width={128} height={48} />
              :
              <Image src={logoBlack} alt='Logo' width={128} height={48} />
          }
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:block'>
          <ul className='flex space-x-8 gap-5'>
            <li onClick={() => handleNavigation('/')} className='font-semibold text-lg cursor-pointer navbar-textHover'>Home</li>
            <li onClick={() => handleNavigation('/about')} className='font-semibold text-lg cursor-pointer navbar-textHover'>About</li>
            <li onClick={() => handleNavigation('/services')} className='font-semibold text-lg cursor-pointer navbar-textHover'>Services</li>
            <li onClick={() => handleNavigation('/contact')} className='font-semibold text-lg cursor-pointer navbar-textHover'>Contact</li>
          </ul>
        </div>

        {/* Desktop Auth & ThemeToggle */}
        <div className='hidden md:block'>
          <ul className='flex space-x-8 gap-5 justify-center items-center'>
            <li><ThemeToggle /></li>
            <li onClick={() => handleNavigation('/login')} className='font-semibold text-lg cursor-pointer navbar-textHover'>Login</li>
            <li onClick={() => handleNavigation('/signup')} className='font-semibold text-lg cursor-pointer navbar-textHover'>Sign Up</li>
          </ul>
        </div>

        {/* Mobile Menu Icon */}
        <div className='md:hidden block cursor-pointer' onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <div className={`
        fixed top-15 flex justify-center right-0 h-full w-40 z-40 shadow-lg p-6 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <ul className='flex flex-col space-y-6'>
          <li onClick={() => handleNavigation('/')} className='font-semibold text-lg cursor-pointer navbar-textHover'>Home</li>
          <li onClick={() => handleNavigation('/about')} className='font-semibold text-lg cursor-pointer navbar-textHover'>About</li>
          <li onClick={() => handleNavigation('/services')} className='font-semibold text-lg cursor-pointer navbar-textHover'>Services</li>
          <li onClick={() => handleNavigation('/contact')} className='font-semibold text-lg cursor-pointer navbar-textHover'>Contact</li>
          <li><ThemeToggle /></li>
          <li onClick={() => handleNavigation('/login')} className='font-semibold text-lg cursor-pointer navbar-textHover'>Login</li>
          <li onClick={() => handleNavigation('/signup')} className='font-semibold text-lg cursor-pointer navbar-textHover'>Sign Up</li>
        </ul>
      </div>

      {/* Optional Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-opacity-100 z-30 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </nav>
  )
}

export default Navbar
