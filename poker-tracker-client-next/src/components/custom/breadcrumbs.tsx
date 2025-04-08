"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export default function Breadcrumbs() {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((segment) => segment);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathNames.map((segment, index) => {
          let href = `/${pathNames.slice(0, index + 1).join('/')}`
          return (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={href}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
