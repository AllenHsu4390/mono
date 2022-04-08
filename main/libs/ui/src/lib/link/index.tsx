import React from 'react';
import Link from 'next/link';

interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // allow both static and dynamic routes
  to: string | { href: string; as: string };
  prefetch?: boolean;
}

export default React.forwardRef(
  ({ to, prefetch, ...props }: IProps, ref: any) => {
    // when we just have a normal url we jsut use it
    if (typeof to === 'string') {
      return (
        <Link href={to} prefetch={prefetch || false}>
          <a {...props} ref={ref} />
        </Link>
      );
    }

    // otherwise pass both "href" / "as"
    return (
      <Link href={to.href} as={to.as} prefetch={prefetch || false}>
        <a {...props} ref={ref} />
      </Link>
    );
  }
);
