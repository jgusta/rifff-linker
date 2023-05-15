import type { Cookies } from "./types.ts";
import type {
  CookieStatus,
  ExtStatus,
  SessionExtension,
  SessionStatus,
} from "./types.ts";
import { DefaultExtension } from "./defaultSessionExtension.ts";
import { readEncryptedCookies } from "./cookies.ts";

export class Session {
  static #internalConstructor = Symbol();
  #headers: Headers;
  #data: Record<string, string | number> = {};
  #now = new Date(0);
  #cookieStatus: CookieStatus = "init";
  #extStatus: ExtStatus = "";
  #expires = new Date(0);
  sessionExtension: SessionExtension;
  constructor(req: Request, sessionExtension: SessionExtension) {
    if (!Session.#internalConstructor) {
      throw new TypeError("Session constructor is private");
    }
    if (!sessionExtension) {
      throw new TypeError("Session extension is required");
    }
    this.sessionExtension = sessionExtension;
    this.#headers = req.headers;
  }

  get status(): SessionStatus {
    if (this.#cookieStatus !== "valid") {
      return this.#cookieStatus;
    }
    return this.#extStatus;
  }

  set status(x: SessionStatus) {
    this.#extStatus = x;
  }

  async extension(
    data: Cookies,
    session: Session,
  ): Promise<SessionStatus> {
    return await this.sessionExtension.beforeRender({
      data,
      status: this.#cookieStatus,
      headers: this.#headers,
      session,
    });
  }

  // factory pattern allows "async" constructor.
  static async create(req: Request, extension: SessionExtension | null = null) {
    const input: SessionExtension = extension === null
      ? new DefaultExtension()
      : extension;

    const session = new Session(req, input);
    try {
      const data = await readEncryptedCookies(req.headers);
      session.#expires = new Date(data.expires);
      if (session.#expires < session.#now) {
        session.#cookieStatus = "expired";
      } else {
        for (const key in data) {
          if (key != "expires") {
            session.#data[key] = data[key];
          }
        }
        session.#cookieStatus = "valid";
        session.extension(data, session);
      }
    } catch (e) {
      console.log(e);
      session.#expires = new Date(0);
      session.#data = { expires: 0 };
      session.#cookieStatus = "expired";
    }
    return session;
  }
}
