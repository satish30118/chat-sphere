"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const data = localStorage.getItem("userInfo");
    if (data) {
      const parsedData = JSON.parse(data);
      if(data?.token){
        router.push("/chats")
      }else{
        router.push("/auth")
      }
    }
  }, [router]);
  return (
    <h1>Redirecting....</h1>
  )
}
