import { callBrp, DEFAULT_URL } from '@/brp';
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
  return useQuery({
    queryKey: [ECS_QUERY_KEY, params],
    queryFn: () => callBrp<EcsQueryEntity[]>(DEFAULT_URL, 'bevy/query', {
      data: {},
      ...params,
    }),
  });
}
