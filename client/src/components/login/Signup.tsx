import { useState } from "react";
import { useRegister, useLogin } from "@pankod/refine-core";
import {
    Container,
    Box,
    TextField,
    Button,
    Stack,
    Typography,
} from "@pankod/refine-mui";

import { estately } from "../../assets";
import { CustomButton } from "components";

const Signin = ({
    onFormSwitch,
}: {
    onFormSwitch: (formName: string) => void;
}) => {
    type RegisterVariables = {
        firstname: string;
        lastname: string;
        phone: string;
        location: string;
        email: string;
        password: string;
    };

    type LoginVariables = {
        email: string;
        password: string;
    };
    const { mutate: register } = useRegister<RegisterVariables>();
    const { mutate: login } = useLogin<LoginVariables>();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [password, setPassword] = useState("");

    const handleSignupSubmit = async () => {
        const signUpInfo = {
            firstname,
            lastname,
            phone,
            location,
            email,
            password,
        };
        register(signUpInfo, {
            onSuccess: () => {
                login({ email, password });
            },
        });
    };

    const handleFirstnameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFirstname(event.target.value);
    };
    const handleLastnameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLastname(event.target.value);
    };
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    };
    const handleLocationChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLocation(event.target.value);
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
                        <img src={estately} alt="yariga Logo" />
                    </div>
                    <Box mt={4} minWidth="450px">
                        <Stack
                            direction="row"
                            display={"flex"}
                            justifyContent="space-between"
                        >
                            <Box mt={2} minWidth={"220px"}>
                                <TextField
                                    variant="outlined"
                                    label="Firstname"
                                    fullWidth
                                    required
                                    value={firstname}
                                    onChange={handleFirstnameChange}
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
                            <Box mt={2} minWidth={"220px"}>
                                <TextField
                                    variant="outlined"
                                    label="Lastname"
                                    fullWidth
                                    required
                                    value={lastname}
                                    onChange={handleLastnameChange}
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
                        </Stack>
                        <Stack
                            direction="row"
                            display={"flex"}
                            justifyContent="space-between"
                        >
                            <Box mt={2} minWidth={"220px"}>
                                <TextField
                                    variant="outlined"
                                    label="Phone"
                                    fullWidth
                                    required
                                    type={"number"}
                                    value={phone}
                                    onChange={handlePhoneChange}
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
                            <Box mt={2} minWidth={"220px"}>
                                <TextField
                                    variant="outlined"
                                    label="Location"
                                    fullWidth
                                    required
                                    value={location}
                                    onChange={handleLocationChange}
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
                        </Stack>
                        <Box mt={2}>
                            <TextField
                                variant="outlined"
                                label="Email"
                                fullWidth
                                required
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
                        </Box>
                        <Box mt={2}>
                            <TextField
                                variant="outlined"
                                label="Password"
                                fullWidth
                                required
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
                                type="submit"
                                backgroundColor="#475be8"
                                color="#fcfcfc"
                                title="Sign Up"
                                fullWidth={true}
                                handleClick={handleSignupSubmit}
                            />
                        </Box>
                        <Box mt={2}>
                            <Stack direction={"row"}>
                                <Typography fontSize={16}>
                                    Already have an account?
                                    <Button
                                        onClick={() => onFormSwitch("signin")}
                                        sx={{ color: "#475be8" }}
                                    >
                                        Log in
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
