import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../component/api/axios";
import {
  Card,
  List,
  Typography,
  Rate,
  Avatar,
  Row,
  Col,
  Carousel,
  Space,
  Tag,
  Button,
  Divider,
} from "antd";
import moment from "moment";
import Image from "../../../../component/image";
import AdminNavbar from "../../../../component/navbar/admin-nav";
import AdminSidebar from "../../../../component/sidebar/admin-side";
import UserNavbar from "../../../../component/navbar/user-nav";
import UserSidebar from "../../../../component/sidebar/user-side";
const { Title, Text } = Typography;

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const role = JSON.parse(sessionStorage.getItem('userData')).user.role;
  useEffect(() => {
    fetchServiceDetails();
    fetchServiceReviews();
  }, [serviceId]);

  const fetchServiceDetails = async () => {
    try {
      const response = await axios.get(`/services/${serviceId}`);
      setService(response.data);
    } catch (error) {
      console.error("Failed to fetch service details:", error);
    }
  };

  const fetchServiceReviews = async () => {
    try {
      const response = await axios.get(`/reviews/service/${serviceId}`);
      setReviews(response.data);
      setFilteredReviews(response.data);
      calculateAverageRating(response.data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  const calculateAverageRating = (reviews) => {
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = reviews.length ? total / reviews.length : 0;
    setAverageRating(average);
  };

  const handleFilter = (star) => {
    if (star === 0) {
      setFilteredReviews(reviews);
      setActiveFilter(0);
    } else if (star === activeFilter) {
      setFilteredReviews(reviews);
      setActiveFilter(0);
    } else {
      setFilteredReviews(reviews.filter((review) => review.rating === star));
      setActiveFilter(star);
    }
  };

  return (
    <div>
      {role === 'admin' ? (
        <>
          <AdminNavbar />
          <AdminSidebar />
        </>
      ) : (
        <>
          <UserNavbar />
          <UserSidebar />
        </>
      )}
      <Row
        gutter={24}
        className="m-8 mt-24 ml-72 border border-zinc-300 rounded-2xl"
      >
        {service && (
          <>
            <Col span={12}>
              <Image
                className="h-96 w-96 ml-32 py-4"
                src={service.image_url || "fallbackImageUrl.jpg"}
                alt="Service Illustration"
                style={{ width: "100%", height: "auto" }}
              />
            </Col>
            <Col span={12}>
              <Space direction="vertical" size="middle">
                <Title level={3}>{service.service_name}</Title>
                <Rate disabled value={averageRating} />
                <Text>Duration: {service.duration} minutes</Text>
                <Text>Price per unit: ${service.price_per_unit}</Text>
                <Text>Unit type: {service.unit_type}</Text>
                <Text>Description: {service.description}</Text>
                <Tag color={service.is_available ? "green" : "red"}>
                  {service.is_available ? "Available" : "Not Available"}
                </Tag>
              </Space>
            </Col>
          </>
        )}
      </Row>
      <Row justify="center" className="my-8 ml-32">
          <Col span={20}>
            <Title level={4}>Review from users</Title>
          </Col>
        </Row>
      <Row justify="center" className="my-8 ml-32">
        <Col span={20} >
        
          <Rate disabled value={averageRating} style={{ fontSize: "32px" }} />
          <br></br>
          <Text className="text-5xl font-semibold ml-14 text-amber-400">
            {averageRating}/5
          </Text>
         
        </Col>
        <Col>
          <Button
            onClick={() => handleFilter(0)}
            className={activeFilter === 0 ? "bg-blue-500 text-white mr-2" : "mr-2"}
          >
            All
          </Button>
          {[5, 4, 3, 2, 1].map((star) => (
            <Button
              key={star}
              className={activeFilter === star ? "bg-blue-500 text-white mr-2" : "mr-2"}
              onClick={() => handleFilter(star)}
            >
              {star} Stars
            </Button>
          ))}
        </Col>
      </Row>
      <Row justify="center">
        <Col span={16}>
          <List
            itemLayout="horizontal"
            className="border  border-zinc-300 w-4/5 rounded-2xl px-8 h-full transition duration-300 ease-in-out transform shadow-md hover:shadow-xl"
            dataSource={filteredReviews}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src={item.user_avatar || "defaultAvatar.jpg"} />
                  }
                  title={
                    <Text className="text-lg font-bold">{item.user.name}</Text>
                  }
                  description={
                    <>
                      <Rate disabled value={item.rating} />
                      <Text type="secondary" className="block">
                        {moment(item.updated_at).format("DD/MM/YYYY")}
                      </Text>
                      <Text>{item.review}</Text>
                      <Carousel autoplay className="h-48 w-48">
                        {item.images.map((img) => (
                          <div key={img.id}>
                            <Image
                              className="object-cover h-48 w-48"
                              alt="review"
                              src={img.image_path}
                            />
                          </div>
                        ))}
                      </Carousel>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ServiceDetail;
