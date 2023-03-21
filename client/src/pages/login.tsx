import { useEffect, useRef, useState } from "react";
import { useLogin } from "@pankod/refine-core";
import { Container, Box, TextField, Button } from "@pankod/refine-mui";

import { yariga } from "../assets";

import { CredentialResponse } from "../interfaces/google";
import { CustomButton } from "components";

export const Login: React.FC = () => {
    const { mutate: login } = useLogin<CredentialResponse>();

    const GoogleButton = (): JSX.Element => {
        const divRef = useRef<HTMLDivElement>(null);
        if (divRef.current) {
            try {
                window.google.accounts.id.initialize({
                    ux_mode: "popup",
                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                    callback: async (res: CredentialResponse) => {
                        if (res.credential) {
                            login(res);
                        }
                    },
                });
                window.google.accounts.id.renderButton(divRef.current, {
                    theme: "filled_blue",
                    size: "medium",
                    type: "standard",
                });
            } catch (error) {
                console.log(error);
            }
        }
        // }, []); // you can also add your client id as dependency here

        return <div ref={divRef} />;
    };

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
                    <Box mt={4}>
                        <GoogleButton />
                    </Box>
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
                                title="submit"
                                fullWidth={true}
                                handleClick={handleLoginWithEmail}
                            />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
