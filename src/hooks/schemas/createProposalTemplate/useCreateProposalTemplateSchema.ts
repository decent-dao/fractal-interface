import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useFractal } from '../../../providers/App/AppProvider';
import { useValidationAddress } from '../common/useValidationAddress';

/**
 * validation schema for Create Proposal Template workflow
 * @dev https://www.npmjs.com/package/yup
 */
const useCreateProposalTemplateSchema = () => {
  const { t } = useTranslation('proposal');
  const { addressValidationTest } = useValidationAddress();
  const {
    node: { safe },
  } = useFractal();

  const labelOrValueValidationTest: Yup.TestFunction<string | undefined, Yup.AnyObject> = (
    _,
    context
  ) => {
    if (!context.parent.signature) {
      return true;
    }

    if (!!context.parent.label || !!context.parent.value) {
      return true;
    }

    return false;
  };

  const createProposalTemplateValidation = useMemo(
    () =>
      Yup.object().shape({
        transactions: Yup.array()
          .min(1)
          .of(
            Yup.object().shape({
              targetAddress: Yup.string().test(addressValidationTest),
              ethValue: Yup.object().shape({
                value: Yup.string(),
              }),
              functionName: Yup.string().matches(/^[a-z0-9]+$/i, {
                message: t('functionNameError'),
              }),
              parameters: Yup.array().of(
                Yup.object().shape({
                  signature: Yup.string(),
                  label: Yup.string().test({
                    message: t('labelOrValueRequired'),
                    test: labelOrValueValidationTest,
                  }),
                  value: Yup.string().test({
                    message: t('labelOrValueRequired'),
                    test: labelOrValueValidationTest,
                  }),
                })
              ),
            })
          ),
        proposalTemplateMetadata: Yup.object().shape({
          title: Yup.string().trim().required().max(50),
          description: Yup.string().trim().notRequired().max(300),
        }),
        nonce: Yup.number()
          .required()
          .moreThan((!!safe && safe.nonce - 1) || 0),
      }),
    [addressValidationTest, t, safe]
  );
  return { createProposalTemplateValidation };
};

export default useCreateProposalTemplateSchema;
