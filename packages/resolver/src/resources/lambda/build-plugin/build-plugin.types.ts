import type { AssetResource } from '../asset/asset.types';

export interface LafknBuildPluginProps {
  filename: string;
  removeAttributes: string[];
  exports: AssetResource[];
}
