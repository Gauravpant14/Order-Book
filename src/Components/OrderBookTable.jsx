import React from 'react';

const OrderBookTable = ({ bids, asks, precision, zoom }) => {
  const formatPrice = (price) => price.toFixed(precision);

  return (
    <div className="order-book-table" style={{ transform: `scale(${zoom})` }}>
      <div className="bids">
        {bids.map((bid, index) => (
          <div className="row" key={index}>
            <div className="price">{formatPrice(bid.price)}</div>
            <div className="amount">
              <div className="bar" style={{ width: `${bid.amount}%`, backgroundColor: 'green' }}></div>
            </div>
          </div>
        ))}
      </div>
      <div className="asks">
        {asks.map((ask, index) => (
          <div className="row" key={index}>
            <div className="price">{formatPrice(ask.price)}</div>
            <div className="amount">
              <div className="bar" style={{ width: `${ask.amount}%`, backgroundColor: 'red' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(OrderBookTable);
