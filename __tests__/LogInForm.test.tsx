import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LogInForm from "../components/auth/LogInForm";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

// 👇 Mock Next.js router for Jest
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

describe("LogInForm", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("shows validation errors for empty fields", async () => {
    render(<LogInForm />);
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      // expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  it("shows error if password is less than 6 characters", async () => {
    render(<LogInForm />);

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/password should be at least 6 characters/i)
      ).toBeInTheDocument();
    });
  });

  it("redirects on valid form submission", async () => {
    render(<LogInForm />);

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });
});
