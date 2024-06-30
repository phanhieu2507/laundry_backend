import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, Modal, Form, Input, DatePicker, Select, notification } from 'antd';
import axios from "../../../component/api/axios"; // Đường dẫn tùy thuộc vào cấu hình của bạn
import AdminNavbar from "../../../component/navbar/admin-nav";
import AdminSidebar from "../../../component/sidebar/admin-side";
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { Option } = Select;

const PromoCodeList = () => {
    const [promoCodes, setPromoCodes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentPromoCode, setCurrentPromoCode] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        fetchPromoCodes();
    }, []);

    const fetchPromoCodes = async () => {
        try {
            const { data } = await axios.get('/promo-codes');
            setPromoCodes(data);
        } catch (error) {
            notification.error({ message: 'Error fetching promo codes' });
        }
    };

    const handleAdd = () => {
        form.resetFields();
        setCurrentPromoCode(null);
        setIsModalVisible(true);
    };

    const handleEdit = (promoCode) => {
        setCurrentPromoCode(promoCode);
        form.setFieldsValue({
            ...promoCode,
            valid_from: moment(promoCode.valid_from),
            valid_until: moment(promoCode.valid_until)
        });
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/promo-codes/${id}`);
            fetchPromoCodes();
            notification.success({ message: 'Promo code deleted successfully' });
        } catch (error) {
            notification.error({ message: 'Error deleting promo code' });
        }
    };

    const handleSubmit = async (values) => {
        const payload = {
            ...values,
            valid_from: values.valid_range[0].format('YYYY-MM-DD'),
            valid_until: values.valid_range[1].format('YYYY-MM-DD')
        };
        try {
            if (currentPromoCode) {
                await axios.put(`/promo-codes/${currentPromoCode.id}`, payload);
            } else {
                await axios.post('/promo-codes', payload);
            }
            fetchPromoCodes();
            setIsModalVisible(false);
            notification.success({ message: `Promo code ${currentPromoCode ? 'updated' : 'added'} successfully` });
        } catch (error) {
            notification.error({ message: `Error ${currentPromoCode ? 'updating' : 'adding'} promo code` });
        }
    };

    const columns = [
        { title: 'Code', dataIndex: 'code', key: 'code' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Discount Type', dataIndex: 'discount_type', key: 'discount_type' },
        { title: 'Discount Value', dataIndex: 'discount_value', key: 'discount_value' },
        { title: 'Valid From', dataIndex: 'valid_from', key: 'valid_from' },
        { title: 'Valid Until', dataIndex: 'valid_until', key: 'valid_until' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Usage Limit', dataIndex: 'usage_limit', key: 'usage_limit' },
        { title: 'Times Used', dataIndex: 'times_used', key: 'times_used' },
        {
            title: 'Actions', key: 'actions', render: (_, record) => (
                <div className="flex items-center space-x-2">
                    <Button icon={<EditOutlined />} className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg w-24" onClick={() => handleEdit(record)} type="primary">Edit</Button>
                    <Popconfirm title="Are you sure to delete this promo code?" onConfirm={() => handleDelete(record.id)}>
                        <Button icon={<DeleteOutlined />}className="bg-red-500 hover:bg-red-600 text-white rounded-lg w-24" type="danger" >Delete</Button>
                    </Popconfirm>
                </div>
            )
        },
    ];

    return (
        <div>
            <AdminNavbar />
            <div className="flex">
                <AdminSidebar />
                <div className="flex-grow ml-64 mt-24">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Promo Codes
            </h2>
                    <Button type="primary" className="bg-green-500 hover:bg-green-600 mb-4 rounded-lg text-white" onClick={handleAdd}>Add Promo Code</Button>
                    <Table  columns={columns} 
                            dataSource={promoCodes} 
                            rowKey="id"
                            onRow={(record) => ({
                                onClick: () => {
                                    console.log('Navigating to:', `/${record.id}`); // Thêm log để debug
                                    navigate(`${record.id}`);
                                }
                            })}
                            />
                    <Modal title={`${currentPromoCode ? 'Edit' : 'Add'} Promo Code`} visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
                        <Form form={form} layout="vertical" onFinish={handleSubmit}>
                            <Form.Item name="code" label="Code" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="description" label="Description">
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item name="discount_type" label="Discount Type" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="fixed">Fixed</Option>
                                    <Option value="percentage">Percentage</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="discount_value" label="Discount Value" rules={[{ required: true }]}>
                                <Input type="number" />
                            </Form.Item>
                            <Form.Item name="valid_range" label="Valid Range" rules={[{ required: true }]}>
                                <RangePicker />
                            </Form.Item>
                            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="active">Active</Option>
                                    <Option value="inactive">Inactive</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="usage_limit" label="Usage Limit">
                                <Input type="number" />
                            </Form.Item>
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg w-24" type="primary"  htmlType="submit">Submit</Button>
                        </Form>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default PromoCodeList;
