import { useToken } from '@chakra-ui/react';

function Clock({ fill = 'gold.100' }: { fill?: string }) {
  const [fillHex] = useToken('colors', [fill]);
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16.001A8 8 0 0 0 12 20zm1-8h4v2h-6V7h2v5z"
        fill={fillHex}
      />
    </svg>
  );
}

export default Clock;
