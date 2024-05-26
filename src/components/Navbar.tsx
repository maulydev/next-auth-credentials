import { auth } from "@/auth";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="flex gap-4 items-center justify-center fixed inset-x-0 top-0 bg-gray-600 text-white p-3">
      <Link href="/customer">CUSTOMER ACCESS</Link>
      |
      <Link href="/admin">ADMIN ACCESS</Link>
      |
      <Link href="/agent">AGENT ACCESS</Link>
    </div>
  );
};

export default Navbar;
