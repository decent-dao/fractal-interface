import { Button, ButtonProps, Image, Link } from '@chakra-ui/react';
import { t } from 'i18next';

interface Props extends ButtonProps {
  snapshotURL: string;
}

export default function Snapshot({ snapshotURL, mt }: Props) {
  return (
    <Button
      href={snapshotURL}
      as={Link}
      target="_blank"
      variant="secondary"
      mt={mt || 5}
      h={6}
      w={32}
    >
      <>
        <Image
          src="/images/snapshot-icon.svg"
          alt="snapshot icon"
          mr={1}
        />
        {t('snapshot')}
      </>
    </Button>
  );
}
