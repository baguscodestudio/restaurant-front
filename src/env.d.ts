interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly REST_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
