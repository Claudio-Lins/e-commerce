import { cn } from "@/lib/utils";

interface FooterProps {}

export function Footer({}: FooterProps) {
  return (
    <footer className={cn("mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8")}>
      <div className="border-t border-zinc-900/10 pt-6 sm:mt-20 lg:mt-24">
        {/* copyrights */}
        <p className="text-center text-sm leading-tight text-gray-700 sm:text-base">
          &copy; 2024 Clins Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
