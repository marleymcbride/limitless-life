import { HTMLAttributes } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      h2black: HTMLAttributes<HTMLElement>;
    }
  }
}

export {};
