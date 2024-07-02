import { useEffect, useState } from "react";
import Product from "./Product.jsx";

function ProductList() {
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error , setError] = useState();
  const [loading , setLoading ] = useState(true);
  const [serchInput, setSearchInput] = useState("");
  const [currentCategory, setCurrentCategory] = useState()


  const displayCategories = () => {
    return categories.map((category, key) => (
      <button
        onClick={(e) => {
          e.preventDefault();
          setCurrentCategory(category)
        }}
        key={key}
        className='btn btn-dark'
      >
        {category}
      </button>
    ));
  };

  const displayProduct = () => {
    let productTemp = productList.filter((product) => {
      return (
        product.title.includes(serchInput) ||
        product.id.toString().includes(serchInput) ||
        product.description.includes(serchInput)
      );
    });
    if(currentCategory !== undefined){
      productTemp = productTemp.filter((product)=>{
        return product.category === currentCategory
      })
    }
    if (productTemp.length > 0) {
      console.log(serchInput);

      return productTemp.map((product, key) => {
        return <Product product={product} key={key} />;
      });
    }
    return (
      <tr>
        <td colSpan={7}>No items</td>
      </tr>
    );
  };

  const getProduct = () => {
    setError(undefined);
    fetch("https://fakestoreapi.com/products")
      .then(reponse => reponse.json())
      .then((reponse) => setProductList(reponse));
  };
  const getCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((reponse) => reponse.json())
      .then((reponse) => setCategories(reponse));
  };
  useEffect(() => {
    getProduct();
    getCategories();
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = document.querySelector("#serach").value;
    setSearchInput(searchValue);
  };
  return (
    <div className="container-fluix mx-auto w-75 my-3">
      <h2>Search</h2>
      <form>
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <label className="col-form-label">Search</label>
          </div>
          <div className="col-auto">
            <input type="text" id="serach" className="form-control" />
          </div>
          <div className="col-auto">
            <input
              className="btn btn-primary"
              type="submit"
              value="Search"
              onClick={handleSearch}
            />
          </div>
        </div>
        <div className="row g-3 align-items-center">
          <h5>Categories :</h5>
          <div className="btn-group">{displayCategories()}</div>
        </div>
      </form>
      <h1>Products</h1>
      <table className="table">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>{displayProduct()}</tbody>
      </table>
    </div>
  );
}

export default ProductList;
