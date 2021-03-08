import React from "react";
import AdminDashboard from "../../pages/admin/AdminDashboard";
import { Card } from "antd";
import laptop from "../../images/image.jpeg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {Link} from 'react-router-dom'

const { Meta } = Card;

const AdminProductCard = ({ product: { title, description, images, slug }, handleRemove }) => {
  return (
    <Card
      hoverable
      cover={
        <img
          src={images && images.length ? images[0].url : laptop}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleRemove(slug)}
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
