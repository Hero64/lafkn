import type { AssetResource } from '../asset/asset.types';

export interface LafkenBuildPluginProps {
  filename: string;
  removeAttributes: string[];
  exports: AssetResource[];
}
