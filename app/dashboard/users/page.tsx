"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard");
  });
  return (
    <div className="route-user">
      <p>Loading</p>
    </div>
  );
}

export default page;
