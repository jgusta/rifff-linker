import { ExtensionInput, SessionExtension } from "./types.ts";

export class DefaultExtension implements SessionExtension {
  beforeRender(
    _data: ExtensionInput,
  ): Promise<string> {
    return Promise.resolve("");
  }
  inject() {
    return Promise.resolve("");
  }
}
