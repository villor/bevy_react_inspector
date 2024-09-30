import type { NodeApi, NodeRendererProps } from 'react-arborist';
import type { EcsQueryEntity } from './hooks/useEcsQuery';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppWindow, Box, ChevronDown, ChevronRight, Circle, Image, Lightbulb, MousePointer, Move3D, SquareMousePointer, Type, Video } from 'lucide-react';
import { Tree } from 'react-arborist';
import { bevyTypes } from './bevyTypes';
import { useComponentList } from './hooks/useComponentList';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

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
        <div className="flex min-h-0 flex-1 flex-col gap-3 md:flex-row">
          <div className="flex flex-1 select-none overflow-auto rounded-md bg-ui-2 p-3 md:w-96 md:flex-initial">
            <FillFlexParent>
              {({ height }) => (
                <Tree
                  data={entities}
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
          <div className="flex-1 overflow-y-auto overflow-x-hidden rounded-md bg-ui-2 p-3">
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
    <div className="space-y-3">
      {(data ?? []).map(component => (
        <EntityComponent
          key={component}
          entity={entity}
          path={component}
        />
      ))}
    </div>
  );
}

function EntityComponent({ entity, path }: { entity: string | number; path: string }) {
  const [expanded, setExpanded] = useState(false);

  // TODO: Better parsing
  const shortName = path.endsWith('>') || path.endsWith('::')
    ? path
    : path.substring(path.lastIndexOf('::') + 2);

  return (
    <div className="space-y-2 rounded-md bg-ui-3 p-2">
      <div className="flex gap-2">
        <div className="shrink-0">
          {expanded ? <ChevronDown onClick={() => setExpanded(false)} /> : <ChevronRight onClick={() => setExpanded(true)} />}
        </div>
        <div className="overflow-hidden">
          <div className="truncate">{shortName}</div>
          <div className="truncate text-xs text-ui-5/50" title={path}>{path}</div>
        </div>
      </div>
      {expanded && <ComponentData entity={entity} path={path} />}
    </div>
  );
}

function ComponentData({ entity, path }: { entity: string | number; path: string }) {
  const { data, isLoading, error } = useComponentData({ entity, components: [path] });

  return (
    <div className="rounded-md bg-ui-2 p-2">
      <div className="overflow-x-auto pb-3 text-sm">
        {error
          ? <span className="text-red-500">{error.message}</span>
          : (isLoading
              ? 'Loading...'
              : (
                  // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: syntaxHighlight(JSON.stringify(data?.[path], undefined, 2)),
                    }}
                  >
                  </pre>
                ))}
      </div>
    </div>
  );
}

function syntaxHighlight(json: string) {
  if (!json)
    return ''; // no JSON from response

  json = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = 'text-blue-600';
      if (match.startsWith('"')) {
        if (match.endsWith(':')) {
          cls = 'text-blue-300';
        }
        else {
          cls = 'text-orange-300';
        }
      }
      else if (/true|false/.test(match)) {
        cls = 'text-blue-600';
      }
      else if (/null/.test(match)) {
        cls = 'text-blue-500';
      }
      return `<span class="${cls}">${match}</span>`;
    },
  );
}

export default App;
