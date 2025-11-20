import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-lg">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              Modern E‑commerce SaaS
            </h1>
            <p className="mt-3 md:mt-4 text-slate-700 text-sm md:text-base">
              Sell products, manage carts, and checkout securely. Minimalist fintech vibe with built‑in auth and payments.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="#products" className="inline-flex items-center px-5 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition">Browse products</a>
              <a href="#auth" className="inline-flex items-center px-5 py-2.5 rounded-lg bg-white text-slate-900 border border-slate-300 hover:bg-slate-50 transition">Sign in</a>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
    </section>
  )
}
