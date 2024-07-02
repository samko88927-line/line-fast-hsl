import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center">
      <SignIn />
    </div>
  );
}
