import { useEffect, useState } from 'react'
import { api, getSession } from '../lib/api'

export default function ProductGrid() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.listProducts().then(setProducts).catch(()=>{}).finally(()=>setLoading(false))
  }, [])

  const add = async (id) => {
    const sess = getSession()
    if (!sess) return alert('Sign in first')
    await api.addToCart({ user_id: sess.user_id, product_id: id, quantity: 1 })
    alert('Added to cart')
  }

  if (loading) return <div className="py-12 text-center text-slate-600">Loading products…</div>

  return (
    <section id="products" className="py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-2xl shadow border border-slate-200 overflow-hidden">
              {p.image_url && <img src={p.image_url} alt={p.title} className="w-full h-40 object-cover" />}
              <div className="p-4">
                <h3 className="font-semibold text-slate-900">{p.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2 mt-1">{p.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-slate-900 font-semibold">${p.price.toFixed(2)}</span>
                  <button onClick={() => add(p.id)} className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800">Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
