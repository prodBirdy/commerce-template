'use client';

import Price from '@/components/price';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/lib/shopify/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Form from 'next/form';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams?.get('q') || '');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // ...existing code...

  const handleViewAllResults = () => {
    setShowResults(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  useEffect(() => {
    const delayedSearch = setTimeout(async () => {
      if (query.trim().length > 0) {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
          const data = await response.json();
          setProducts(data.products || []);
          setShowResults(true);
        } catch (error) {
          console.error('Search error:', error);
          setProducts([]);
        }
        setIsLoading(false);
      } else {
        setProducts([]);
        setShowResults(false);
      }
    }, 300); // Debounce search by 300ms

    return () => clearTimeout(delayedSearch);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleInputFocus = () => {
    if (query.trim().length > 0 && products.length > 0) {
      setShowResults(true);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full lg:w-80 xl:w-full">
      <Form action="/search" className="w-max-[550px] relative w-full">
        <input
          key={searchParams?.get('q')}
          type="text"
          name="q"
          placeholder="Search for products..."
          autoComplete="off"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="text-md w-full rounded-xl border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        />
        <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
          <MagnifyingGlassIcon className="h-4" />
        </div>
      </Form>

      {showResults && (
        <Card className="absolute z-50 w-full mt-1 max-h-96 overflow-hidden">
          <CardContent className="p-0 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">
                Searching...
              </div>
            ) : products.length > 0 ? (
              <div className="p-2">
                {products.map((product) => (
                  <Link
                    key={product.handle}
                    href={`/product/${product.handle}`}
                    className="flex items-center p-2 hover:bg-accent rounded-lg transition-colors"
                    onClick={() => setShowResults(false)}
                  >
                    {product.featuredImage && (
                      <img
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText || product.title}
                        className="w-10 h-10 object-cover rounded-lg mr-3"
                      />
                    )}
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {product.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <Price
                          amount={product.priceRange.maxVariantPrice.amount}
                          currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
                {products.length === 8 && (
                  <div className="p-2 text-center border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleViewAllResults}
                      className="text-sm"
                    >
                      View all results
                    </Button>
                  </div>
                )}
              </div>
            ) : query.trim().length > 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No products found for "{query}"
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <div className="relative w-full lg:w-80 xl:w-full">
      <form className="w-max-[550px] relative w-full">
        <input
          placeholder="Search for products..."
          className="w-full rounded-xl border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        />
        <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
          <MagnifyingGlassIcon className="h-4" />
        </div>
      </form>
    </div>
  );
}
