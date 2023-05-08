import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { useLocation } from 'react-router-dom';

export const QRCodeGenerator = () => {
  const location = useLocation();
  const [qrValue, setQrValue] = useState('');

  useEffect(() => {
    setQrValue(window.location.href);
  }, [location]);

  return (
    <div className="absolute mt-8 ml-[-3%] rounded-lg border-2 border-black">
      <QRCode value={qrValue} />
    </div>
  );
};
