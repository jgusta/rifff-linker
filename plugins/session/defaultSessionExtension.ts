import { ExtensionInput, SessionExtension } from "./session.ts";

export default class DefaultSessionExtension implements SessionExtension {
  beforeRender(
    _data: ExtensionInput,
  ): Promise<string> {
    return Promise.resolve("");
  }
  inject() {
    return Promise.resolve("");
  }
}
