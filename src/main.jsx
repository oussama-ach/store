import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './router/App'
import ProductList from './store/ProductList'
import Product from './store/Product'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <App/>
    <ProductList/>

)
