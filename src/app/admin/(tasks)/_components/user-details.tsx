"use client";

import React from "react";
import { User } from "@clerk/nextjs/server";

type UserDetailsProps = {
  userId: string;
};
export function UserDetails(props: UserDetailsProps) {
  const { userId } = props;

  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`api/user?userId=${userId}`);
      const data = await response.json();
      setUser(data.user);
    }
    fetchUser();
  }, [userId]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h3 className="font-bold">User details</h3>
      <p>
        {user.firstName} {user.lastName}
      </p>
      <p>{user.phoneNumbers.map((n) => n.phoneNumber).join(", ")}</p>
      <p>{user.emailAddresses.map((n) => n.emailAddress).join(", ")}</p>
      <p>{user.birthday}</p>
      <p>{user.gender}</p>
    </div>
  );
}
