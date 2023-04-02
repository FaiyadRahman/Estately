import { useList, useOne, useGetIdentity } from "@pankod/refine-core";
import { Box, Typography, Stack } from "@pankod/refine-mui";

import {
    PieChart,
    PropertyCard,
    PropertyReferrals,
    TotalRevenue,
} from "components";

const Home = () => {
    const {
        data: propertyData,
        isLoading: propertyLoading,
        isError: propertyError,
    } = useList({
        resource: "properties",
        config: {
            pagination: {
                pageSize: 4,
            },
        },
    });
    const latestProperties = propertyData?.data ?? [];

    const { data: user } = useGetIdentity();
    
    const {
        data: userData,
        isLoading: userLoading,
        isError: userError,
    } = useOne({
        resource: "users",
        id: user?.userid,
    });
    const MyProfile = userData?.data ?? [];

    if (propertyLoading || userLoading)
        return <Typography>Loading...</Typography>;
    if (propertyError || userError) return <Typography>Error...</Typography>;

    const months = MyProfile.sixMonthData.months;
    const monthlyRents = MyProfile.sixMonthData.monthlyRents;
    const totalRent = MyProfile.totalRent;
    const countProperties = MyProfile.countProperties;
    const countUsers = MyProfile.countUsers;
    const userPropertyCount = MyProfile.userPropertyCount;

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Dashbaord
            </Typography>

            <Box mt="20px" display="flex" flexWrap={"wrap"} gap={4}>
                <PieChart
                    title="Properties for Rent"
                    value={countProperties}
                    series={[75, 25]}
                    labels={["All Properties %", "Your Properties %"]}
                    colors={["#475be8", "#e4e8ef"]}
                />
                <PieChart
                    title="Agents"
                    value={countUsers}
                    series={[55, 45]}
                    labels={[]}
                    colors={["#475be8", "#e4e8ef"]}
                />
                <PieChart
                    title="Tenants"
                    value={countProperties * 4}
                    series={[75, 25]}
                    labels={[]}
                    colors={["#475be8", "#e4e8ef"]}
                />
                <PieChart
                    title="Cities"
                    value={5}
                    labels={[]}
                    series={[60, 40]}
                    colors={["#475be8", "#e4e8ef"]}
                />
            </Box>

            <Stack
                mt="25px"
                width="100%"
                direction={{ xs: "column", lg: "row" }}
                gap={4}
            >
                <TotalRevenue
                    months={months}
                    monthlyRents={monthlyRents}
                    totalRent={totalRent}
                />
                <PropertyReferrals />
            </Stack>
            <Box
                flex={1}
                borderRadius="15px"
                padding="20px"
                bgcolor={"#fcfcfc"}
                display="flex"
                flexDirection={"column"}
                minWidth="100%"
                mt="25px"
            >
                <Typography fontSize={18} fontWeight={600} color={"#11142d"}>
                    Latest Properties
                </Typography>
                <Box
                    mt={2.5}
                    sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}
                >
                    {latestProperties.map((property) => (
                        <PropertyCard
                            key={property._id}
                            id={property._id}
                            title={property.title}
                            location={property.location}
                            price={property.price}
                            photo={property.photo}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
