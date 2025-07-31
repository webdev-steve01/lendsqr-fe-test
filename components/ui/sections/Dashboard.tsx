"use client";
import React, { useEffect, useMemo } from "react";
import DashboardCard from "../cards/DashboardCard";
import users from "@/public/SVGs/assets/dashboard-users.svg";
import activeUsers from "@/public/SVGs/assets/active-users.svg";
import usersWithLoans from "@/public/SVGs/assets/users-with-loans.svg";
import usersWithSavings from "@/public/SVGs/assets/users-with-savings.svg";
import { useFetch } from "@/hooks/useFetch";
import UserTable from "../tables/UserTable";

function Dashboard() {
  const { data, loading, error } = useFetch<User[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`
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
    const loansCount = data.filter((u) => Number(u.loan_repayment) > 0).length;
    const savingsCount = data.filter(
      (u) => Number(u.amount_they_have) > 0
    ).length;

    return { totalUsers, activeCount, loansCount, savingsCount };
  }, [data]);

  const fmt = (n: number) => n.toLocaleString();

  if (loading)
    return (
      <section aria-busy="true">
        <header>
          <h1 className="page-title">Users</h1>
        </header>
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
      </section>
    );

  if (error)
    return (
      <section>
        <p>Error: {error.message}</p>
      </section>
    );
  if (!data)
    return (
      <section>
        <p>No data found</p>
      </section>
    );

  return (
    <section className="dashboard-section">
      <header>
        <h1 className="page-title">Users</h1>
      </header>
      <div className="dashboard-card-container">
        <DashboardCard text="USERS" number={fmt(totalUsers)} image={users} />
        <DashboardCard
          text="ACTIVE USERS"
          number={fmt(activeCount)}
          image={activeUsers}
        />
        <DashboardCard
          text="USERS WITH LOANS"
          number={fmt(loansCount)}
          image={usersWithLoans}
        />
        <DashboardCard
          text="USERS WITH SAVINGS"
          number={fmt(savingsCount)}
          image={usersWithSavings}
        />
      </div>

      <UserTable data={data} />
    </section>
  );
}

export default Dashboard;
