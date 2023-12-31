import { updateLocalStorage } from "@/utils/updateLocalStorage"
import { createContext, useContext, useState, useEffect } from "react"

const CartCtx = createContext()
export const useCartContext = () => useContext(CartCtx)

const CartContextProvider = ({ children }) => {

  const [cart, setCart] = useState([])

  // GET LOCAL STORAGE CART DATA IF ANY
  useEffect(() => {

    if (typeof window !== 'undefined' && localStorage.getItem("cart")) {

      const localCart = JSON.parse(localStorage.getItem("cart"))

      setCart(localCart)

    }
  }, [])

  // ADD ITEM TO CART
  const addItem = (item, qty) => {

    const index = cart.findIndex(i => i.id === item.idproducto)

    //IF NEW ITEM
    if (index === -1) {

      const cartItem = {
        id: item.idproducto,
        name: item.nombre,
        image: item.archivos[0].imagen,
        price: item.preciofinal,
        stock: item.stockactual,
        qty: qty,
        subtotal: item.preciofinal * qty,
      }

      const updatedCart = [...cart, cartItem]

      setCart(updatedCart)

      updateLocalStorage(updatedCart)

      return { success: true, msg: `Agregaste ${qty} producto/s al carrito` }
    }

    const newCart = [...cart]

    // IF QTY SELECTED IS MORE THAN STOCK
    if (newCart[index].qty === item.stockactual) {

      return { success: false, msg: "No hay más stock" }
    }

    // IF ITEM EXISTS UPDATE QTY
    newCart[index].qty += qty

    setCart(newCart)

    updateLocalStorage(newCart)

    return { success: true, msg: `Agregaste ${qty} producto/s al carrito` }
  }

  // REMOVE ITEM FROM CART
  const removeItem = (id) => {
    const filteredCart = cart.filter(item => item.id !== id)
    updateLocalStorage(filteredCart)
    setCart(filteredCart)
  }

  // GET CART TOTAL PRICE (if no shipping parameter make it 0)
  const cartTotal = (shipping = 0) => {

    const temp = cart.map(product => product.subtotal)

    const subtotal = temp.reduce((total, productPrice) => total + productPrice, 0)

    const total = subtotal + shipping

    return total.toFixed(2)
  }

  const cartTotalItems = () => {

    const temp = cart.map(product => product.qty)

    const total = temp.reduce((total, productQty) => total + productQty, 0)

    return total
  }

  return (
    <CartCtx.Provider value={{ cart, addItem, removeItem, cartTotal, cartTotalItems }}>
      {children}
    </CartCtx.Provider>
  )
}

export default CartContextProvider