import { Box, Button, Flex, Text, Image } from '@chakra-ui/react';
import { useGetMultisigMetadata } from '../../hooks/DAO/proposal/useGetMultisigMetadata';
import { FractalProposal, AzoriusProposal } from '../../types';
import { ActivityDescription } from '../Activity/ActivityDescription';
import { ModalType } from '../ui/modals/ModalProvider';
import { useFractalModal } from '../ui/modals/useFractalModal';
import ProposalExecutableCode from '../ui/proposal/ProposalExecutableCode';
import ProposalStateBox from '../ui/proposal/ProposalStateBox';

export function ProposalInfo({ proposal }: { proposal: FractalProposal }) {
  const azoriusProposal = proposal as AzoriusProposal;
  const { multisigMetadata } = useGetMultisigMetadata(proposal.proposalId, proposal.transaction);
  const description = multisigMetadata?.description || azoriusProposal.metaData?.description;
  const documentationUrl =
    multisigMetadata?.documentationUrl || azoriusProposal.metaData?.documentationUrl;
  const confirmUrl = useFractalModal(ModalType.CONFIRM_URL, { url: documentationUrl });

  return (
    <Box>
      <Flex
        gap={4}
        alignItems="center"
      >
        <ProposalStateBox state={proposal.state} />
      </Flex>
      <Box mt={4}>
        <ActivityDescription activity={proposal} />
        {description && <Text my={4}>{description}</Text>}
        {documentationUrl && (
          <Button
            onClick={confirmUrl}
            variant="text"
            color="gold.500"
          >
            <Flex>
              <Image
                src="/images/external-link.svg"
                alt={'Test'}
                w="1rem"
                h="1rem"
                my={1}
                mr={2}
              />
              {documentationUrl}
            </Flex>
          </Button>
        )}
        <ProposalExecutableCode proposal={proposal} />
      </Box>
    </Box>
  );
}
