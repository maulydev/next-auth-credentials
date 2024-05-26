import { auth } from "@/auth";
import Client from "@/components/Client";
import { redirect } from "next/navigation";

const Agent = async () => {
  const session: any = await auth();
//   if (!session?.user) return redirect("/login");

  if (session?.user?.role !== "agent")
    return (
      <div className="text-red-500 h-screen w-full flex justify-center items-center">
        You are not authorized to access &nbsp; <b className="text-3xl"> AGENT </b> &nbsp; page!
      </div>
    );
  return (
    <div className="h-screen w-full flex flex-col gap-16 items-center justify-center">
      <h1 className="font-bold text-3xl">AGENT PAGE</h1>
      <Client session={session} />
    </div>
  );
};

export default Agent;
