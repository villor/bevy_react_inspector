import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { bevyTypes } from './bevyTypes';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Inspector />
    </QueryClientProvider>
  );
}

function Inspector() {
  const { data, isLoading } = useEcsQuery({
    data: {
      option: [
        bevyTypes.Children,
        bevyTypes.Parent,
        bevyTypes.Name,
      ],
      has: [
        bevyTypes.Camera,
        bevyTypes.DirectionalLight,
        bevyTypes.HandleMesh,
        bevyTypes.Node,
        bevyTypes.PointLight,
        bevyTypes.SpotLight,
        bevyTypes.Sprite,
        bevyTypes.Text,
        bevyTypes.Transform,
        bevyTypes.Window,
      ],
    },
  });

  const entities = useMemo(() => data?.map(e => ({
    entity: e.entity,
    title: e.components[bevyTypes.Name]?.name as string ?? getEntityType(e.has),
    children: (e.components[bevyTypes.Children]?.[0] ?? []) as number[],
  })) ?? [], [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {entities.map(entity => (
        <div key={entity.entity}>
          {entity.title}
          {' '}
          {entity.entity}
        </div>
      ))}
    </div>
  );
}

function getEntityType(has?: Record<string, boolean> | null) {
  if (has) {
    if (has[bevyTypes.Camera])
      return 'Camera';
    if (has[bevyTypes.DirectionalLight])
      return 'DirectionalLight';
    if (has[bevyTypes.Text])
      return 'Text';
    if (has[bevyTypes.Node])
      return 'Node';
    if (has[bevyTypes.HandleMesh])
      return 'Mesh';
    if (has[bevyTypes.PointLight])
      return 'PointLight';
    if (has[bevyTypes.SpotLight])
      return 'SpotLight';
    if (has[bevyTypes.Sprite])
      return 'Sprite';
    if (has[bevyTypes.Window])
      return 'Window';
    if (has[bevyTypes.Transform])
      return 'Transform';
  }
  return 'Entity';
}

export default App;
