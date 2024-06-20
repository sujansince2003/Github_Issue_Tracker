"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import Skeleton from "@/app/components/Skeleton";

const AssignSelect = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //react query will cache or use this users data for 60 seconds and then only refetch
    retry: 5, //this is to tell how many time react query need to retry if data is not available
  });
  if (isLoading) return <Skeleton />;
  if (error) return null;
  //   const [users, setUsers] = useState<User[]>();
  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       const { data } = await axios.get("/api/users");
  //       setUsers(data);
  //     };
  //     fetchUsers();
  //   }, []);  old code without react query

  return (
    <>
      <Select.Root>
        <Select.Trigger placeholder="Assign Issue" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
            <Select.Item value={"d"}>fs</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssignSelect;
