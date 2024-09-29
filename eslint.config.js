import antfu from '@antfu/eslint-config';
import tailwind from 'eslint-plugin-tailwindcss';

export default antfu({
  stylistic: {
    semi: true,
  },
  rules: {
    // 'style/brace-style': ['error', '1tbs'],
    'no-console': 'off',
    'jsonc/sort-keys': 'off',
  },
  react: true,
}, ...tailwind.configs['flat/recommended']);
