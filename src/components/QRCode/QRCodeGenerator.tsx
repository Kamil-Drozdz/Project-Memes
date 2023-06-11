import QRCode from 'qrcode.react';

interface QRCodeGeneratorProps {
  qrValue: string;
}

export const QRCodeGenerator = ({ qrValue }: QRCodeGeneratorProps) => {
  console.log(qrValue);
  return (
    <div className="absolute mt-8 ml-[-3%] rounded-lg border-2 border-black">
      <QRCode value={qrValue} />
    </div>
  );
};
