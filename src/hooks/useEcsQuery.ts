import { callBrp } from '@/brp';
import { useQuery } from '@tanstack/react-query';

export interface EcsQueryParams {
  data?: {
    components?: string[] | null;
    option?: string[] | null;
    has?: string[] | null;
  } | null;
  filter?: {
    with?: string[] | null;
    without?: string[] | null;
  } | null;
}

export interface EcsQueryEntity {
  entity: number;
  components: Record<string, any>;
  has?: Record<string, boolean> | null;
}

export const ECS_QUERY_KEY = 'ECS_QUERY';

export function useEcsQuery(params?: EcsQueryParams) {
  const { url } = useSettings();
  return useQuery({
    queryKey: [ECS_QUERY_KEY, url, params],
    queryFn: () => callBrp<EcsQueryEntity[]>(url, 'bevy/query', {
      data: {},
      ...params,
    }),
  });
}
