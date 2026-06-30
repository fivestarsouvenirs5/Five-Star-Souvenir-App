'use client';

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ProductBreadcrumb({
  isNY,
  category,
  subcategory,
}) {
  const basePath = isNY
    ? "/products/new-york"
    : "/products/new-jersey";

  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>

        {/* Home */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="text-lg hover:underline transition-all">
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {/* Products */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="text-lg hover:underline transition-all">
            <Link href={basePath}>
              Products
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* NY ONLY (important change) */}
        {isNY && (
          <>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild className="text-lg hover:underline transition-all">
                <Link href="/products/new-york">
                  NY
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}

        {/* Category */}
        {category && (
          <>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              {subcategory ? (
                <BreadcrumbLink asChild className="text-lg hover:underline transition-all">
                  <Link href={`${basePath}/${category.category_id}`}>
                    {category.category}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="text-lg font-semibold">
                  {category.category}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {/* Subcategory */}
        {subcategory && (
          <>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage className="text-lg font-semibold">
                {subcategory.subcategory_name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}

      </BreadcrumbList>
    </Breadcrumb>
  );
}