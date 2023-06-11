import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { QRCodeGenerator } from './QRCodeGenerator';

function QRCodeContainer() {
  const location = useLocation();
  const [qrValue, setQrValue] = useState('');
  console.log(qrValue, window.location.href);
  useEffect(() => {
    setQrValue(window.location.href);
  }, [location]);

  return <QRCodeGenerator qrValue={qrValue} />;
}

export default QRCodeContainer;
