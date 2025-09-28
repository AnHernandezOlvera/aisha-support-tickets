import { useMediaQuery } from "@mui/material";
import ReportsTable from "./ReportsTable";
import ReportsTableMobile from "./ReportsTableMobile";

export default function ReportsTableWrapper() {

  const isMobile = useMediaQuery("(max-width:768px)");

  return isMobile ? <ReportsTableMobile /> : <ReportsTable />;
}
