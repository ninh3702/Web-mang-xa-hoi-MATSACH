import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Được tài trợ
        </Typography>
        <Typography color={medium}>Quảng cáo</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/quangcao2.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>NGUYENDANGANNINH</Typography>
        <Typography color={medium}>nguyendanganninh.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Bài viết này đã có quảng cao
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
