import { useState } from "react";
import { useLogin } from "@pankod/refine-core";
import {
    Container,
    Box,
    TextField,
    Button,
    Stack,
    Typography,
} from "@pankod/refine-mui";

import { yariga } from "../../assets";

import { CustomButton } from "components";

const Signin = ({
    onFormSwitch,
}: {
    onFormSwitch: (formName: string) => void;
}) => {
    type LoginVariables = {
        email: string;
        password: string;
    };
    const { mutate: login } = useLogin<LoginVariables>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginWithEmail = async () => {
        login({ email, password });
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    return (
        <Box
            component="div"
            sx={{
                backgroundColor: "#FCFCFC",
            }}
        >
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100vh",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div>
                        <img src={yariga} alt="yariga Logo" />
                    </div>
                    <Box mt={4} minWidth="450px">
                        <TextField
                            variant="outlined"
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={handleEmailChange}
                            sx={{
                                "& label.Mui-focused": {
                                    color: "#475be8",
                                },

                                "& .MuiOutlinedInput-root": {
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#475be8",
                                    },
                                },
                            }}
                        />
                        <Box mt={2}>
                            <TextField
                                variant="outlined"
                                label="Password"
                                fullWidth
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                sx={{
                                    "& label.Mui-focused": {
                                        color: "#475be8",
                                    },

                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#475be8",
                                        },
                                    },
                                }}
                            />
                        </Box>
                        <Box mt={2}>
                            <CustomButton
                                type="button"
                                backgroundColor="#475be8"
                                color="#fcfcfc"
                                title="Login"
                                fullWidth={true}
                                handleClick={handleLoginWithEmail}
                            />
                        </Box>
                        <Box mt={2}>
                            <Stack direction={"row"}>
                                <Typography fontSize={16}>
                                    Don't have an account?
                                    <Button
                                        onClick={() => onFormSwitch("signup")}
                                        sx={{ color: "#475be8" }}
                                    >
                                        Sign Up
                                    </Button>
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Signin;
