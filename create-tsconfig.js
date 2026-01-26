const fs = require('fs');

const tsconfig = {
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"]
    },
    target: "es5",
    lib: ["dom", "dom.iterable", "esnext"],
    allowJs: true,
    skipLibCheck: true,
    strict: true,
    forceConsistentCasingInFileNames: true,
    noEmit: true,
    esModuleInterop: true,
    module: "esnext",
    moduleResolution: "node",
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: "preserve",
    incremental: true,
    plugins: [
      {
        name: "next"
      }
    ]
  },
  include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  exclude: ["node_modules"]
};

fs.writeFileSync('tsconfig.json', JSON.stringify(tsconfig, null, 2));
console.log('tsconfig.json created successfully');
