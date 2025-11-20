import { useEffect, useState } from 'react'
import { api, getSession } from '../lib/api'

export default function CartBar() {
  const [total, setTotal] = useState(0)
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([])

  const load = async () => {
    const sess = getSession()
    if (!sess) return
    const data = await api.getCart(sess.user_id)
    setTotal(data.total)
    setItems(data.items)
  }

  useEffect(() => {
    load()
    const handler = () => load()
    window.addEventListener('session-change', handler)
    return () => window.removeEventListener('session-change', handler)
  }, [])

  const checkout = async () => {
    const sess = getSession()
    if (!sess) return alert('Sign in first')
    const res = await api.checkout(sess.user_id)
    alert(`Payment successful: ${res.payment_ref} for $${res.amount}`)
    await load()
  }

  return (
    <div className="fixed bottom-4 right-4">
      <button onClick={() => setOpen(!open)} className="px-4 py-2 rounded-full shadow bg-slate-900 text-white">
        Cart • ${total.toFixed(2)}
      </button>
      {open && (
        <div className="mt-2 w-80 max-h-96 overflow-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-4">
          <h4 className="font-semibold text-slate-900">Your Cart</h4>
          <div className="mt-2 space-y-3">
            {items.length === 0 ? (
              <p className="text-sm text-slate-600">No items yet</p>
            ) : items.map((it, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900">{it.title}</p>
                  <p className="text-xs text-slate-600">{it.quantity} × ${it.price.toFixed(2)}</p>
                </div>
                <span className="text-sm font-semibold">${it.subtotal.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-slate-700">Total</span>
            <span className="font-semibold text-slate-900">${total.toFixed(2)}</span>
          </div>
          <button onClick={checkout} className="mt-3 w-full px-4 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800">Checkout</button>
        </div>
      )}
    </div>
  )
}
