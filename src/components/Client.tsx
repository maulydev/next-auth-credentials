"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Client = ({ session }: any) => {
  const { data: clientSession, status } = useSession();
  return (
    <div>
      <section className="flex items-center gap-8">
        <pre className="flex flex-col justify-center w-96">
          <span className="bg-blue-500 px-4 py-2 rounded text-white font-bold">
            CLIENT SESSION
          </span>{" "}
          <div className="h-72">
            {status === "loading"
              ? "loading session!"
              : JSON.stringify(clientSession, null, 4)}
          </div>
        </pre>
        <pre className="flex flex-col justify-center w-96">
          <span className="bg-violet-500 px-4 py-2 rounded text-white font-bold">
            SERVER SESSION
          </span>{" "}
          <div className="h-72">{JSON.stringify(session, null, 4)}</div>
        </pre>
      </section>
      <button
        onClick={async () => signOut({ redirect: true, callbackUrl: "/login" })}
        className="bg-red-500 rounded text-white px-4 py-2 mt-16 w-full"
      >
        Log out
      </button>
    </div>
  );
};

export default Client;
