// Components
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

// Libs
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AppNavigation() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav>
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handleLogout}
          className="ml-auto cursor-pointer"
        >
          <LogOut width={24} height={24} /> Logout
        </Button>
      </div>
    </nav>
  );
}
