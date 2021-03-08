import React, {useState} from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link, useHistory } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from '../../images/image.jpeg'
import ProductListItems from '../cards/ProductListItems'
import StarRating from 'react-star-ratings'
import RatingModal from '../modal/RatingModal'
import { showAverage } from "../../functions/rating";
import _, { add } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import {addToWishlist} from '../../functions/user'
import { toast } from "react-toastify";


const {TabPane} = Tabs

const SingleProduct = ({ product, onStarClick, star }) => {
  const history = useHistory()

  const [tooltip, setTooltop] = useState("Click to add");

  const { user, cart } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const { title, images, description, _id } = product;

  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...product,
        count: 1,
      });
      let unique = _.uniqWith(cart, _.isEqual);

      // console.log('unique', unique)

      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltop("Added");

      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
        dispatch({
          type: "SET_VISIBLE",
          payload: true,
        });
    }
  };

  const handleAddToWishlist = e => {
    e.preventDefault()
    addToWishlist(product._id, user.token).then(res=> {
      console.log('ADDED TO WISHLIST', res.data)
      toast.success("Added to wishlist")
      // history.push('/user/wishlist')
    })
  }
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img src={Laptop} className="mb-3 card-image" />}></Card>
        )}
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on XXXX XXX XXX XXX to learn more about this product
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No ratings yet</div>
        )}

        <Card
          actions={[
            <Tooltip title={tooltip}>
              {" "}
              <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" /> <br /> Add to
                cart
              </a>
            </Tooltip>,
            <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br />
              Add to Wishlist
            </a>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
