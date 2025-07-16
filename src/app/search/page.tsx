import Grid from '@/components/grid';
import ProductGridItems from '@/components/layout/product-grid-items';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { defaultSort, sorting } from '@/lib/constants';
import { getProducts } from '@/lib/shopify';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? 'results' : 'result';

  return (
    <div className="space-y-6">
      {searchValue ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Search Results
              <Badge variant="secondary">
                {products.length} {resultsText}
              </Badge>
            </CardTitle>
            <CardDescription>
              {products.length === 0
                ? 'No products found matching your search'
                : `Showing ${products.length} ${resultsText} for`}{' '}
              <span className="font-semibold text-foreground">&quot;{searchValue}&quot;</span>
            </CardDescription>
          </CardHeader>
          {products.length > 0 && (
            <>
              <Separator />
              <CardContent>
                <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <ProductGridItems products={products} />
                </Grid>
              </CardContent>
            </>
          )}
        </Card>
      ) : (
        products.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                All Products
                <Badge variant="secondary">
                  {products.length} {resultsText}
                </Badge>
              </CardTitle>
              <CardDescription>
                Browse our complete product catalog
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent>
              <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <ProductGridItems products={products} />
              </Grid>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}
