import { Text, Input, HStack, VStack, Flex } from '@chakra-ui/react';
import { Gear } from '@decent-org/fractal-ui';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFractal } from '../../../providers/App/AppProvider';
import SupportTooltip from '../badges/SupportTooltip';

export function CustomNonceInput({
  align = 'start',
  nonce,
  onChange,
}: {
  align?: 'start' | 'end';
  nonce: number | undefined;
  onChange: (nonce?: number) => void;
}) {
  const {
    node: { safe },
    readOnly: { dao },
  } = useFractal();
  const { t } = useTranslation(['proposal', 'common']);
  const errorMessage =
    nonce !== undefined && safe && nonce < safe.nonce ? t('customNonceError') : undefined;
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  if (dao?.isAzorius) return null;

  return revealed ? (
    <VStack alignItems={align}>
      <HStack>
        <Flex
          ref={containerRef}
          me="0.5rem"
        >
          <Text
            alignSelf="center"
            textStyle="text-md-sans-regular"
            me="0.5rem"
          >
            {t('customNonce', { ns: 'proposal' })}
          </Text>
          <SupportTooltip
            containerRef={containerRef}
            label={t('customNonceTooltip', { ns: 'proposal' })}
          />
        </Flex>
        <Input
          w="4.5rem"
          value={nonce}
          onChange={e => onChange(e.target.value ? Number(e.target.value) : undefined)}
          type="number"
        />
      </HStack>
      {errorMessage && (
        <Text
          color="alert-red.normal"
          textStyle="text-md-sans-regular"
        >
          {errorMessage}
        </Text>
      )}
    </VStack>
  ) : (
    <HStack
      onClick={() => setRevealed(true)}
      _hover={{ color: 'gold.500-hover' }}
      cursor="pointer"
    >
      <Input
        w="0"
        marginEnd="-2.5rem"
        visibility="hidden"
        opacity="0"
      />
      <Gear />
      <Text>{t('advanced', { ns: 'common' })}</Text>
    </HStack>
  );
}
