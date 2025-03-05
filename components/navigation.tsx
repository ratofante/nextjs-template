import Link from "next/link";
import { Button } from "@components/ui/button";

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 shadow-md p-2 flex justify-between items-center bg-slate-50">
      <Link href="/">
        <h1 className="text-xl font-bold font-secondary">OneApp</h1>
      </Link>
      <ul className="flex gap-2">
        <li>
          <Button asChild variant="outline">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </li>
        <li>
          <Button asChild variant="outline">
            <Link href="/login">Login</Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
}
