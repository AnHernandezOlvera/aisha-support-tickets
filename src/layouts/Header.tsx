import { useState } from "react"
import { useScroll } from "../hooks/useScroll"
import { useCloseOnResize } from "../hooks/useCloseOnResize"
import logo from "../assets/brand/logo-hospital-angeles.svg"
import logoHA from "../assets/brand/logo-ha.svg"
import LogoutIcon from "../assets/icons/out-white.svg"
import LogoutIconBlue from "../assets/icons/out-blue.svg"
import UserIcon from "../assets/icons/user.svg"


function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScroll(0)
  useCloseOnResize(menuOpen, () => setMenuOpen(false))


  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-dark-blue/70 shadow-md py-4" : "bg-transparent py-12"
        } text-white`}
    >
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-12">

        <img src={logo} alt="Hospital Ángeles" className="h-10 hidden md:block" />
        <img src={logoHA} alt="Hospital Ángeles" className="h-10 md:hidden" />

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6 text-sm" role="navigation">
            <a href="#" className="hover:underline">Pacientes</a>
            <span>|</span>
            <a href="#" className="hover:underline">Soporte</a>
            <button
              className="flex gap-2 items-center px-2 py-2 text-sm rounded external bg-brand hover:bg-accent"
              aria-label="Cerrar sesión"
            >
              <img src={LogoutIcon} alt="" className="w-4 h-4" />
              Salir
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <img src={UserIcon} alt="Usuario" className="w-9 h-9" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-medium text-sm">Norma Rodríguez</span>
              <span className="text-xs text-gray-300">Paciente</span>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            className="focus:outline-none"
            aria-label="Abrir menú"
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-[var(--color-light-blue)] z-50 flex flex-col py-12 px-6">
          <div className="flex justify-between items-center mb-6">
            <img src={logoHA} alt="Hospital Ángeles" className="h-10" />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-3xl"
              aria-label="Cerrar menú"
            >
              &times;
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <img src={UserIcon} alt="Usuario" className="w-10 h-10" />
            <div>
              <p className="font-medium">Norma Rodríguez</p>
              <p className="text-sm text-gray-200">Paciente</p>
            </div>
          </div>

          <nav className="flex flex-col gap-4 text-lg" role="navigation">
            <a href="#" className="hover:underline">Pacientes</a>
            <a href="#" className="hover:underline">Soporte</a>
          </nav>

          <button
            className="mt-6 flex gap-2 items-center px-4 py-2 text-sm rounded bg-white text-[var(--color-light-blue)] hover:bg-gray-100 w-fit"
            aria-label="Cerrar sesión"
          >
            <img src={LogoutIconBlue} alt="" className="w-4 h-4" />
            Salir
          </button>
        </div>
      )}
    </header>
  )
}

export default Header
