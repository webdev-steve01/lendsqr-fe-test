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
