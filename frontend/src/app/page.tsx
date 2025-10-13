//import { Button } from "@/components/ui/button";
import SignupPage from "./(auth)/signup/page";

import { Card } from "@/components/ui/card";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* <h1>Hello from Odin Boook</h1> */}
      {/* <Card className=""></Card> */}

      {/* <Button>Hey</Button> */}
      {children}
      {/* <SignupPage /> */}
    </div>
  );
}
