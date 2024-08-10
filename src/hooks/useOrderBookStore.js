// src/store/orderBookStore.js
import { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'order-book-data';

export function useOrderBookStore() {
  const [bids, setBids] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))?.bids || []);
  const [asks, setAsks] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))?.asks || []);

  useEffect(() => {
    const data = { bids, asks };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [bids, asks]);

  return { bids, asks, setBids, setAsks };
}
