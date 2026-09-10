import ts from 'typescript';
import fs from 'fs';
import path from 'path';

const file = path.resolve('components/pages/dev-tools/PerformanceTesterPage.tsx');
const code = fs.readFileSync(file, 'utf8');

const result = ts.transpileModule(code, {
  compilerOptions: {
    target: ts.ScriptTarget.ES5,
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.ESNext,
    removeComments: false
  }
});

fs.writeFileSync(file.replace('.tsx', '.compiled.ts'), result.outputText);
console.log('Compiled!');