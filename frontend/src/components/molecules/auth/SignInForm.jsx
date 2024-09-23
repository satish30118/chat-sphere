"use client";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "@/app/context/authContext";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";

const SignInForm = () => {
  const { auth, setAuth } = useAuth();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleClick = () => setShow(!show);
  const router = useRouter();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
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

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "api/v1/user/login",
        {
          email,
          password,
        },
        config
      );
      // console.log(data)
      toast({
        title: "Login Successful",
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
      console.log(error);
      toast({
        title: "Error Occured!",
        description: "Invalid password or email",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <VStack spacing="20px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <InputGroup size="md">
          <Input
            value={email}
            p={5}
            type="email"
            id="email"
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            p={5}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <ViewIcon /> : <ViewOffIcon />}
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
        Sign In
      </Button>
      <div className="font-bold  text-gray-500">OR</div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log("GOOGLE LOGIN ERORR: ", credentialResponse);
        }}
        onError={(err) => {
          console.log("GOOGLE LOGIN ERORR: ", "Login Failed", err);
        }}
      />
      <Button variant="outline" colorScheme="blue" width="100%" display="flex">
        <img
          src="https://yt3.googleusercontent.com/viNp17XpEF-AwWwOZSj_TvgobO1CGmUUgcTtQoAG40YaYctYMoUqaRup0rTxxxfQvWw3MvhXesw=s900-c-k-c0x00ffffff-no-rj"
          alt=""
          className="h-6 w-6"
        />
        <div className="ml-4">Login with Google</div>
      </Button>
    </VStack>
  );
};

export default SignInForm;
