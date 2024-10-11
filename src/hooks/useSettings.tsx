import { createContext, type PropsWithChildren } from 'react';

const DEFAULT_URL = import.meta.env.DEV ? 'http://localhost:15702' : 'http://localhost:15703';

function useSettingsContext() {
  const [url, setUrlInternal] = useState(DEFAULT_URL);

  function setUrl(url: any) {
    setUrlInternal(url?.toString() ?? DEFAULT_URL);
  }

  return useMemo(() => ({
    url,
    setUrl,
  }), [url]);
}

const SettingsContext = createContext({} as ReturnType<typeof useSettingsContext>);

export function SettingsProvider({ children }: PropsWithChildren) {
  const ctx = useSettingsContext();
  return (
    <SettingsContext.Provider value={ctx}>
      {children}
    </SettingsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  return useContext(SettingsContext);
}
