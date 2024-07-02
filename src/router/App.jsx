import React from 'react'
import {BrowserRouter,Route , Routes} from 'react-router-dom';
import Layouts from './pages/Layouts';
import Home from './pages/Home';
import Blog from './pages/Blogs';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layouts />}>
            <Route index element={<Home/>}/>
            <Route path='blogs' element={<Blog/>}/>
            <Route path='contact' element={<Contact/>}/>
            <Route path='*' element={<PageNotFound/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

