'use client';

import { addItem } from '@/components/cart/actions';
import { useProduct } from '@/components/product/product-context';
import { Button } from '@/components/ui/button';
import { Product, ProductVariant } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { useActionState } from 'react';
import { useCart } from './cart-context';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  if (!availableForSale) {
    return (
      <Button disabled className="w-full">
        Out Of Stock
      </Button>
    );
  }

  if (!selectedVariantId) {
    return (
      <Button
        aria-label="Please select an option"
        disabled
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add To Cart
      </Button>
    );
  }

  return (
    <Button
      variant="default"
      aria-label="Add to cart"
      className="w-full h-[60px]"
    >
      <Plus className="mr-2 h-4 w-4" />
      Add To Cart
    </Button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        addItemAction();
      }}
      className="space-y-2"
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      {message && (
        <p
          aria-live="polite"
          className={cn(
            "text-sm",
            message.includes('Error') ? 'text-destructive' : 'text-muted-foreground'
          )}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
