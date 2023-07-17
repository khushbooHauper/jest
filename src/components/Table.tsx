import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { fetchData } from "../service/api";
import { User } from "../types/api";
import { MyTableProps } from "../types/table";

const MyTable = ({ emptyDataMessage = "No data available", userId }: MyTableProps) => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDataAsync() {
      try {
        const fetchedData = await fetchData(userId);
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        // Handle error state
        setError("API error");
        setLoading(false);
      }
    }
    fetchDataAsync();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="d-flex justify-content-center flex-column align-items-center p-3 bg-info" style={{ height: "100vh" }}>
      <h4 className="p-3">List Of Users</h4>
      <Table bordered hover variant="dark" data-testid="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} data-testid="user-row">
                <td>{item.id}</td>
                <td>{item.name || ""}</td>
                <td>{item.username || ""}</td>
                <td>{item.email || ""}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>{emptyDataMessage}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default MyTable;
