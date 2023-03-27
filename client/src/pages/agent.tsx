import { useList } from "@pankod/refine-core";
import { Box, Typography } from "@pankod/refine-mui";
import { AgentCard } from "components";

const Agents = () => {
    const { data, isLoading, isError } = useList({
        resource: "users",
    });
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    const allAgents = data?.data ?? [];

    console.log(allAgents[0].allProperties);
    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color={"#11142d"}>
                Agents
            </Typography>
            <Box
                mt={"20px"}
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    backgroundColor: "#fcfcfc",
                    borderRadius: "20px"
                }}
            >
                {allAgents.map((agent) => (
                    <AgentCard 
                    key={agent._id}
                    id={agent._id}
                    firstname={agent.firstname}
                    lastname={agent.lastname}
                    email={agent.email}
                    phone={agent.phone}
                    location={agent.location}
                    avatar={agent.avater}
                    properties={agent.allProperties}
                    />
                ))}
                
            </Box>
        </Box>
    );
};

export default Agents;
