'use client';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const Prose = ({ html, className }: { html: string; className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Strip HTML tags to get plain text for character counting
  const plainText = html.replace(/<[^>]*>/g, '');
  const isLongContent = plainText.length > 200;

  // Create truncated version (first 200 characters, but cut at last complete word)
  let truncatedText = plainText.substring(0, 200);
  let remainingText = plainText.substring(200);

  if (isLongContent) {
    // Find the last space within the 200 character limit
    const lastSpaceIndex = truncatedText.lastIndexOf(' ');
    if (lastSpaceIndex > 0) {
      truncatedText = plainText.substring(0, lastSpaceIndex);
      remainingText = plainText.substring(lastSpaceIndex + 1); // +1 to skip the space
    }
  }

  const proseClasses = cn(
    'prose mx-auto max-w-6xl text-base leading-7 text-foreground',
    'prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-foreground',
    'prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg',
    'prose-a:text-primary prose-a:underline prose-a:hover:text-primary/80',
    'prose-strong:text-foreground prose-strong:font-semibold',
    'prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6',
    'prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6',
    'prose-blockquote:border-l-4 prose-blockquote:border-border prose-blockquote:pl-4 prose-blockquote:text-muted-foreground',
    'prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded-sm prose-code:text-sm',
    className
  );

  if (!isLongContent) {
    return (
      <div
        className={proseClasses}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div>
      <div className={proseClasses}>
        <div>
          {truncatedText}
          {!isOpen && '...'}
        </div>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent>
            <div className="mt-2">
              {remainingText}
            </div>
          </CollapsibleContent>
          {isLongContent && (
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 h-auto p-0 text-primary hover:text-primary/80"
              >
                {isOpen ? (
                  <>
                    Show less <ChevronUp className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Show more <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
          )}
        </Collapsible>
      </div>
    </div>
  );
};

export default Prose;
