"use client";
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userInfo"));
    if (data?.token) {
      router.push("/chats");
    } else {
      router.push("/auth");
    }
  }, [router]);
  return (
    <div className="flex align-center justify-center">
      <Spinner size="2xl" w={20} h={20} alignSelf="center" margin="auto" /> 
      <h1>Verifying User, Please wait...</h1>
    </div>
  );
}
