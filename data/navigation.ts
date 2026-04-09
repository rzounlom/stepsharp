export type NavItem = {
  label: string;
  href: string;
};

export const appNavigation: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tutor", href: "/tutor" },
  { label: "Test Setup", href: "/test/setup" },
  { label: "Upgrade", href: "/dashboard/upgrade" },
];
