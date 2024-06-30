import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, notification } from "antd";
import axios from "../../../../component/api/axios";
import AdminNavbar from "../../../../component/navbar/admin-nav";
import AdminSidebar from "../../../../component/sidebar/admin-side"; // Import sidebar component
import { useNavigate } from "react-router-dom";

import moment from "moment";

const { Option } = Select;

const AdminCreateOrder = () => {
  const [formData, setFormData] = useState({
    phone: "",
    total_amount: "",
    payment_status: "",
    order_date: null,
    service: [],
    detail: "",
    promo_code: ""
  });
  const [serviceList, setServiceList] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchServiceList = async () => {
      try {
        const response = await axios.get("/services");
        setServiceList(response.data.map(service => ({
          ...service,
          value: service.service_name
        })));
      } catch (error) {
        console.error("Error fetching service list:", error);
      }
    };
    fetchServiceList();
  }, []);

  const checkPromoCode = async (phone, promoCode) => {
    try {
      const response = await axios.post('/promo-codes/apply', { code: promoCode, phone: phone });
      return response.data; // Return discount info if promo code is valid
    } catch (error) {
      notification.error({
        message: 'Promo Code Error',
        description: error.response ? error.response.data.message : "There was an error applying the promo code.",
      });
      return null; // Return null indicating the promo code application failed
    }
  };
  
  // Ensure this function is called within your form submission logic
  
  const handleSubmit = async () => {

    const promoResponse = await checkPromoCode(formData.phone, formData.promo_code);
    if (!promoResponse) {
      return; // Stop the submission if the promo code application failed
    }
  
    try {
      const dataToSend = {
        ...formData,
        order_date: formData.order_date ? formData.order_date.format('YYYY-MM-DD') : '',
        service: formData.service.join(", "),
        discount: promoResponse.discount_value, // Optional: send discount info to backend
        discount_type: promoResponse.discount_type // Optional: send discount type to backend
      };
      await axios.post("/orders", dataToSend);
      notification.success({
        message: "Order Created Successfully",
        description: `Discount applied: ${promoResponse.discount_value} if applicable.`,
      });
      setFormData({...formData, phone: "", total_amount: "", payment_status: "", order_date: null, service: [], detail: "", promo_code: ""}); // Reset form
      navigate('/admin/orders'); // Navigate to order list
    } catch (error) {
      notification.error({
        message: "Error Creating Order",
        description: error.response ? error.response.data.message : error.message,
      });
    }
  };  

  return (
    <div>
      <AdminNavbar />
      <div className="flex"> {/* Flex container for sidebar */}
        <AdminSidebar /> {/* Sidebar component */}
        <div className=" mx-auto w-96 mt-32 p-4 shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Create Order</h2>
          <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Phone" name="phone">
            <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </Form.Item>
          <Form.Item label="Total Amount" name="total_amount">
            <Input type="number" value={formData.total_amount} onChange={e => setFormData({...formData, total_amount: parseFloat(e.target.value)})} />
          </Form.Item>
          <Form.Item label="Payment Status" name="payment_status">
            <Select value={formData.payment_status} onChange={value => setFormData({...formData, payment_status: value})}>
              <Option value="paid">Paid</Option>
              <Option value="unpaid">Unpaid</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Order Date" name="order_date">
            <DatePicker value={formData.order_date} onChange={(date) => setFormData({...formData, order_date: date})} />
          </Form.Item>
          <Form.Item label="Service" name="service">
            <Select
              mode="multiple"
              value={formData.service}
              onChange={value => setFormData({...formData, service: value})}
            >
              {serviceList.map(service => (
                <Option key={service.service_id} value={service.service_name}>{service.service_name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Detail" name="detail">
            <Input.TextArea value={formData.detail} onChange={e => setFormData({...formData, detail: e.target.value})} />
          </Form.Item>
          <Form.Item label="Promo Code" name="promo_code">
            <Input value={formData.promo_code} onChange={e => setFormData({...formData, promo_code: e.target.value})} />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="w-32 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
            Create Order
          </Button>
          <Button
            onClick={() => navigate('/admin/orders')}
            className="w-32 ml-24 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
          >
            Cancel
          </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateOrder;
