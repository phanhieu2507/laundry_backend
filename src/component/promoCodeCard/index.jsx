import React from 'react';
import { Tooltip, Tag } from 'antd';
import moment from 'moment';

const PromoCodeCard = ({ promoCode }) => {
  const { code, description, discount_type, discount_value, valid_from, valid_until, is_used } = promoCode;

  const now = moment();
  const validFromDate = moment(valid_from);
  const validUntilDate = moment(valid_until);

  const getStatusTag = () => {
    if (is_used) {
      return <Tag color="red">Used Up</Tag>;
    } else if (validUntilDate.isBefore(now)) {
      return <Tag color="volcano">Expired</Tag>;
    } else if (validFromDate.isAfter(now)) {
      return <Tag color="gold">Not Yet Valid</Tag>;
    } else {
      return <Tag color="green">Active</Tag>;
    }
  };

  const discountDisplay = discount_type === 'percentage' ? `${discount_value}% Off` : `$${discount_value} Off`;

  return (
    <Tooltip title="Click for more details" placement="top">
      <div className="group p-4 m-2 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 cursor-pointer relative">
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 text-white text-2xl font-bold p-4 rounded-t-lg text-center">
          {discountDisplay}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold">{code}</h3>
          <p className="text-gray-600">{description}</p>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-white bg-opacity-95 p-4 rounded-lg">
            <p className="font-semibold">Details:</p>
            <p>Valid Until: {valid_until}</p>
            <p>Status: {is_used ? 'Used' : 'Not Used'}</p>
          </div>
          <div className="absolute top-4 right-4">
            {getStatusTag()}
          </div>
        </div>
      </div>
    </Tooltip>
  );
};

export default PromoCodeCard;
