import { useOne } from "@pankod/refine-core";
import { useParams } from "@pankod/refine-react-router-v6";

import { Profile } from "components";

const AgentProfile = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useOne({
        resource: "users",
        id: id as string,
    });
    const AgentProfile = data?.data ?? [];
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    console.log("agent profile", AgentProfile)
    return (
        <Profile
            type="Agent"
            name={AgentProfile.user.firstname + " " + AgentProfile.user.lastname}
            email={AgentProfile.user.email}
            phone={AgentProfile.user.phone}
            location={AgentProfile.user.location}
            avatar={AgentProfile.user.avater}
            properties={AgentProfile.user.allProperties}
        />
    );
};

export default AgentProfile;
