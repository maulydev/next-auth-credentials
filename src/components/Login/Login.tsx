"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

const Login = () => {
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const response: any = signIn("credentials", {
        redirect: true,
        callbackUrl: "/",
        username: formData.get("username"),
        password: formData.get("password"),
      });

      if (response.error) {
        throw new Error(response.error);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <div className="h-screen w-full flex justify-center items-center bg-violet-500 relative">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-8 flex flex-col gap-3 rounded-lg"
      >
        {error && (
          <p className="bg-red-100 text-red-800 p-2 text-center">
            {error || "⚠ Something went wrong!"}
          </p>
        )}
        <label className="text-center text-base pb-2 text-violet-800">
          • &nbsp; Login Into Your Account &nbsp; •
        </label>
        <input
          defaultValue="testuser"
          required
          aria-required
          name="username"
          type="text"
          placeholder="Enter your username"
          className="bg-gray-100 px-4 py-2 rounded outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        />
        <input
          defaultValue="1234"
          required
          aria-required
          name="password"
          type="password"
          placeholder="Enter your password"
          className="bg-gray-100 px-4 py-2 rounded outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        />
        <button className="bg-violet-500 hover:bg-violet-600 text-white rounded p-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
