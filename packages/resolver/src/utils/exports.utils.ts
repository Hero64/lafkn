import { appendFile, readFile, unlink } from 'node:fs/promises';
import type { LambdaMetadata, ResourceMetadata } from '@alicanto/common';

const processedFiles = new Set<string>([]);
const exportedFiles = new Set<string>([]);

export const exportHandlers = async (
  resourceMetadata: ResourceMetadata,
  handlers: LambdaMetadata[]
) => {
  const { filename, foldername, originalName } = resourceMetadata;
  const fullPath = `${foldername}/${filename}.js`;
  if (processedFiles.has(fullPath)) {
    return;
  }

  processedFiles.add(fullPath);

  const instanceName = `${originalName}Instance`;
  const instance = `const ${instanceName} = new ${originalName}()`;

  const exports = handlers.map((handler) => {
    return `exports.${handler.name} = ${instanceName}.${handler.name}.bind(${instanceName})`;
  });

  let existingContent = '';

  try {
    existingContent = await readFile(fullPath, 'utf8');
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
  }

  const contentToAppend = `${instance}\n${exports.join('\n')}\n`;
  const newContent = `${existingContent}${contentToAppend}`;

  const newFilePath = `${foldername}/${filename.replace('.', '-')}.js`;
  exportedFiles.add(newFilePath);
  await appendFile(newFilePath, newContent, 'utf8');
};

export const removeExportedFiles = async () => {
  await Promise.all([...exportedFiles].map((path) => unlink(path)));
};
