import { callBrp, DEFAULT_URL } from '@/brp';
import { useQuery } from '@tanstack/react-query';

export interface ComponentListParams {
  entity?: string | number | null;
}

export const COMPONENT_LIST_KEY = 'COMPONENT_LIST';

export function useComponentList(params?: ComponentListParams) {
  const param = params?.entity
    ? {
        entity: Number(params.entity),
      }
    : null;
  return useQuery({
    queryKey: [COMPONENT_LIST_KEY, param],
    queryFn: () => callBrp<string[]>(DEFAULT_URL, 'bevy/list', param),
  });
}
