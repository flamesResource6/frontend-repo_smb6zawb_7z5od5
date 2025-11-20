import Hero from './components/Hero'
import Auth from './components/Auth'
import ProductGrid from './components/ProductGrid'
import CartBar from './components/CartBar'

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-slate-200">
        <div className="container mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <a href="/" className="font-semibold">Fintech Shop</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#products" className="hover:text-slate-600">Products</a>
            <a href="#auth" className="hover:text-slate-600">Account</a>
            <a href="/test" className="hover:text-slate-600">System</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <ProductGrid />
        <Auth />
      </main>

      <footer className="py-8 border-t border-slate-200 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} Fintech Shop — Minimal e‑commerce SaaS
      </footer>

      <CartBar />
    </div>
  )
}

export default App