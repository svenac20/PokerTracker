"use client";

import Link from "next/link";
import { FunctionComponent } from "react";
import { useSidebar } from "../ui/sidebar";

interface SidebarMenuLinkProps {
  href: string;
  text: string;
  icon?: React.ReactNode;
}

const SidebarMenuLink: FunctionComponent<SidebarMenuLinkProps> = ({
  href,
  text,
  icon,
}) => {
  const { setOpenMobile } = useSidebar();

  return (
    <Link
      href={href}
      onClick={() => setOpenMobile(false)}
      className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default SidebarMenuLink;
