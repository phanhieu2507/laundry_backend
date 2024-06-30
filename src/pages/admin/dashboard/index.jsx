import React, { useState, useEffect } from "react";
import axios from "../../../component/api/axios";
import { Card, List, Rate } from "antd";
import {
  TeamOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  CalendarOutlined,
  MoneyCollectOutlined,
  DollarCircleOutlined,
  TagOutlined,
} from "@ant-design/icons";
import AdminNavbar from "../../../component/navbar/admin-nav";
import AdminSidebar from "../../../component/sidebar/admin-side";
import StoreStats from "../../../component/storestat";

function Dashboard() {

    const [topPromoCodes, setTopPromoCodes] = useState([]);

  const [stats, setStats] = useState({
    totalServices: 0,
    totalCustomers: 0,
    totalOrdersThisMonth: 0,
    totalEarningsThisMonth: 0,
  });

  const [promoStats, setPromoStats] = useState({
    totalPromoCodesIssued: 0,
    totalRevenueFromPromoCodes: 0,
    totalDiscountFromPromoCodes: 0,
  });

  const [topUsers, setTopUsers] = useState([]);

  const [topServices, setTopServices] = useState([]);

  useEffect(() => {
    axios
      .get("/dashboard/stats")
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the stats data!", error);
      });

    axios
      .get("/dashboard/top-users")
      .then((response) => {
        setTopUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the top users data!", error);
      });
    axios
      .get("/dashboard/top-services")
      .then((response) => {
        setTopServices(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the top services data!",
          error
        );
      });
    axios
      .get("/dashboard/statistics/general")
      .then((response) => {
        setPromoStats(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the promo code statistics!",
          error
        );
      });
      axios.get("/dashboard/statistics/detailed")
    .then(response => {
      setTopPromoCodes(response.data.promo_code_details);
    })
    .catch(error => {
      console.error("There was an error fetching the top promo codes data!", error);
    });
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-grow p-5 mt-16 ml-64">
          <h1 className="text-xl font-bold mb-4">Dashboard</h1>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {createCard(
              ShoppingCartOutlined,
              stats.totalServices,
              "Total Services",
              "#1890ff"
            )}
            {createCard(
              TeamOutlined,
              stats.totalCustomers,
              "Total Customers",
              "#52c41a"
            )}
            {createCard(
              CalendarOutlined,
              stats.totalOrdersThisMonth,
              "Total Orders This Month",
              "#fadb14"
            )}
            {createCard(
              DollarOutlined,
              stats.totalEarningsThisMonth,
              "Total Earnings This Month",
              "#fa8c16"
            )}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <StoreStats />
            </div>
            <div className="col-span-1 shadow-md border border-zinc-300 rounded-2xl p-6 mt-5 pb-2">
              <h2 className="text-lg font-bold mb-2">Top Users by Orders</h2>
              <div className="max-h-96 overflow-auto">
                <List
                  itemLayout="horizontal"
                  dataSource={topUsers}
                  renderItem={(user) => (
                    <List.Item className="border-b">
                      <List.Item.Meta
                        title={`${user.name} - ${user.phone}`}
                        description={`Orders: ${
                          user.orders_count
                        }              Total: ${
                          user.orders[0]?.total_spent || "0.00"
                        }$`}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="shadow-md border border-zinc-300 rounded-2xl p-6 mt-4">
            <h2 className="text-lg font-bold mb-2">Top Services</h2>
            <div className="max-h-96 overflow-auto">
              <List
                itemLayout="horizontal"
                dataSource={topServices}
                renderItem={(service) => (
                  <List.Item className="border-b">
                    <List.Item.Meta
                      title={service.service_name}
                      description={`Total Orders: ${service.total_orders}`}
                    />
                    <div>
                      <Rate disabled defaultValue={service.average_rating} />
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </div>
          <h1 className="text-xl font-bold my-4">Promo Codes</h1>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {createCard(
              TagOutlined,
              promoStats.totalPromoCodesIssued,
              "Total Promo Codes Issued",
              "#1890ff"
            )}
            {createCard(
              DollarCircleOutlined,
              promoStats.totalRevenueFromPromoCodes,
              "Total Revenue from Promo Codes",
              "#52c41a"
            )}
            {createCard(
              MoneyCollectOutlined,
              promoStats.totalDiscountFromPromoCodes,
              "Total Discount from Promo Codes",
              "#fa8c16"
            )}
          </div>
          <div className="shadow-md border border-zinc-300 rounded-2xl p-6 mt-4">
  <h2 className="text-lg font-bold mb-2">Top Promo Codes</h2>
  <div className="max-h-96 overflow-auto">
    <List
      itemLayout="horizontal"
      dataSource={topPromoCodes}
      renderItem={(promo) => (
        <List.Item className="border-b">
          <List.Item.Meta
            title={promo.code}
            description={`Usage rate: ${promo.times_used} / ${promo.usage_limit}, Revenue: $${promo.total_revenue ? promo.total_revenue : 0}, Discount Given: $${promo.total_discount ? promo.total_discount : 0}`}
          />
        </List.Item>
      )}
    />
  </div>
</div>

        </div>
      </div>
    </>
  );
}

function createCard(Icon, data, label, iconColor) {
  return (
    <Card className="hover:shadow-lg rounded-lg text-center m-2">
      <Icon style={{ fontSize: "24px", color: iconColor }} />
      <h2 className="text-2xl">{data}</h2>
      <p>{label}</p>
    </Card>
  );
}

export default Dashboard;
