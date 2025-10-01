import { join } from 'node:path';
import { cwd } from 'node:process';
import { AssetType, TerraformAsset } from 'cdktf';
import { build } from 'esbuild';

import type { AppStack } from '../../../types';
import { createSha1 } from '../../../utils';
import type { LambdaHandlerProps } from '../lambda.types';

class LambdaAssets {
  private lambdaAssets: Record<string, TerraformAsset> = {};

  async buildHandler(scope: AppStack, props: LambdaHandlerProps) {
    const prebuildPath = join(props.pathName, `${props.filename}.js`);

    if (this.lambdaAssets[prebuildPath]) {
      return this.lambdaAssets[prebuildPath];
    }

    const outputPath = this.createOutputPath();

    await build({
      entryPoints: [prebuildPath],
      outfile: outputPath,
      splitting: true,
      legalComments: 'none',
      minify: props.lambda?.minify ?? true,
      external: ['@aws-sdk', 'aws-lambda'],
    });

    const asset = new TerraformAsset(scope, `${props.filename}-asset`, {
      path: outputPath,
      type: AssetType.ARCHIVE,
    });

    this.lambdaAssets[prebuildPath] = asset;

    return asset;
  }

  private createOutputPath() {
    return join(cwd(), '.out', createSha1(), 'index.js');
  }
}

export const assets = new LambdaAssets();
