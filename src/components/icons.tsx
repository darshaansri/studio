import type { SVGProps } from "react";

export function StrandPlanIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 3c0 2.5-2 4.5-5 5" />
      <path d="M10.2 4.2c.4 1.4 1.2 2.8 2.8 4.3" />
      <path d="M13 8.5c.3.5.6 1 .9 1.5" />
      <path d="M16 13c1 2 2 4.5 2 7" />
      <path d="M10 21c-1-2-2-4-2-6" />
      <path d="M12 15c.5-1.5 1-3 1-4.5" />
      <path d="M6 16c-1 2-1 4.5-1 6" />
    </svg>
  );
}
