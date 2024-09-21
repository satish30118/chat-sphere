import React from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";

const LoginForm = () => {
  return (
    <>
      <div className="w-4/5 max-w-max shadow-amber-100 p-6 border m-auto">
        <h2 className="text-3xl font-bold text-center pb-4 ">Sign in</h2>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <p className="mt-2 text-center text-gray-500 py-2 pb-3">Forgot your password?</p>
        <Button label="Sign In" />
        <Button label={`${<Icon iconClass="fab fa-google-plus-g"/>} Login with Google`}/>

      </div>
    </>
  );
};

export default LoginForm;
