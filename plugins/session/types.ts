import type { Session } from "./session.ts";
export interface Cookies extends Record<string, string | number> {
  expires: number;
  [key: string]: string | number;
}

export type ExtStatus = string;
export type SessionStatus = CookieStatus | ExtStatus;

export type ExtensionInput = {
  data: Cookies;
  status: CookieStatus;
  headers: Headers;
  session: Session;
};

export interface SessionExtension {
  beforeRender(
    extensionInput: ExtensionInput,
  ): Promise<ExtStatus>;
  inject(): Promise<string>;
}

export type CookieStatus = "init" | "expired" | "valid";
