import { callBrp } from '@/brp';
import { useQuery } from '@tanstack/react-query';

export interface ComponentListParams {
  entity?: string | number | null;
}

export const COMPONENT_LIST_KEY = 'COMPONENT_LIST';

export function useComponentList(params?: ComponentListParams) {
  const { url } = useSettings();
  const param = params?.entity
    ? {
        entity: Number(params.entity),
      }
    : null;
  return useQuery({
    queryKey: [COMPONENT_LIST_KEY, url, param],
    queryFn: () => callBrp<string[]>(url, 'bevy/list', param),
  });
}
