import Signin from "../components/login/Signin";
import Signup from "../components/login/Signup";
import { useState } from "react";

const Login = () => {
    const [currentForm, setCurrentForm] = useState("signin");

    const toggleForm = (formName: string) => {
        setCurrentForm(formName);
    };
    
    return (
        <div>
            {currentForm === "signin" ? (
                <Signin onFormSwitch={toggleForm} />
            ) : (
                <Signup onFormSwitch={toggleForm} />
            )}
        </div>
    );
};

export default Login;
