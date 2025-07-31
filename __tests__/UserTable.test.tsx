// __tests__/UserTable.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import UserTable from "@/components/ui/tables/UserTable";
import "@testing-library/jest-dom";

// to mock nextjs usePathname and useRouter
jest.mock("next/navigation", () => {
  const actualNav = jest.requireActual("next/navigation");
  return {
    ...actualNav,
    useRouter: jest.fn(() => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    })),
    usePathname: jest.fn(() => "/dashboard"),
  };
});

const mockUsers: User[] = Array.from({ length: 15 }).map((_, i) => ({
  user_id: `${i}`,
  fullname: `User ${i}`,
  organization: i % 2 === 0 ? "Org A" : "Org B",
  email: `user${i}@example.com`,
  phone: 1234567890 + i,
  date_joined: `2023-01-${String((i % 28) + 1).padStart(2, "0")}`,
  status: (i % 4) as 0 | 1 | 2 | 3,
  marital_status: 0,
  type_of_residence: "Parent's house",
  employment_status: 1,
  sector_of_employment: "Tech",
  duration_of_employment: "2 years",
  office_email: `office${i}@example.com`,
  pay_range: "$1000-$2000",
  gender: 0,
  bvn: 12345678901 + i,
  number_of_children: 0,
  loan_repayment: "$100",
  level_of_education: "B.Sc",
  socials: {
    twitter: `https://twitter.com/user${i}`,
  },
  guarantors: [
    {
      fullname: `Guarantor ${i}`,
      phone: 19876543210 + i,
      email: `guarantor${i}@example.com`,
      relationship: "Brother",
    },
  ],
  user_tier: 1,
  amount_they_have: "$5000",
  bank_name: "Lendsqr Bank",
  bank_account: 1234567890 + i,
}));

describe("UserTable", () => {
  it("renders table headers and paginates correctly", () => {
    render(<UserTable data={mockUsers} />);

    // ✅ Headers
    expect(screen.getByText(/Organization/i)).toBeInTheDocument();
    expect(screen.getByText(/Username/i)).toBeInTheDocument();

    // ✅ Should only show 9 rows (default rowsPerPage)
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBeGreaterThan(1); // header + rows
    expect(rows.length).toBeLessThanOrEqual(10); // 9 + 1 header
  });

  it("goes to next page on clicking next button", () => {
    render(<UserTable data={mockUsers} />);

    const nextButton = screen.getByRole("button", { name: "Next" });
    fireEvent.click(nextButton);

    // ✅ Page 2 should now render new rows
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBeGreaterThan(1);
  });

  it("disables previous button on first page", () => {
    render(<UserTable data={mockUsers} />);

    const prevButton = screen.getByRole("button", { name: "Previous" });
    expect(prevButton).toBeDisabled();
  });
});
