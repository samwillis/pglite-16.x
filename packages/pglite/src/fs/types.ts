import type { EmPostgres, FS } from "../postgres.js";

export type FsType = "nodefs" | "idbfs" | "memoryfs" | "pgfs";

export interface FilesystemFactory {
  new (dataDir: string): Filesystem;
}

export interface Filesystem {
  /**
   * Returns the options to pass to the emscripten module.
   */
  emscriptenOpts(opts: Partial<EmPostgres>): Promise<Partial<EmPostgres>>;

  /**
   * Sync the filesystem to the emscripten filesystem.
   */
  syncToFs(mod: FS): Promise<void>;

  /**
   * Sync the emscripten filesystem to the filesystem.
   */
  initialSyncFs(mod: FS): Promise<void>;


//  on_mount(): Function<void>;
  // load_extension(ext: string): Promise<void>;

}

export abstract class FilesystemBase implements Filesystem {
  protected dataDir?: string;
  constructor(dataDir?: string) {
    this.dataDir = dataDir;
  }
  abstract emscriptenOpts(
    opts: Partial<EmPostgres>,
  ): Promise<Partial<EmPostgres>>;
  async syncToFs(mod: FS) {}
  async initialSyncFs(mod: FS) {}
}
