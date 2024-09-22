import AuthForm from "@/components/organisms/AuthForm";
import React from "react";

const page = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center" style={{backgroundColor:"#f2f9f8"}}>
      <AuthForm />
    </div>
  );
};

export default page;
