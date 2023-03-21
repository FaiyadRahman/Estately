import { useEffect, useRef, useState } from "react";
import { useLogin } from "@pankod/refine-core";
import { Container, Box, TextField, Typography } from "@pankod/refine-mui";
import { Link, Navigate } from "@pankod/refine-react-router-v6";
import { yariga } from "../assets";

import { CredentialResponse } from "../interfaces/google";
import { CustomButton } from "components";
import { Signup } from "./signup";

export const Login: React.FC = () => {
    const { mutate: login } = useLogin<CredentialResponse>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginWithEmail = async () => {
        try {
            const response = await fetch("http://localhost:3500/auth", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                login(data);
            } else {
                throw new Error("Login failed");
            }
        } catch (error) {
            console.error("no worky");
            // handle error here
        }
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
                            <CustomButton
                                type="button"
                                backgroundColor="#475be8"
                                color="#fcfcfc"
                                title="Register"
                                fullWidth={true}
                                handleClick={() => <Navigate to="/signup" />}
                            />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
