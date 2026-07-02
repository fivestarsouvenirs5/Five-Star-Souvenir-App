'use client';

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
            <a href="/">Home</a>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {/* Products */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="text-lg hover:underline transition-all">
            <a href={basePath}>
              Products
            </a>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* NY ONLY (important change) */}
        {isNY && (
          <>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild className="text-lg hover:underline transition-all">
                <a href="/products/new-york">
                  NY
                </a>
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
                  <a href={`${basePath}/${category.category_id}`}>
                    {category.category}
                  </a>
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