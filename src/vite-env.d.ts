/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CALLBACK_FORM_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
