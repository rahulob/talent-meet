import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import toast from "react-hot-toast";

export default function HomePage() {
  return (
    <div>
      <h1 className="btn" onClick={() => toast.success("Toast cuz")}>
        Welcome to Talent Meet
      </h1>
      <SignedOut>
        <SignInButton>
          <button className="btn btn-primary">Log In</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
