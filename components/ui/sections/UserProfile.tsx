"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Back from "@/public/SVGs/assets/back.svg";
import profile from "@/public/SVGs/profile/user-details-profile-image.svg";
import activeStar from "@/public/SVGs/assets/active-star.svg";
import inactiveStar from "@/public/SVGs/assets/inactive-star.svg";
import detailsActive from "@/public/SVGs/assets/general-details.svg";
import detailsInactive from "@/public/SVGs/assets/details-inactive.svg";
import documentsInactive from "@/public/SVGs/assets/documents-inactive.svg";
import documentsActive from "@/public/SVGs/assets/documents-active.svg";
import banksInactive from "@/public/SVGs/assets/bank-inactive.svg";
import banksActive from "@/public/SVGs/assets/bank-active.svg";
import loansInactive from "@/public/SVGs/assets/loan-inactive.svg";
import loansActive from "@/public/SVGs/assets/loan-active.svg";
import savingsInactive from "@/public/SVGs/assets/savings-inactive.svg";
import savingsActive from "@/public/SVGs/assets/savings-active.svg";
import appsAndSystemsInactive from "@/public/SVGs/assets/system-inactive.svg";
import appsAndSystemsActive from "@/public/SVGs/assets/system-active.svg";

function UserProfile() {
  const [user, setUser] = useState<User>();
  const [currentPage, setCurrentPage] = useState<
    | "details"
    | "documents"
    | "bankDetails"
    | "loans"
    | "savings"
    | "appsAndSystems"
  >("details");
  const params = useParams();

  useEffect(() => {
    const storedUsers = localStorage.getItem("allUsers");

    if (storedUsers) {
      try {
        const parsedUsers: User[] = JSON.parse(storedUsers);
        const userId = params.id as string;
        const matchedUser = parsedUsers.find((u) => u.user_id === userId);
        setUser(matchedUser);
      } catch (error) {
        console.error("Failed to parse users from localStorage", error);
      }
    }
  }, [params.id]);

  return (
    <section className="users-page">
      <nav className="users-page-navigation" aria-label="Breadcrumb">
        <Image src={Back} alt="back" height={10} />
        <span>Back To Users</span>
      </nav>

      <header className="user-details-and-actions">
        <p className="user-details">User Details</p>
        <div className="user-actions">
          <button className="action-button blacklist">BLACKLIST USER</button>
          <button className="action-button activate">ACTIVATE USER</button>
        </div>
      </header>

      <section className="user-profile-container">
        <div className="user-details-and-finance">
          <div className="user-identification">
            <div className="profile-image">
              <Image src={profile} alt="profile" width={30} height={30} />
            </div>
            <div className="user-name-and-id">
              <h1 className="user-name">{user?.fullname}</h1>
              <p className="user-id">{user?.user_id}</p>
            </div>
            <div className="user-tier">
              <p>User&apos;s Tier</p>
              {user?.user_tier === 0 ? (
                <div className="star">
                  <Image src={activeStar} alt="active star" width={15} />
                  <Image src={inactiveStar} alt="inactive star" width={15} />
                  <Image src={inactiveStar} alt="inactive star" width={15} />
                </div>
              ) : user?.user_tier === 1 ? (
                <div className="star">
                  <Image src={activeStar} alt="active star" width={15} />
                  <Image src={activeStar} alt="active star" width={15} />
                  <Image src={inactiveStar} alt="inactive star" width={15} />
                </div>
              ) : user?.user_tier === 2 ? (
                <div className="star">
                  <Image src={activeStar} alt="active star" width={15} />
                  <Image src={activeStar} alt="active star" width={15} />
                  <Image src={activeStar} alt="active star" width={15} />
                </div>
              ) : null}
            </div>
          </div>
          <div className="bank">
            <p className="user-amount">
              ₦{Number(user?.amount_they_have).toLocaleString()}
            </p>
            <p className="user-bank">
              <span>{user?.bank_account}</span>/<span>{user?.bank_name}</span>
            </p>
          </div>
        </div>

        <nav className="user-profile-nav" aria-label="User navigation tabs">
          <div
            onClick={() => setCurrentPage("details")}
            className={currentPage === "details" ? "active" : ""}
          >
            <Image
              className="nav-image"
              src={currentPage === "details" ? detailsActive : detailsInactive}
              alt="details"
              width={40}
            />
            <p className="nav-text">General Details</p>
          </div>
          <div
            onClick={() => setCurrentPage("documents")}
            className={currentPage === "documents" ? "active" : ""}
          >
            <Image
              className="nav-image"
              src={
                currentPage === "documents"
                  ? documentsActive
                  : documentsInactive
              }
              alt="documents"
              width={40}
            />
            <p className="nav-text">Documents</p>
          </div>
          <div
            onClick={() => setCurrentPage("bankDetails")}
            className={currentPage === "bankDetails" ? "active" : ""}
          >
            <Image
              className="nav-image"
              src={currentPage === "bankDetails" ? banksActive : banksInactive}
              alt="bank details"
              width={40}
            />
            <p className="nav-text">Bank Details</p>
          </div>
          <div
            onClick={() => setCurrentPage("loans")}
            className={currentPage === "loans" ? "active" : ""}
          >
            <Image
              className="nav-image"
              src={currentPage === "loans" ? loansActive : loansInactive}
              alt="loans"
              width={40}
            />
            <p className="nav-text">Loans</p>
          </div>
          <div
            onClick={() => setCurrentPage("savings")}
            className={currentPage === "savings" ? "active" : ""}
          >
            <Image
              className="nav-image"
              src={currentPage === "savings" ? savingsActive : savingsInactive}
              alt="savings"
              width={40}
            />
            <p className="nav-text">Savings</p>
          </div>
          <div
            onClick={() => setCurrentPage("appsAndSystems")}
            className={currentPage === "appsAndSystems" ? "active" : ""}
          >
            <Image
              className="nav-image"
              src={
                currentPage === "appsAndSystems"
                  ? appsAndSystemsActive
                  : appsAndSystemsInactive
              }
              alt="apps and systems"
              width={40}
            />
            <p>Apps & Systems</p>
          </div>
        </nav>
      </section>

      <section className="more-info-section">
        <article className="info">
          <h2 className="info-header">Personal Information</h2>
          <div className="main-info-container first-main-container">
            <div className="info-container">
              <p className="info-type">full name</p>
              <p className="info-details">{user?.fullname}</p>
            </div>
            <div className="info-container">
              <p className="info-type">Phone Number</p>
              <p className="info-details">{user?.phone}</p>
            </div>
            <div className="info-container">
              <p className="info-type">Email Address</p>
              <p className="info-details">{user?.email}</p>
            </div>
            <div className="info-container">
              <p className="info-type">BVN</p>
              <p className="info-details">{user?.bvn}</p>
            </div>
            <div className="info-container">
              <p className="info-type">Gender</p>
              <p className="info-details">
                {user?.gender === 0 ? "Male" : "Female"}
              </p>
            </div>
            <div className="info-container">
              <p className="info-type">marital status</p>
              <p className="info-details">
                {user?.marital_status === 0 ? "Single" : "Married"}
              </p>
            </div>
            <div className="info-container">
              <p className="info-type">children</p>
              <p className="info-details">
                {user?.number_of_children === 0
                  ? "None"
                  : user?.number_of_children}
              </p>
            </div>
            <div className="info-container">
              <p className="info-type">type of residence</p>
              <p className="info-details">{user?.type_of_residence}</p>
            </div>
          </div>
        </article>

        <article className="info">
          <h2 className="info-header">Education and Employment</h2>
          <div className="main-info-container">
            <div className="info-container">
              <p className="info-type">level of education</p>
              <p className="info-details">{user?.level_of_education}</p>
            </div>
            <div className="info-container">
              <p className="info-type">Employment status</p>
              <p className="info-details">
                {user?.employment_status === 0 ? "Employed" : "Unemployed"}
              </p>
            </div>
            <div className="info-container">
              <p className="info-type">Sector of employment</p>
              <p className="info-details">{user?.sector_of_employment}</p>
            </div>
            <div className="info-container">
              <p className="info-type">duration of employment</p>
              <p className="info-details">
                {Number(user?.duration_of_employment) > 1
                  ? `${user?.duration_of_employment} years`
                  : `${user?.duration_of_employment} year`}
              </p>
            </div>
            <div className="info-container">
              <p className="info-type">Office email</p>
              <p className="info-details">{user?.office_email}</p>
            </div>
            <div className="info-container">
              <p className="info-type">monthly income</p>
              <p className="info-details">{user?.pay_range}</p>
            </div>
            <div className="info-container">
              <p className="info-type">loan repayment</p>
              <p className="info-details">
                ₦{Number(user?.loan_repayment).toLocaleString()}
              </p>
            </div>
          </div>
        </article>

        <article className="info">
          <h2 className="info-header">Socials</h2>
          <div className="main-info-container">
            {user?.socials?.twitter && (
              <div className="info-container">
                <p className="info-type">Twitter</p>
                <p className="info-details">{user.socials.twitter}</p>
              </div>
            )}
            {user?.socials?.facebook && (
              <div className="info-container">
                <p className="info-type">Facebook</p>
                <p className="info-details">{user.socials.facebook}</p>
              </div>
            )}
            {user?.socials?.instagram && (
              <div className="info-container">
                <p className="info-type">Instagram</p>
                <p className="info-details">{user.socials.instagram}</p>
              </div>
            )}
          </div>
        </article>

        {user?.guarantors && (
          <article className="info">
            <h2 className="info-header">Guarantor</h2>
            <div>
              {user.guarantors.map((guarantor, index) => (
                <div key={index} className="main-info-container">
                  <div className="info-container">
                    <p className="info-type">Full Name</p>
                    <p className="info-details">{guarantor.fullname}</p>
                  </div>
                  <div className="info-container">
                    <p className="info-type">Phone Number</p>
                    <p className="info-details">{guarantor.phone}</p>
                  </div>
                  <div className="info-container">
                    <p className="info-type">Email Address</p>
                    <p className="info-details">{guarantor.email}</p>
                  </div>
                  <div className="info-container">
                    <p className="info-type">Relationship</p>
                    <p className="info-details">{guarantor.relationship}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        )}
      </section>
    </section>
  );
}

export default UserProfile;
