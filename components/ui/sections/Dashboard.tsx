"use client";
import React, { useState, useEffect } from "react";
import DashboardCard from "../cards/DashboardCard";
import users from "@/public/SVGs/assets/dashboard-users.svg";
import { useFetch } from "@/hooks/useFetch";
import UserCards from "../cards/UserCards";

function Dashboard() {
  const [count, setCount] = useState<number>(0);
  const { data, loading, error } = useFetch<User[]>("/api/users");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found</p>;

  const render = data.slice(0, 10);
  return (
    <section>
      <div className="dashboard-card-container">
        <DashboardCard text="USERS" number="2,453" image={users} />
        <DashboardCard text="ACTIVE USERS" number="2,453" image={users} />
        <DashboardCard text="Users with Loans" number="2,453" image={users} />
        <DashboardCard text="Users with Savings" number="2,453" image={users} />
      </div>
      <div className="user-cards">
        {render.map((user) => {
          return (
            <div key={user.user_id}>
              <UserCards
                date_joined={user.date_joined}
                fullname={user.fullname}
                email={user.email.toLocaleLowerCase()}
                organization={user.organization}
                phone={user.phone}
                status={user.status}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Dashboard;
