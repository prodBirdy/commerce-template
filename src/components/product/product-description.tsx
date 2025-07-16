import { AddToCart } from '@/components/cart/add-to-cart';
import Price from '@/components/price';
import Prose from '@/components/prose';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col pb-6">
        <h1 className="mb-2 text-5xl font-medium text-foreground">{product.title}</h1>
        <Badge className="mr-auto w-auto rounded-xl bg-primary p-2 text-sm text-primary-foreground">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </Badge>
        <Separator className="mt-6" />
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml ? (
        <Prose
          className={cn(
            "mb-6 text-sm leading-tight text-muted-foreground"
          )}
          html={product.descriptionHtml}
        />
      ) : null}
      <AddToCart product={product} />
    </>
  );
}
