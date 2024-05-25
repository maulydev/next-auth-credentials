import { auth } from "@/auth";
import Client from "@/components/Client";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if(!session?.user) return redirect("/login")
    
  return (
    <main className="h-screen w-full flex flex-col gap-16 items-center justify-center">
      <h1 className="font-bold text-3xl mb-16">USER PAGE</h1>
      <Client session={session} />
    </main>
  );
}
