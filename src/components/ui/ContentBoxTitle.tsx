import { ReactNode } from 'react';

function ContentBoxTitle({ children }: { children: ReactNode }) {
  return <p className="text-left text-md text-gray-50">{children}</p>;
}

export default ContentBoxTitle;
