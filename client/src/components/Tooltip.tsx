import * as React from 'react';
import type { ReactNode } from 'react';

const Tooltip: React.FC<{ children: ReactNode; tooltip: string }> = ({ children, tooltip }) => {

  return (
    <main className='group relative inline-block'>
      {children}
      <section className="absolute bottom-full left-1/2 mb-2 hidden w-max -translate-x-1/2 scale-95 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
        <div className="whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white">
          {tooltip}
        </div>
        <div className="mx-auto h-2 w-2 rotate-45 bg-gray-800"></div>

      </section>
    </main>
  )
}

export default Tooltip