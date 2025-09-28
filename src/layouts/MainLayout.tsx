import Footer from "./Footer"
import Header from "./Header"

type MainLayoutProps = React.PropsWithChildren

/**
 * Main application layout component.
 *
 * Wraps the application pages with a common structure:
 * - Header at the top
 * - Footer at the bottom
 * - Main content area in the middle
 *
 * Used to provide a consistent look and feel across the app.
 */


function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="max-w-screen-xl w-full mx-auto px-12 flex-1 pt-35 md:pt-32" role="main">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
