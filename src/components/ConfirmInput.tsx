import type { InputProps } from './Input';
import { Check, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export interface ConfirmInputProps extends InputProps {
  onConfirm: (value: InputProps['value']) => void;
}

const ConfirmInput = forwardRef<HTMLInputElement, ConfirmInputProps>(
  ({ className, type, value, onConfirm, ...props }, ref) => {
    const [dirtyValue, setDirtyValue] = useState(value);
    const isDirty = dirtyValue !== value;

    const internalRef = useRef<HTMLInputElement>();

    useEffect(() => {
      setDirtyValue(value);
    }, [value]);

    function confirm() {
      onConfirm(dirtyValue);
      internalRef.current?.blur();
    }

    function abort() {
      setDirtyValue(value);
      internalRef.current?.blur();
    }

    return (
      <div className={twMerge(className, 'relative')}>
        <Input
          {...props}
          ref={mergeRefs(internalRef, ref)}
          value={dirtyValue}
          onChange={(e) => {
            setDirtyValue(e.target.value);
            props.onChange && props.onChange(e);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              confirm();
            }
            if (e.key === 'Escape') {
              abort();
            }
            props.onKeyDown && props.onKeyDown(e);
          }}
        />
        {isDirty && (
          <div className="absolute right-1.5 top-1/2 flex -translate-y-1/2 space-x-1.5">
            <Button size="sm" variant="secondary" onClick={abort}>
              <X className="size-4" />
            </Button>
            <Button size="sm" onClick={confirm}>
              <Check className="size-4" />
            </Button>
          </div>
        )}
      </div>
    );
  },
);
ConfirmInput.displayName = 'ConfirmInput';

export { ConfirmInput };
