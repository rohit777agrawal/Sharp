
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";


const LandingPage = () => {
    return (
      <div>
        <UserButton afterSignOutUrl="/"/>
        <Link href="/sign-in">
          <Button>
            Login
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button>
            Register
          </Button>
        </Link>
      
      </div>
      
    )
  }
  
  export default LandingPage;
  