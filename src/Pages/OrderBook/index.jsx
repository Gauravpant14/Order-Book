// src/components/OrderBook.js
import React, { useEffect, useState, useCallback } from 'react';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useOrderBookStore } from '../../hooks/useOrderBookStore';
import OrderBookTable from '../../Components/OrderBookTable';
import websocketService from '../../services/websocket';

const OrderBook = () => {
  const { bids, asks, setBids, setAsks } = useOrderBookStore();
  const [precision, setPrecision] = useState(2);
  const [zoom, setZoom] = useState(1);

  const handleDataUpdate = useCallback((data) => {
    const [price, count, amount] = data;
    if (count > 0) {
      if (amount > 0) {
        setBids(prevBids => [...prevBids, { price, amount }].slice(-20));
      } else {
        setAsks(prevAsks => [...prevAsks, { price, amount: Math.abs(amount) }].slice(-20));
      }
    }
  }, [setBids, setAsks]);

  useEffect(() => {
    websocketService.connect();
    websocketService.subscribe(handleDataUpdate);
    return () => websocketService.close();
  }, [handleDataUpdate]);

  const increasePrecision = () => setPrecision(prev => Math.min(prev + 1, 5));
  const decreasePrecision = () => setPrecision(prev => Math.max(prev - 1, 0));
  const zoomIn = () => setZoom(prev => prev * 1.1);
  const zoomOut = () => setZoom(prev => prev / 1.1);

  return (
    <div className="order-book">
      <div className="controls">
        <FaPlus onClick={increasePrecision} />
        <FaMinus onClick={decreasePrecision} />
        <FiZoomIn onClick={zoomIn} />
        <FiZoomOut onClick={zoomOut} />
      </div>
      <OrderBookTable bids={bids} asks={asks} precision={precision} zoom={zoom} />
    </div>
  );
};

export default OrderBook;
