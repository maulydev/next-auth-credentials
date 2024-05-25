import { auth } from "@/auth";
import Client from "@/components/Client";
import { redirect } from "next/navigation";

const Admin = async () => {
  const session: any = await auth();
  if (!session?.user) return redirect("/login");

  if (session?.user?.role !== "admin")
    return (
      <div className="text-red-500 h-screen w-full flex justify-center items-center">
        You are not authorized to access this page!
      </div>
    );
  return (
    <div className="h-screen w-full flex flex-col gap-16 items-center justify-center">
      <h1 className="font-bold text-3xl">ADMIN PAGE</h1>
      <Client session={session} />
    </div>
  );
};

export default Admin;
