import { useGetIdentity, useOne } from "@pankod/refine-core";

import { Profile } from "components";

const MyProfile = () => {
    const { data: user } = useGetIdentity();
    const { data, isLoading, isError } = useOne({
        resource: "users",
        id: user?.userid,
    });
    const MyProfile = data?.data ?? [];
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    console.log(MyProfile)
    return <Profile
      type="My"
      name={MyProfile.user.firstname + " " + MyProfile.user.lastname}
      email={MyProfile.user.email}
      phone={MyProfile.user.phone}
      location={MyProfile.user.location}
      avatar={MyProfile.user.avater}
      properties={MyProfile.user.allProperties}
    />;
};

export default MyProfile;
