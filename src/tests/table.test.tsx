import { render, screen, waitFor } from "@testing-library/react";
import { fetchData } from "../service/api";
import MyTable from "../components/Table";

jest.mock("../service/api", () => ({
  fetchData: jest.fn(),
}));

describe("MyTable Component", () => {
  const mockedData = [
    { id: 1, name: "", username: "john123", email: "john@gmail.com" },
    { id: 2, name: "Jane", username: "jane123", email: "jane@gmail.com" },
  ];
  const userId = 123;
  beforeEach(() => {
    (fetchData as jest.Mock).mockResolvedValue(mockedData);
  });

  test("should render the table with fetched data", async () => {
    render(<MyTable userId={userId}/>);

    // Wait for the data to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByTestId("user-table")).toBeTruthy();
    });

    // Assert the presence of specific HTML elements
    expect(screen.getByText("List Of Users")).toBeTruthy();

    const dataRows = screen.getAllByTestId("user-row");

    // Assert the correct number of data rows
    expect(dataRows).toHaveLength(mockedData.length);

    // Assert the content of each data row
    mockedData.forEach((item) => {
      const nameText = item.name || "";
      const usernameText = item.username || "";
      const emailText = item.email || "";
    
  expect(screen.getByRole("cell", { name: nameText })).toBeTruthy();
  expect(screen.getByRole("cell", { name: usernameText })).toBeTruthy();
  expect(screen.getByRole("cell", { name: emailText })).toBeTruthy();
    });
  });
  test("should render custom message when data is empty", async () => {
    (fetchData as jest.Mock).mockResolvedValue([]);

    const customEmptyMessage = "Custom empty message";
    render(<MyTable emptyDataMessage={customEmptyMessage} userId={userId}/>);

    // Wait for the data to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText(customEmptyMessage)).toBeTruthy();
    });
  });
  test('should display loading state', () => {
    (fetchData as jest.Mock).mockImplementation(() => new Promise(() => {}));
  
    render(<MyTable userId={userId}/>);
  
    // Assert that the loading state is displayed
    expect(screen.getByText('Loading...')).toBeTruthy();
  });
  test('should handle API error', async () => {
    (fetchData as jest.Mock).mockRejectedValue(new Error('API error'));
    
    render(<MyTable userId={userId}/>);

    // Wait for the error message to be rendered
    await waitFor(() => {
      expect(screen.getByText('Error: API error')).toBeTruthy();
    });

    // Assert that the error message is displayed
    expect(screen.getByText('Error: API error')).toBeTruthy();
  });
  test("should pass the correct parameters to the API request", async () => {
    const userId = 123;
    render(<MyTable userId={userId} />);

    // Wait for the data to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByTestId("user-table")).toBeTruthy();
    });

    expect(fetchData).toHaveBeenCalledWith(userId);
  });
  
});
