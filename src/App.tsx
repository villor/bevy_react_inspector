import type { NodeApi, NodeRendererProps } from 'react-arborist';
import type { EcsQueryEntity } from './hooks/useEcsQuery';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppWindow, Box, ChevronDown, ChevronRight, Circle, Image, Lightbulb, MousePointer, Move3D, SquareMousePointer, Type, Video } from 'lucide-react';
import { Tree } from 'react-arborist';
import { bevyTypes } from './bevyTypes';
import { useComponentList } from './hooks/useComponentList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Inspector />
    </QueryClientProvider>
  );
}

interface TreeEntity {
  id: string;
  name: string;
  type: string;
  children: TreeEntity[];
}

function getParent(entity: EcsQueryEntity) {
  return (entity.components[bevyTypes.Parent]?.[0] ?? null) as number | null;
}

function mapTreeEntity(allEntities: EcsQueryEntity[], e: EcsQueryEntity): TreeEntity {
  const type = getEntityType(e.has);
  const name = e.components[bevyTypes.Name]?.name as string ?? type;
  const children = allEntities
    .filter(e2 => getParent(e2) === e.entity)
    .map(e2 => mapTreeEntity(allEntities, e2));
  return {
    id: e.entity.toString(),
    name,
    type,
    children,
  };
}

function Inspector() {
  const { data, isLoading } = useEcsQuery({
    data: {
      option: [
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
        bevyTypes.PrimaryWindow,
        bevyTypes.Window,
        bevyTypes.PointerId,
      ],
    },
  });

  const entities = useMemo(
    () => data
      ?.filter(e => !e.components[bevyTypes.Parent])
      .toSorted((a, b) => a.entity - b.entity)
      .map(e => mapTreeEntity(data, e)),
    [data],
  );

  const [selectedEntity, setSelectedEntity] = useState<string | undefined>();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen overflow-hidden p-3">
      <div className="flex h-full flex-col gap-3 overflow-hidden">
        <div className="rounded-md bg-ui-2 p-3">
          <h1 className="text-ui-5/50">Toolbar goes here</h1>
        </div>
        <div className="flex flex-1 flex-col gap-3 md:flex-row">
          <div className="flex flex-1 overflow-auto rounded-md bg-ui-2 p-3 md:w-96 md:flex-initial">
            <FillFlexParent>
              {({ width, height }) => (
                <Tree
                  data={entities}
                  width={width}
                  height={height}
                  padding={15}
                  rowHeight={30}
                  paddingBottom={32}
                  rowClassName="cursor-default whitespace-nowrap focus:outline-none"
                  selection={selectedEntity}
                  onSelect={(nodes) => {
                    setSelectedEntity(nodes.length > 0 ? nodes[0].id : undefined);
                  }}
                  disableEdit
                  selectionFollowsFocus
                >
                  {Node}
                </Tree>
              )}
            </FillFlexParent>
          </div>
          <div className="flex-1 rounded-md bg-ui-2 p-3">
            {selectedEntity
              ? <EntityInspector entity={selectedEntity} />
              : <p>Select an entity to view its components...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Node({ style, node, dragHandle }: NodeRendererProps<TreeEntity>) {
  const { isSelected, willReceiveDrop } = node.state;
  return (
    <div
      style={style}
      className={clsx(
        'group relative flex h-full items-center gap-1 rounded-md text-sm outline-none',
        {
          'bg-ui-3/30': willReceiveDrop,
          'bg-ui-3 text-white': isSelected,
        },
      )}
      ref={dragHandle}
      onClick={() => node.select()}
    >
      <FolderArrow node={node} />
      <EntityIcon className="mx-1 shrink-0" entity={node.data} />
      {' '}
      <span className="flex-1 truncate">
        {node.data.name}
      </span>
    </div>
  );
}

function FolderArrow({ node }: { node: NodeApi<TreeEntity> }) {
  return (
    <span className="w-5 pl-1 text-ui-5" onClick={() => node.toggle()}>
      { !!node.data.children.length && (node.isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />)}
    </span>
  );
}

function EntityIcon({ entity, className }: { entity: TreeEntity; className?: string }) {
  const size = 16;
  switch (entity.type) {
    case 'Camera':
      return <Video className={className} size={size} />;

    case 'DirectionalLight':
    case 'PointLight':
    case 'SpotLight':
      return <Lightbulb color="#fcd34d" className={className} size={size} />;

    case 'Text':
      return <Type className={className} size={size} />;

    case 'Node':
      return <SquareMousePointer className={className} size={size} />;

    case 'Mesh':
      return <Box color="#a156d6" className={className} size={size} />;

    case 'Sprite':
      return <Image color="#a156d6" className={className} size={size} />;

    case 'PrimaryWindow':
    case 'Window':
      return <AppWindow className={className} size={size} />;

    case 'Pointer':
      return <MousePointer className={className} size={size} />;

    case 'Transform':
      return <Move3D color="#5796e8" className={className} size={size} />;

    default: return <Circle className={className} size={size} />;
  }
}

function getEntityType(has?: Record<string, boolean> | null) {
  if (has) {
    if (has[bevyTypes.Camera])
      return 'Camera';
    if (has[bevyTypes.Text])
      return 'Text';
    if (has[bevyTypes.Node])
      return 'Node';
    if (has[bevyTypes.HandleMesh])
      return 'Mesh';
    if (has[bevyTypes.DirectionalLight])
      return 'DirectionalLight';
    if (has[bevyTypes.PointLight])
      return 'PointLight';
    if (has[bevyTypes.SpotLight])
      return 'SpotLight';
    if (has[bevyTypes.Sprite])
      return 'Sprite';
    if (has[bevyTypes.PrimaryWindow])
      return 'PrimaryWindow';
    if (has[bevyTypes.Window])
      return 'Window';
    if (has[bevyTypes.PointerId])
      return 'Pointer';
    if (has[bevyTypes.Transform])
      return 'Transform';
  }
  return 'Entity';
}

function EntityInspector({ entity }: { entity: string | number }) {
  const { data, isLoading } = useComponentList({ entity });

  if (isLoading)
    return <div>Loading...</div>;

  return (
    <div>
      {(data ?? []).map(component => <div key={component}>{component}</div>)}
    </div>
  );
}

export default App;
