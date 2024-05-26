import { auth } from "@/auth";
import Client from "@/components/Client";
import { redirect } from "next/navigation";

export default async function Home() {
  const session: any = await auth();

  // if (!session?.user) return redirect("/login");

  if (session?.user?.role !== "customer")
    return (
      <div className="text-red-500 h-screen w-full flex justify-center items-center">
        You are not authorized to access &nbsp;
        <b className="text-3xl"> CUSTOMER </b> &nbsp; page!
      </div>
    );

  return (
    <main className="h-screen w-full flex flex-col gap-16 items-center justify-center">
      <h1 className="font-bold text-3xl">CUSTOMER PAGE</h1>
      <Client session={session} />
    </main>
  );
}
