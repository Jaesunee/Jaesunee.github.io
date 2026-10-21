import { execSync } from 'node:child_process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function lastCommit() {
    try {
        return execSync('git rev-parse --short HEAD').toString().trim();
    } catch {
        return 'dev';
    }
}

export default defineConfig({
    plugins: [react()],
    base: '/',
    build: { outDir: 'build' },
    define: { __COMMIT__: JSON.stringify(lastCommit()) },
});
