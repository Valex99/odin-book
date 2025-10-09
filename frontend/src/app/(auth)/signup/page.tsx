// This should always be a SERVER COMPONENT (You might need to fetch some data)
// Then call the main component in that folder which is (signup.tsx)

import SignupForm from "./signup";

export default function SignupPage() {
  return <SignupForm />;
}
