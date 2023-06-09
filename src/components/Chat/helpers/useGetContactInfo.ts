import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import useStore from '../../../store';
import { AccountServices } from '../../../services/accountServices';
import { ContactInfo } from '../../../services/accountServices/types';
import { showErrorToast } from '../../../helpers/showErrorToast';

export function useGetContactInfo(chatId: string) {
  const [contactInfo, setContactInfo] = useState<ContactInfo>();

  const { idInstance, apiTokenInstance } = useStore((store) => store);

  const { isLoading, mutateAsync } = useMutation(
    AccountServices.getContactInfo
  );

  useEffect(() => {
    const getContactInfo = async () => {
      if (!chatId) return;

      try {
        const response = await mutateAsync({
          idInstance,
          apiTokenInstance,
          chatId,
        });

        if (response) {
          setContactInfo(response);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        showErrorToast(err?.data?.message || err?.message);
      }
    };

    getContactInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  return { contactInfo, isLoading };
}
