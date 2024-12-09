import { defaultAt, defaultVersion, RegistryUrl } from "./registry.ts";
import { DenoLand } from "./registry.ts";

export {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.196.0/assert/mod.ts";

export class FakeRegistry implements RegistryUrl {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  // deno-lint-ignore require-await
  async all(): Promise<string[]> {
    return ["0.0.2", "0.0.1"];
  }

  at(version: string): RegistryUrl {
    const url = defaultAt(this, version);
    return new FakeRegistry(url);
  }

  version(): string {
    return defaultVersion(this);
  }

  regexp = /https?:\/\/fakeregistry.com\/[^\/\"\']*?\@[^\'\"]*/;
}

export class FakeDenoLand extends DenoLand {
  // deno-lint-ignore require-await
  override async all(): Promise<string[]> {
    return ["0.35.0", "0.34.0"];
  }
}
