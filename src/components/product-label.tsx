import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Price from './price';

const ProductLabel = ({
  title,
  amount,
  currencyCode,
  position = 'bottom'
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  return (
    <div
      className={cn('absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label', {
        'lg:px-20 lg:pb-[35%]': position === 'center'
      })}
    >
      <div className="flex items-center rounded-xl  bg-background/70 p-1 text-xs font-semibold backdrop-blur-md shadow-sm">
        <h3 className="mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight text-foreground">{title}</h3>
        <Badge className="flex-none border-none rounded-xl bg-primary p-2 text-primary-foreground">
          <Price
            amount={amount}
            currencyCode={currencyCode}
            currencyCodeClassName="hidden @[275px]/label:inline"
          />
        </Badge>
      </div>
    </div>
  );
};

export default ProductLabel;
