"use client";
import React, { useState, useEffect, useMemo } from "react";
import DashboardCard from "../cards/DashboardCard";
import users from "@/public/SVGs/assets/dashboard-users.svg";
import activeUsers from "@/public/SVGs/assets/active-users.svg";
import usersWithLoans from "@/public/SVGs/assets/users-with-loans.svg";
import usersWithSavings from "@/public/SVGs/assets/users-with-savings.svg";
import { useFetch } from "@/hooks/useFetch";
import UserCards from "../cards/UserCards";

function Dashboard() {
  const { data, loading, error } = useFetch<User[]>("/api/users");
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      localStorage.setItem("allUsers", JSON.stringify(data));
    }
  }, [data]);

  const { totalUsers, activeCount, loansCount, savingsCount } = useMemo(() => {
    if (!data) {
      return { totalUsers: 0, activeCount: 0, loansCount: 0, savingsCount: 0 };
    }

    const totalUsers = data.length;
    const activeCount = data.filter((u) => u.status === 1).length;
    const loansCount = data.filter((u) => (u as any).loan_repayment > 0).length; // rename if your field is different
    const savingsCount = data.filter(
      (u) => (u as any).amount_they_have > 0
    ).length; // rename if your field is different

    return { totalUsers, activeCount, loansCount, savingsCount };
  }, [data]);

  const fmt = (n: number) => n.toLocaleString();

  if (loading)
    return (
      <section>
        <div className="dashboard-card-container">
          <DashboardCard text="USERS" number="Loading" image={users} />
          <DashboardCard
            text="ACTIVE USERS"
            number="Loading"
            image={activeUsers}
          />
          <DashboardCard
            text="Users with Loans"
            number="Loading"
            image={usersWithLoans}
          />
          <DashboardCard
            text="Users with Savings"
            number="Loading"
            image={usersWithSavings}
          />
        </div>
        <div className="user-cards" />
      </section>
    );

  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found</p>;

  const render = data.slice(0, 10);

  return (
    <section>
      <div className="dashboard-card-container">
        <DashboardCard text="USERS" number={fmt(totalUsers)} image={users} />
        <DashboardCard
          text="ACTIVE USERS"
          number={fmt(activeCount)}
          image={activeUsers}
        />
        <DashboardCard
          text="Users with Loans"
          number={fmt(loansCount)}
          image={usersWithLoans}
        />
        <DashboardCard
          text="Users with Savings"
          number={fmt(savingsCount)}
          image={usersWithSavings}
        />
      </div>

      <div className="user-cards">
        {render.map((user) => (
          <div key={user.user_id}>
            <UserCards
              date_joined={user.date_joined}
              fullname={user.fullname}
              email={user.email.toLocaleLowerCase()}
              organization={user.organization}
              phone={user.phone}
              status={user.status}
              modalIsOpen={openModalId === user.user_id}
              setModalIsOpen={(isOpen: boolean) =>
                setOpenModalId(isOpen ? user.user_id : null)
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
