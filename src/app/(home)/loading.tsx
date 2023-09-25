import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full flex justify-center mt-16">
      <Loader2Icon className="h-6 w-6 animate-spin" />
    </div>
  );
}
