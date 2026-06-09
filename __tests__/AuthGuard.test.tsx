import { render, screen } from "@testing-library/react";
import { AuthGuard } from "@/components/AuthGuard";
import { useAuthStore } from "@/lib/store";

// Mock the Next.js router
const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
}));

// Mock the Zustand store
jest.mock("@/lib/store", () => ({
  useAuthStore: jest.fn(),
}));

describe("AuthGuard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to /login if the user is not authenticated", () => {
    // Force the store to return isAuthenticated: false
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
    });

    render(
      <AuthGuard>
        <div data-testid="protected-content">Secret Dashboard</div>
      </AuthGuard>,
    );

    // Verify the protected content is NOT rendered
    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();

    // Verify the router tried to kick the user to /login
    expect(mockReplace).toHaveBeenCalledWith("/login");
  });

  it("renders children if the user IS authenticated", () => {
    // Force the store to return isAuthenticated: true
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: true,
    });

    render(
      <AuthGuard>
        <div data-testid="protected-content">Secret Dashboard</div>
      </AuthGuard>,
    );

    // Verify the protected content IS rendered safely
    expect(screen.getByTestId("protected-content")).toBeInTheDocument();

    // Verify the router did NOT redirect
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
