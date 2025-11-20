export const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const json = (res) => {
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json()
}

export const api = {
  // Auth
  signup: (payload) => fetch(`${API_BASE}/auth/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(json),
  signin: (payload) => fetch(`${API_BASE}/auth/signin`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(json),

  // Products
  listProducts: () => fetch(`${API_BASE}/products`).then(json),
  createProduct: (product) => fetch(`${API_BASE}/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product) }).then(json),

  // Cart
  getCart: (userId) => fetch(`${API_BASE}/cart/${userId}`).then(json),
  addToCart: (payload) => fetch(`${API_BASE}/cart/add`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(json),

  // Checkout
  checkout: (userId) => fetch(`${API_BASE}/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: userId }) }).then(json),
}

export function getSession() {
  const raw = localStorage.getItem('session')
  return raw ? JSON.parse(raw) : null
}

export function setSession(sess) {
  localStorage.setItem('session', JSON.stringify(sess))
}

export function clearSession() {
  localStorage.removeItem('session')
}
