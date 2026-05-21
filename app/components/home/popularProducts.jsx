"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ImgSrc = ({ product }) => {
  const cat = product.category;

  let src = "";

  if (product.image_id) {
    src = product.image_id;
  } else if (product.subcategory_id === null) {
    if (cat.category_location == 0) {
      src = `/images/CATEGORIES/NJ/${encodeURIComponent(product.product_name)}.jpg`;
    } else {
      src = `/images/CATEGORIES/${encodeURIComponent(cat.category)}/${encodeURIComponent(product.product_name)}.jpg`;
    }
  } else {
    const subcat = product.subcategories;

    src = `/images/CATEGORIES/${encodeURIComponent(cat.category)}/${encodeURIComponent(subcat.subcategory_name)}/${encodeURIComponent(product.product_name)}.jpg`;
  }

  return (
    <Image
      className="w-full h-full object-contain rounded-xl"
      src={src}
      alt={product.product_name}
      width={300}
      height={400}
    />
  );
};

const Display = ({ product }) => {
  let link;

  if (product.category_id === 36) {
    link = "/products/new-jersey";
  } else if (product.subcategory_id !== null) {
    link = `/products/new-york/sub/${product.subcategory_id}`;
  } else {
    link = `/products/new-york/${product.category_id}`;
  }

  return (
    <Link href={link} className="group flex flex-col gap-2">
      <div className="h-40 sm:h-44 md:h-48 lg:h-52 w-full flex items-center justify-center overflow-hidden rounded-2xl bg-white">
        <ImgSrc product={product} />
      </div>

      <div className="text-center space-y-1">
        <p className="text-xs sm:text-sm uppercase tracking-wide text-secondary-dark font-medium">
          {product.category?.category}
        </p>

        <h3 className="text-sm sm:text-base font-semibold text-text-dark group-hover:text-primary transition-colors line-clamp-2">
          {product.product_name}
        </h3>
      </div>
    </Link>
  );
};

export default function PopularProducts() {
  const [featuredProductsList, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch("/api/getFeatured", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch featured products");
        }

        const featuredProducts = await res.json();

        setFeaturedProducts(featuredProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      <Card className="w-full bg-neutral-beige-light border-0 shadow-xl rounded-2xl overflow-hidden">
      <CardHeader className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5 pb-2 flex flex-row items-start justify-between gap-4">
        <div className="flex flex-col">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-text-dark">
            Featured Products
            </CardTitle>

            <CardDescription className="text-sm sm:text-base text-text">
            Our most popular items
            </CardDescription>
        </div>

        <Link
            href="/products/new-york"
            className="text-sm sm:text-base text-primary hover:underline whitespace-nowrap pt-1"
        >
            View All Products
        </Link>

        </CardHeader>

        <CardContent className="px-4 sm:px-6 lg:px-8 pb-5 sm:pb-6">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent className="-ml-3 sm:-ml-4">
              {featuredProductsList.map((featproduct) => (
                <CarouselItem
                  key={featproduct.product_id}
                  className="pl-3 sm:pl-4 basis-full sm:basis-1/2 md:basis-1/3"
                >
                  <Card className="h-full bg-white/90 border border-neutral-200 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
                    <CardContent className="p-3">
                      <Display product={featproduct} />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="flex left-1 sm:left-0 lg:-left-5" />
            <CarouselNext className="flex right-1 sm:right-0 lg:-right-5" />
          </Carousel>
        </CardContent>
      </Card>
    </section>
  );
}