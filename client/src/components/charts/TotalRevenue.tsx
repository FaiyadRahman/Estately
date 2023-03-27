import { Box, Typography, Stack } from "@pankod/refine-mui";
import ReactApexChart from "react-apexcharts";
import { useGetIdentity, useOne } from "@pankod/refine-core";

import { ArrowCircleUpRounded } from "@mui/icons-material";
import { TotalRevenueOptions } from "./chart.config";
const TotalRevenue = () => {
    const { data: user } = useGetIdentity();
    const { data, isLoading, isError } = useOne({
        resource: "users",
        id: user?.userid,
    });
    const MyProfile = data?.data ?? [];
    
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    const months = MyProfile.sixMonthData.months;
    const  monthlyRents = MyProfile.sixMonthData.monthlyRents;
    const  totalRent = MyProfile.totalRent;
    return (
        <Box
            p={4}
            flex={1}
            bgcolor="#FCFCFC"
            id="chart"
            display={"flex"}
            flexDirection="column"
            borderRadius={"15px"}
        >
            <Typography fontSize={"18px"} fontWeight={600} color="#11142d">
                Total Revenue
            </Typography>
            <Stack my={"20px"} direction="row" gap={4} flexWrap="wrap">
                <Typography fontSize={28} fontWeight={700} color="#11142d">
                    ${totalRent}
                </Typography>
                <Stack direction={"row"} alignItems="center" gap={1}>
                    <ArrowCircleUpRounded
                        sx={{ fontSize: 25, color: "#475be8" }}
                    />
                    <Stack>
                        <Typography fontSize={15} color="#475be8">
                            0.8%
                        </Typography>
                        <Typography fontSize={12} color="#808191">
                            Than Last Month
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
            <ReactApexChart
                series={[{name: "income",data:monthlyRents}]}
                type="bar"
                height={310}
                options={{...TotalRevenueOptions, xaxis: {categories: months} }}
            />
        </Box>
    );
};

export default TotalRevenue;


// export const TotalRevenueSeries = [
//     {
//         name: "Last Month",
//         data: [183, 124, 115, 85, 143, 143, 96],
//     },
//     {
//         name: "Running Month",
//         data: [95, 84, 72, 44, 108, 108, 47],
//     },
// ];