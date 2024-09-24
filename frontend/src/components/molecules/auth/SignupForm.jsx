"use client";

import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import Icon from "../../atoms/Icon";
import { useAuth } from "@/app/context/authContext";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { googleSignUp } from "@/app/services/user";

const SignupForm = () => {
  const { auth, setAuth } = useAuth();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        {
          name,
          email,
          password,
        },
        config
      );
      // console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      router.push("/chats");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setAuth(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleGoogleSignUp = async (credentialResponse) => {
    try {
      const data = await googleSignUp(credentialResponse);
      toast({
        title: "SignUp Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      router.push("/chats");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setAuth(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error try again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <VStack spacing="20px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          p={5}
          id="first-name"
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          p={5}
          id="email"
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            id="password"
            p={5}
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
      <div className="font-bold  text-gray-500">OR</div>
      <GoogleLogin
      buttonText="SignUp with Google"
        onSuccess={handleGoogleSignUp}
        onError={(err) => {
          console.log("GOOGLE LOGIN ERORR: ", err);
        }}
      />
      {/* <Button variant="outline" colorScheme="blue" width="100%" display="flex">
        <img
          src="https://yt3.googleusercontent.com/viNp17XpEF-AwWwOZSj_TvgobO1CGmUUgcTtQoAG40YaYctYMoUqaRup0rTxxxfQvWw3MvhXesw=s900-c-k-c0x00ffffff-no-rj"
          alt=""
          className="h-6 w-6"
        />
        <div className="ml-4">Login with Google</div>
      </Button> */}
    </VStack>
  );
};

export default SignupForm;
