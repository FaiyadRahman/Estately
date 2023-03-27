import { useGetIdentity } from "@pankod/refine-core";
import { AppBar, Stack, Toolbar, Typography, Avatar } from "@pankod/refine-mui";

export const Header: React.FC = () => {
    const { data: user } = useGetIdentity();
    const shouldRenderHeader = true;

    return shouldRenderHeader ? (
        <AppBar
            color="default"
            position="sticky"
            elevation={0}
            sx={{ background: "#FCFCFC" }}
        >
            <Toolbar>
                <Stack
                    direction="row"
                    width="100%"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Stack
                        direction="row"
                        gap="16px"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {user?.firstname && user?.lastname ? (
                            <Typography variant="subtitle2">
                                {user?.firstname + " " + user?.lastname}
                            </Typography>
                        ) : null}
                        {user?.avater ? (
                            <Avatar src={user?.avater} alt={user?.firstname} />
                        ) : (
                            <Avatar />
                        )}
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    ) : null;
};
