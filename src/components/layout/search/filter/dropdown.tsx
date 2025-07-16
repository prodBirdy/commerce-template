'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import type { ListItem } from '.';
import { FilterItem } from './item';

export default function FilterItemDropdown({ list }: { list: ListItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState('');
  const [openSelect, setOpenSelect] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    list.forEach((listItem: ListItem) => {
      if (
        ('path' in listItem && pathname === listItem.path) ||
        ('slug' in listItem && searchParams.get('sort') === listItem.slug)
      ) {
        setActive(listItem.title);
      }
    });
  }, [pathname, list, searchParams]);

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="outline"
        onClick={() => setOpenSelect(!openSelect)}
        className="w-full justify-between"
      >
        <span>{active}</span>
        <ChevronDownIcon className="h-4 w-4" />
      </Button>
      {openSelect && (
        <Card className="absolute z-40 w-full mt-1">
          <CardContent className="p-2">
            {list.map((item: ListItem, i) => (
              <div
                key={i}
                onClick={() => setOpenSelect(false)}
                className="w-full"
              >
                <FilterItem item={item} />
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
