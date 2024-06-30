import {
  ThunderboltOutlined,
  SyncOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
  LeftOutlined, 
  RightOutlined 
} from "@ant-design/icons";
import { Carousel, Card, Rate, Typography, Avatar } from "antd";
const { Title, Paragraph, Text } = Typography;

const reviews = [
  {
    name: "Nguyen Van A",
    rating: 5,
    comment: "Excellent service, clothes are clean and smell good, professional service attitude."
  },
  {
    name: "Tran Thi B",
    rating: 4,
    comment: "Very clean but a bit slow due to waiting time."
  },
  {
    name: "Pham Van C",
    rating: 5,
    comment: "Reasonable prices, excellent service quality, definitely worth trying."
  },
  {
    name: "Le Thi D",
    rating: 5,
    comment: "I am very satisfied with the laundry results here, will come back."
  },
  {
    name: "Hoang Gia E",
    rating: 3,
    comment: "Service is okay but the location is a bit hard to find."
  },
  {
    name: "Ngo Thi F",
    rating: 4,
    comment: "Friendly staff, clothes are cleaned well."
  },
  {
    name: "Dang Van G",
    rating: 5,
    comment: "Quick washing time, good service, will recommend to friends."
  },
  {
    name: "Mai Thi H",
    rating: 4,
    comment: "Good quality but the price is a bit high compared to the general level."
  },
  {
    name: "Luu Van I",
    rating: 5,
    comment: "Very reliable, clothes are always clean and neat after washing."
  },
  {
    name: "Bui Thi K",
    rating: 5,
    comment: "Extremely satisfied, attentive and professional service."
  }
];

const groupedReviews = reviews.reduce((result, value, index, array) => {
  if (index % 3 === 0) result.push(array.slice(index, index + 3));
  return result;
}, []);

const HomePage = () => {
  return (
    <>
      <div className="hero_area">
        <header className="header_section">
          <div className="header_top">
            <div className="container-fluid">
              <div className="contact_nav">
                <a href="">
                  <i className="fa fa-phone" aria-hidden="true" />
                  <span>Call: 086592822</span>
                </a>
                <a href="">
                  <i className="fa fa-envelope" aria-hidden="true" />
                  <span>Email: phanhieu2572002@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
          <div className="header_bottom">
            <div className="container-fluid">
              <nav className="navbar navbar-expand-lg custom_nav-container ">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className=""> </span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ">
                    <li className="nav-item active">
                      <a className="nav-link" href="index.html">
                        Home <span className="sr-only">(current)</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="about.html">About</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="service.html">Services</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="contact.html">Contact Us</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>

        <section className="slider_section ">
          <div className="container ">
            <div className="row">
              <div className="col-md-6 ">
                <div className="detail-box">
                  <h1 className="text-4xl font-semibold text-gray-800 leading-tight">
                    Professional Dry Cleaning <br />
                    and Laundry Services
                  </h1>
                  <p className="mt-4 text-lg text-gray-600">
                    We offer professional laundry and dry cleaning services, ensuring your clothes are always clean and pristine. With advanced technology and safe cleaning materials, we guarantee complete satisfaction for our customers.
                  </p>
                  <a href="">Contact Us</a>
                </div>
              </div>
              <div className="col-md-6">
                <div className="img-box">
                  <img
                    src="images/Premium_Photo___Young_handsome_man_doing_laundry_isolated_cheerful_and_confident_showing_ok_gesture_-removebg-preview.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="feature_section">
        <div className="container mx-auto">
          <div className="feature_container grid grid-cols-3 gap-4">
            <div className="box p-5 border rounded-lg text-center">
              <ThunderboltOutlined className="text-4xl text-blue-500 mb-2" />
              <h5 className="name text-lg font-semibold">Premium Dry Cleaning</h5>
              <p className="text-sm">
                Professional, quick, and effective with the most advanced dry cleaning technology.
              </p>
            </div>
            <div className="box p-5 border rounded-lg text-center">
              <SyncOutlined className="text-4xl text-green-500 mb-2" />
              <h5 className="name text-lg font-semibold">Laundry</h5>
              <p className="text-sm">
                We provide daily laundry services with guaranteed quality, softening and scenting your clothes.
              </p>
            </div>
            <div className="box p-5 border rounded-lg text-center">
              <SafetyCertificateOutlined className="text-4xl text-red-500 mb-2" />
              <h5 className="name text-lg font-semibold">Clothes Preservation</h5>
              <p className="text-sm">
                Long-term clothing preservation service, keeping your clothes always new and more durable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about_section layout_padding-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-6">
              <div className="detail-box">
                <h1 className="text-4xl font-semibold text-gray-800 leading-tight">
                  About Us
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                  We are proud to be a leading professional laundry service provider with advanced washing technology and safety for all types of fabrics. Each garment washed at our shop is carefully cared for, ensuring not only cleanliness but also the best protection for the fabric. We are committed to providing convenience and absolute satisfaction for our customers with fast and high-quality service.
                </p>
                <a href="">Read More</a>
              </div>
            </div>
            <div className="col-lg-7 col-md-6">
              <div className="img-box">
                <img
                  src="images/Premium Photo _ Young woman doing laundry at laundromat, looks at camera smiling, holding clean towels in hands and standing near washing machines_ washing, cleaning, launder, housewife concept.jfif"
                  alt="Laundry Shop Image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="professional_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="img-box">
                <img
                  src="images/ok-removebg-preview.png"
                  alt="Professional Laundry Service"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="detail-box">
                <h1 className="text-4xl font-semibold text-gray-800 leading-tight">
                  Professional In-Home Laundry Service
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                  Our laundry shop offers professional in-home laundry services. With modern washing processes and experienced staff, we ensure that your clothes will be washed clean, ironed smooth, and smell fresh. With us, you save time and effort while still having clothes like new.
                </p>
                <a href="">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Our Services</h2>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-4 mx-auto">
              <div className="box">
                <div className="img-box">
                  <ThunderboltOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                </div>
                <div className="detail-box">
                  <h5>Premium Dry Cleaning</h5>
                  <p>
                    Professional, quick, and effective with the most advanced dry cleaning technology.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 mx-auto">
              <div className="box">
                <div className="img-box">
                  <SyncOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                </div>
                <div className="detail-box">
                  <h5>Laundry</h5>
                  <p>
                    We provide daily laundry services with guaranteed quality, softening and scenting your clothes.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 mx-auto">
              <div className="box">
                <div className="img-box">
                  <SafetyCertificateOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                </div>
                <div className="detail-box">
                  <h5>Clothes Preservation</h5>
                  <p>
                    Long-term clothing preservation service, keeping your clothes always new and more durable.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-box">
            <a href="">See More</a>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-semibold text-black-800 leading-tight mb-6 text-center">Our Clients</h1>
          <Carousel
            autoplay
            dots={true}
            arrows
            nextArrow={<RightOutlined style={{ fontSize: '48px', background: '#1890ff' }} />}
            prevArrow={<LeftOutlined style={{ fontSize: '48px', color: '#1890ff' }} />}
            slidesToShow={1}
            className="max-w-4xl mx-auto"
          >
            {groupedReviews.map((group, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-4">
                {group.map(review => (
                  <div key={review.name} className="text-center p-4 bg-white shadow-lg rounded-lg">
                    <Avatar size={96} icon={<UserOutlined />} className="mx-auto" />
                    <Rate disabled defaultValue={review.rating} />
                    <Title level={4} className="text-lg font-semibold">{review.name}</Title>
                    <Text>{review.comment}</Text>
                  </div>
                ))}
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="contact_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>Contact Us</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <form action="">
                <div>
                  <input type="text" placeholder="Name" />
                </div>
                <div>
                  <input type="text" placeholder="Phone Number" />
                </div>
                <div>
                  <input type="email" placeholder="Email" />
                </div>
                <div>
                  <input type="text" className="message-box" placeholder="Message" />
                </div>
                <div className="d-flex">
                  <button>Send</button>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <div className="map_container">
                <div className="map">
                  <iframe
                    id="googleMap"
                    className="w-full h-full"
                    frameborder="0"
                    style={{ border: 0 }}
                    src="https://maps.google.com/maps?q=Tangesir%20Dates%20Products&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                    title="Google Maps Embed"
                    allowFullScreen>
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="info_section ">
        <div className="container">
          <h4>Get In Touch</h4>
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="info_items">
                <div className="row">
                  <div className="col-md-4">
                    <a href="">
                      <div className="item ">
                        <div className="img-box ">
                          <i className="fa fa-map-marker" aria-hidden="true" />
                        </div>
                        <p>Lorem Ipsum is simply dummy text</p>
                      </div>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a href="">
                      <div className="item ">
                        <div className="img-box ">
                          <i className="fa fa-phone" aria-hidden="true" />
                        </div>
                        <p>+02 1234567890</p>
                      </div>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a href="">
                      <div className="item ">
                        <div className="img-box">
                          <i className="fa fa-envelope" aria-hidden="true" />
                        </div>
                        <p>demo@gmail.com</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="social-box">
            <h4>Follow Us</h4>
            <div className="box">
              <a href="">
                <i className="fa fa-facebook" aria-hidden="true" />
              </a>
              <a href="">
                <i className="fa fa-twitter" aria-hidden="true" />
              </a>
              <a href="">
                <i className="fa fa-youtube" aria-hidden="true" />
              </a>
              <a href="">
                <i className="fa fa-instagram" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default HomePage;
