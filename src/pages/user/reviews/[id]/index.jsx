import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Rate,
  Input,
  notification,
  Upload,
  Card,
  List,
  Avatar,
  Typography,
  Space,
  Divider,
  Row,
  Col,
  Progress,
  Carousel,
} from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import axios from "../../../../component/api/axios";
import Image from "../../../../component/image";
import UserNavbar from "../../../../component/navbar/user-nav";
import UserSidebar from "../../../../component/sidebar/user-side";
import moment from "moment";

const { Text, Title } = Typography;

const UserReviews = () => {
  const [pendingReviews, setPendingReviews] = useState([]);
  const [completedReviews, setCompletedReviews] = useState([]);
  const [ratingsCount, setRatingsCount] = useState({});
  const [totalReviews, setTotalReviews] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchReviewStats();
  }, []);

  const fetchReviewStats = async () => {
    const user = JSON.parse(sessionStorage.getItem("userData"));
    try {
      const { data } = await axios.get(`/reviews/${user.user.id}/stats`);
      setPendingReviews(data.pendingReviews);
      setCompletedReviews(data.completedReviews);
      setRatingsCount(data.ratingsCount);
      setTotalReviews(data.totalReviews);
    } catch (error) {
      notification.error({ message: "Error fetching review data" });
    }
  };

  const showReviewModal = (review) => {
    setSelectedReview(review);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("review", review);

    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("images[]", file.originFileObj);
      }
    });

    try {
      const response = await axios.post(
        `/reviews/${selectedReview.review_id}/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        notification.success({ message: "Review submitted successfully!" });
        fetchReviewStats();
        setIsModalVisible(false);
        setRating(0);
        setReview("");
        setFileList([]);
      }
    } catch (error) {
      console.error(
        "Error submitting review:",
        error.response?.data || "Network error"
      );
      notification.error({
        message: "Failed to submit review. Please try again.",
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload Image</div>
    </div>
  );

  return (
    <div>
      <UserNavbar />
      <UserSidebar />
      <div className="ml-64 mt-24">
        <Row gutter={16}>
          <Col span={6}>
            <Progress
              type="circle"
              percent={100}
              format={() => (
                <div style={{ fontSize: "16px", lineHeight: "1.6" }}>
                  Total Reviews
                  <br />
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {totalReviews}
                  </span>
                </div>
              )}
            />
          </Col>
          <Col span={18}>
            <Title level={4}>Review Summary</Title>
            <Text>Rating Distribution:</Text>
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star}>
                <Rate disabled defaultValue={star} />
                <span style={{ marginLeft: 8 }}>{ratingsCount[star] || 0}</span>
              </div>
            ))}
          </Col>
        </Row>
        <Card title="Completed Reviews" className="my-8 w-11/12 border border-zinc-300">
        <List
        
          className="mt-8 p-4 "
          itemLayout="horizontal"
          dataSource={completedReviews}
          renderItem={(item) => (
            <List.Item
              className="  border border-zinc-300 mb-5 w-4/5 rounded-2xl p-8 h-full transition duration-300 ease-in-out transform shadow-md hover:shadow-xl"
              actions={[
                <Button
                  icon={<EditOutlined />}
                  onClick={() => showReviewModal(item)}
                >
                  Edit
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={
                      item.images.length ? item.images[0].image_path : undefined
                    }
                  />
                }
                title={
                  <>
                    <Text className="text-lg font-bold">
                      {item.service.service_name}
                    </Text>{" "}
                    <br />
                    <Rate disabled value={item.rating} />
                    <br />
                    <Text  className="font-light text-sm italic">{moment(item.updated_at).format("DD/MM/YYYY")}</Text>
                  </>
                }
                description={
                  <>
                    <Text className="font-medium text-base">{item.review}</Text>
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
        </Card>
        <Card title="Pending Reviews" className=" my-8 w-11/12 border border-zinc-300">
          {pendingReviews.map((review) => (
            <Card
             className="  border border-zinc-300 mb-5 w-4/5 rounded-2xl p-8 h-full transition duration-300 ease-in-out transform shadow-md hover:shadow-xl"
              key={review.review_id}
              type="inner"
              title={review.service.service_name}
              extra={
                <Button onClick={() => showReviewModal(review)}>Rate</Button>
              }
            >
              {review.review}
            </Card>
          ))}
        </Card>

        <Modal
          title="Submit Review"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Rate onChange={setRating} value={rating} />
          <Input.TextArea
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Add your comment here"
          />
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleChange}
          >
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>
        </Modal>
      </div>
    </div>
  );
};

export default UserReviews;
