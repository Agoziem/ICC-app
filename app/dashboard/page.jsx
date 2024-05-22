"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user ? (
        <div>
          <h1>Welcome {session.user.first_name}</h1>
          <p>Your email is {session.user.email}</p>
          <p>Your avatar is {session.user.avatar}</p>
          <p>is staff {session.user.is_staff?"true":"false"}</p>
          <p>Your date joined is {session.user.date_joined}</p>
        </div>
      ) : (
        <p>Not signed in</p>
      )}

      <button className="btn btn-primary" onClick={signOut}>
        Sign out
      </button>
      <Link
       href={'/'} className={'btn btn-secondary'}>
        Home
      </Link>
    </div>
  );
};

export default Dashboard;
