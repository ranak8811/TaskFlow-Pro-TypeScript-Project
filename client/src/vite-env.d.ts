/// <reference types="vite/client" />

// VITE_API_BASE_URL এর টাইপ ডিক্লেয়ার করলাম
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
