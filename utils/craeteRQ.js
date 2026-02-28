import QRCode from "qrcode";

export const generateQRCode = async (user) => {
  const qrData = JSON.stringify({
    userId: user._id,
    validFrom: user.startDate,
    validTo: user.endDate,
  });

  const qrImage = await QRCode.toDataURL(qrData);
  return qrImage;
};