import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, DatePicker, notification } from "antd";
import moment from "moment";
import axios from "../../../../component/api/axios";
import AdminNavbar from "../../../../component/navbar/admin-nav";

const { Option } = Select;

const AdminEditOrder = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [serviceList, setServiceList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderDetailsResponse, serviceListResponse] = await Promise.all([
          axios.get(`/orders/${orderId}`),
          axios.get("/services")
        ]);

        setServiceList(serviceListResponse.data);
        const fetchedData = {
          ...orderDetailsResponse.data,
          phone: orderDetailsResponse.data.user.phone,
          order_date: moment(orderDetailsResponse.data.order_date),
          service: orderDetailsResponse.data.service.split(", "),
          promo_code: orderDetailsResponse.data.promo_code || ''  // Assuming there is a promo_code field in the response
        };
        form.setFieldsValue(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        notification.error({
          message: 'Error Fetching Data',
          description: 'There was an issue fetching order and service details.'
        });
      }
    };

    fetchData();
  }, [orderId, form]);

  const handleSubmit = async (values) => {
    try {
      await axios.put(`/orders/${orderId}`, {
        ...values,
        order_date: values.order_date.format("YYYY-MM-DD"),
        service: values.service.join(", "),
        promo_code: values.promo_code
      });
      notification.success({
        message: "Order Updated Successfully",
      });
      navigate("/admin/orders");
    } catch (error) {
      console.error("Error updating order:", error);
      notification.error({
        message: 'Error Updating Order',
        description: error.message,
      });
    }
  };

  return (
    <div>
      <AdminNavbar/>
      <div className="max-w-lg mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Edit Order</h2>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Phone" name="phone">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Total Amount" name="total_amount">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Payment Status" name="payment_status">
            <Select>
              <Option value="paid">Paid</Option>
              <Option value="unpaid">Unpaid</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Order Date" name="order_date">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item label="Service" name="service">
            <Select mode="multiple">
              {serviceList.map(service => (
                <Option key={service.service_id} value={service.service_name}>{service.service_name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Detail" name="detail">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Promo Code" name="promo_code">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg w-24 ">
            Update Order
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AdminEditOrder;
