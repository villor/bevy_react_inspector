import { callBrp } from '@/brp';
import { useQuery } from '@tanstack/react-query';

export interface ComponentDataParams {
  entity: string | number;
  components: string[];
}

export const COMPONENT_DATA_KEY = 'COMPONENT_DATA';

export function useComponentData(params: ComponentDataParams) {
  const { url } = useSettings();
  const param = {
    ...params,
    entity: Number(params.entity),
  };
  return useQuery({
    queryKey: [COMPONENT_DATA_KEY, url, param],
    queryFn: () => callBrp<Record<string, any>>(url, 'bevy/get', param),
  });
}
