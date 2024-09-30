import { callBrp, DEFAULT_URL } from '@/brp';
import { useQuery } from '@tanstack/react-query';

export interface ComponentDataParams {
  entity: string | number;
  components: string[];
}

export const COMPONENT_DATA_KEY = 'COMPONENT_DATA';

export function useComponentData(params: ComponentDataParams) {
  const param = {
    ...params,
    entity: Number(params.entity),
  };
  return useQuery({
    queryKey: [COMPONENT_DATA_KEY, param],
    queryFn: () => callBrp<Record<string, any>>(DEFAULT_URL, 'bevy/get', param),
  });
}
