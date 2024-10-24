import React, { useState } from "react";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../index";
import { Table, Button, Spinner } from "react-bootstrap";
import UserService from "../services/UserService";
import { Header } from "../components/Header";
import { ErrorMessage } from "../components/ErrorMessage";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["userList"],
      queryFn: async ({ pageParam = { page: 1, limit: 10 } }) => {
        const response = await UserService.getAllUsersPagination({ pageParam });
        return response;
      },
      getNextPageParam: (lastPage) => {
        return lastPage.nextId
          ? { page: lastPage.nextId, limit: 10 }
          : undefined;
      },
    });

  const changeStatusMutation = useMutation({
    mutationFn: UserService.changeStatusUser,
    onSuccess: () => queryClient.invalidateQueries("userList"),
    onError: (e) => setError(e.response.data),
    onSettled: () => setTimeout(() => setError(""), 1000),
  });

  const changeRoleMutation = useMutation({
    mutationFn: UserService.changeRoleUser,
    onSuccess: () => queryClient.invalidateQueries("userList"),
    onError: (e) => setError(e.response.data),
    onSettled: () => setTimeout(() => setError(""), 1000),
  });

  const deleteUserMutation = useMutation({
    mutationFn: UserService.deleteUser,
    onSuccess: () => queryClient.invalidateQueries("userList"),
    onSettled: () => setTimeout(() => setError(""), 1000),
  });

  return (
    <>
      <Header />
      <div className="container">
        <h3>
          {user.role === "admin" ? "Admin" : "User"} {user.username}
        </h3>
        {isLoading || (isFetching && <Spinner />)}
        {(error || isError) && (!isLoading || !isFetching) && (
          <ErrorMessage message={error} />
        )}

        {!isLoading && !isError && data && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>№</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Change status</th>
                <th>Change role</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                !isError &&
                data?.pages.map((page) =>
                  page.users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.status ? "Active" : "Block"}</td>
                      <td>
                        <Button
                          onClick={() =>
                            changeStatusMutation.mutate({
                              userId: user.id,
                              status: user.status,
                            })
                          }
                        >
                          {Number(user.status) ? "Block" : "Unlock"}
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={() =>
                            changeRoleMutation.mutate({
                              userId: user.id,
                              role: user.role,
                            })
                          }
                        >
                          {user.role !== "admin" ? "Admin" : "User"}
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={() => deleteUserMutation.mutate(user.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
            </tbody>
            {hasNextPage && <button onClick={fetchNextPage}>Load More</button>}
          </Table>
        )}
      </div>
    </>
  );
};

export default AdminPage;
