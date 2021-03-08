import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";

import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
  color: "",
  brand: "",
};

const ProductUpdate = ({ match, history }) => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([])
  const [selectedCategory , setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(false);


  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(match.params.slug).then((p) => {
      //  console.log('single product', p)
      console.log(p.data);
      setValues({ ...values, ...p.data });
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data);
      });
      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      });
      console.log('arr',arr)
      setArrayOfSubs(prev => arr)
    });
  };

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    values.subs = arrayOfSubs
    values.category = selectedCategory ? selectedCategory : values.category

    updateProduct(match.params.slug, values, user.token).then(res=> {
       setLoading(false)
       toast.success(`"${res.data.title}" is updated`)
       history.push('/admin/products')
    }).catch(err => {
       setLoading(false);
      console.log(err)
       toast.error(err.response.data.err);
    })
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, ' ===== >>', e.target.value)
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("Clicked category", e.target.value);
    setValues({ ...values, subs: []});

    setSelectedCategory(e.target.value)

    getCategorySubs(e.target.value).then((res) => {
      console.log(res.data);
      setSubOptions(res.data);
    });

    if(values.category._id === e.target.value) {
      loadProduct()
    }
    setArrayOfSubs([])
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product update</h4>
          )}

        
          {/* {JSON.stringify(values)} */}
          {/* {JSON.stringify(subOptions)}*/}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

         
          <ProductUpdateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
