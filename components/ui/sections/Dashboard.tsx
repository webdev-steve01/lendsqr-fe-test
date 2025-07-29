"use client";
import React, { useState, useEffect, useMemo } from "react";
import DashboardCard from "../cards/DashboardCard";
import users from "@/public/SVGs/assets/dashboard-users.svg";
import activeUsers from "@/public/SVGs/assets/active-users.svg";
import usersWithLoans from "@/public/SVGs/assets/users-with-loans.svg";
import usersWithSavings from "@/public/SVGs/assets/users-with-savings.svg";
import { useFetch } from "@/hooks/useFetch";
import UserTable from "../tables/UserTable";

function Dashboard() {
  const { data, loading, error } = useFetch<User[]>(
    "http://localhost:3000/api/users"
  );

  useEffect(() => {
    if (data) {
      localStorage.setItem("allUsers", JSON.stringify(data));
      console.log(data);
    }
  }, [data]);

  const { totalUsers, activeCount, loansCount, savingsCount } = useMemo(() => {
    if (!data) {
      return { totalUsers: 0, activeCount: 0, loansCount: 0, savingsCount: 0 };
    }

    const totalUsers = data.length;
    const activeCount = data.filter((u) => u.status === 1).length;
    const loansCount = data.filter((u) => (u as any).loan_repayment > 0).length;
    const savingsCount = data.filter(
      (u) => (u as any).amount_they_have > 0
    ).length;

    return { totalUsers, activeCount, loansCount, savingsCount };
  }, [data]);

  const fmt = (n: number) => n.toLocaleString();

  if (loading)
    return (
      <section>
        <h1 className="page-title">Users</h1>
        <div className="dashboard-card-container">
          <DashboardCard text="USERS" number="Loading..." image={users} />
          <DashboardCard
            text="ACTIVE USERS"
            number="Loading..."
            image={activeUsers}
          />
          <DashboardCard
            text="USERS WITH LOANS"
            number="Loading..."
            image={usersWithLoans}
          />
          <DashboardCard
            text="USERS WITH SAVINGS"
            number="Loading..."
            image={usersWithSavings}
          />
        </div>
        {/* <div className="user-cards" /> */}
      </section>
    );

  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found</p>;

  const render = data.slice(0, 10);

  return (
    <section className="dashboard-section">
      <h1 className="page-title">Users</h1>
      <div className="dashboard-card-container">
        <DashboardCard text="USERS" number={fmt(totalUsers)} image={users} />
        <DashboardCard
          text={loading ? "Loading..." : "ACTIVE USERS"}
          number={fmt(activeCount)}
          image={activeUsers}
        />
        <DashboardCard
          text={loading ? "Loading..." : "USERS WITH LOANS"}
          number={fmt(loansCount)}
          image={usersWithLoans}
        />
        <DashboardCard
          text={loading ? "Loading..." : "USERS WITH SAVINGS"}
          number={fmt(savingsCount)}
          image={usersWithSavings}
        />
      </div>

      {/* <div className="user-cards">
        <UserCards users={data} />
      </div> */}
      <UserTable data={data} />
    </section>
  );
}

export default Dashboard;
