import { metaDefaults } from "config";
type MetaObj = typeof metaDefaults;

export function makeMeta(_meta: MetaObj): MetaObj {
  const meta = metaDefaults;
  let key: keyof MetaObj;
  for (key in _meta) {
    const value = _meta[key];
    if (key in metaDefaults && value != '') {
      meta[key] = value;
    }
  }
  return meta;
}