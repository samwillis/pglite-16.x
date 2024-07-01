type FS = typeof FS & {
    filesystems: {
        MEMFS: Emscripten.FileSystemType;
        NODEFS: Emscripten.FileSystemType;
        IDBFS: Emscripten.FileSystemType;
        PGFS: Emscripten.FileSystemType;
    };
};
interface EmPostgres extends Omit<EmscriptenModule, 'preInit' | 'preRun' | 'postRun'> {
    preInit: Array<{
        (mod: EmPostgres): void;
    }>;
    preRun: Array<{
        (mod: EmPostgres): void;
    }>;
    postRun: Array<{
        (mod: EmPostgres): void;
    }>;
    FS: FS;
}

interface Filesystem {
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
}

declare type Mode = 'text' | 'binary';
declare type MessageName = 'parseComplete' | 'bindComplete' | 'closeComplete' | 'noData' | 'portalSuspended' | 'replicationStart' | 'emptyQuery' | 'copyDone' | 'copyData' | 'rowDescription' | 'parameterDescription' | 'parameterStatus' | 'backendKeyData' | 'notification' | 'readyForQuery' | 'commandComplete' | 'dataRow' | 'copyInResponse' | 'copyOutResponse' | 'authenticationOk' | 'authenticationMD5Password' | 'authenticationCleartextPassword' | 'authenticationSASL' | 'authenticationSASLContinue' | 'authenticationSASLFinal' | 'error' | 'notice';
interface BackendMessage {
    name: MessageName;
    length: number;
}
declare const parseComplete: BackendMessage;
declare const bindComplete: BackendMessage;
declare const closeComplete: BackendMessage;
declare const noData: BackendMessage;
declare const portalSuspended: BackendMessage;
declare const replicationStart: BackendMessage;
declare const emptyQuery: BackendMessage;
declare const copyDone: BackendMessage;
interface NoticeOrError {
    message: string | undefined;
    severity: string | undefined;
    code: string | undefined;
    detail: string | undefined;
    hint: string | undefined;
    position: string | undefined;
    internalPosition: string | undefined;
    internalQuery: string | undefined;
    where: string | undefined;
    schema: string | undefined;
    table: string | undefined;
    column: string | undefined;
    dataType: string | undefined;
    constraint: string | undefined;
    file: string | undefined;
    line: string | undefined;
    routine: string | undefined;
}
declare class DatabaseError extends Error implements NoticeOrError {
    readonly length: number;
    readonly name: MessageName;
    severity: string | undefined;
    code: string | undefined;
    detail: string | undefined;
    hint: string | undefined;
    position: string | undefined;
    internalPosition: string | undefined;
    internalQuery: string | undefined;
    where: string | undefined;
    schema: string | undefined;
    table: string | undefined;
    column: string | undefined;
    dataType: string | undefined;
    constraint: string | undefined;
    file: string | undefined;
    line: string | undefined;
    routine: string | undefined;
    constructor(message: string, length: number, name: MessageName);
}
declare class CopyDataMessage {
    readonly length: number;
    readonly chunk: Buffer;
    readonly name = "copyData";
    constructor(length: number, chunk: Buffer);
}
declare class CopyResponse {
    readonly length: number;
    readonly name: MessageName;
    readonly binary: boolean;
    readonly columnTypes: number[];
    constructor(length: number, name: MessageName, binary: boolean, columnCount: number);
}
declare class Field {
    readonly name: string;
    readonly tableID: number;
    readonly columnID: number;
    readonly dataTypeID: number;
    readonly dataTypeSize: number;
    readonly dataTypeModifier: number;
    readonly format: Mode;
    constructor(name: string, tableID: number, columnID: number, dataTypeID: number, dataTypeSize: number, dataTypeModifier: number, format: Mode);
}
declare class RowDescriptionMessage {
    readonly length: number;
    readonly fieldCount: number;
    readonly name: MessageName;
    readonly fields: Field[];
    constructor(length: number, fieldCount: number);
}
declare class ParameterDescriptionMessage {
    readonly length: number;
    readonly parameterCount: number;
    readonly name: MessageName;
    readonly dataTypeIDs: number[];
    constructor(length: number, parameterCount: number);
}
declare class ParameterStatusMessage {
    readonly length: number;
    readonly parameterName: string;
    readonly parameterValue: string;
    readonly name: MessageName;
    constructor(length: number, parameterName: string, parameterValue: string);
}
declare class AuthenticationMD5Password implements BackendMessage {
    readonly length: number;
    readonly salt: Buffer;
    readonly name: MessageName;
    constructor(length: number, salt: Buffer);
}
declare class BackendKeyDataMessage {
    readonly length: number;
    readonly processID: number;
    readonly secretKey: number;
    readonly name: MessageName;
    constructor(length: number, processID: number, secretKey: number);
}
declare class NotificationResponseMessage {
    readonly length: number;
    readonly processId: number;
    readonly channel: string;
    readonly payload: string;
    readonly name: MessageName;
    constructor(length: number, processId: number, channel: string, payload: string);
}
declare class ReadyForQueryMessage {
    readonly length: number;
    readonly status: string;
    readonly name: MessageName;
    constructor(length: number, status: string);
}
declare class CommandCompleteMessage {
    readonly length: number;
    readonly text: string;
    readonly name: MessageName;
    constructor(length: number, text: string);
}
declare class DataRowMessage {
    length: number;
    fields: any[];
    readonly fieldCount: number;
    readonly name: MessageName;
    constructor(length: number, fields: any[]);
}
declare class NoticeMessage implements BackendMessage, NoticeOrError {
    readonly length: number;
    readonly message: string | undefined;
    constructor(length: number, message: string | undefined);
    readonly name = "notice";
    severity: string | undefined;
    code: string | undefined;
    detail: string | undefined;
    hint: string | undefined;
    position: string | undefined;
    internalPosition: string | undefined;
    internalQuery: string | undefined;
    where: string | undefined;
    schema: string | undefined;
    table: string | undefined;
    column: string | undefined;
    dataType: string | undefined;
    constraint: string | undefined;
    file: string | undefined;
    line: string | undefined;
    routine: string | undefined;
}

type messages_AuthenticationMD5Password = AuthenticationMD5Password;
declare const messages_AuthenticationMD5Password: typeof AuthenticationMD5Password;
type messages_BackendKeyDataMessage = BackendKeyDataMessage;
declare const messages_BackendKeyDataMessage: typeof BackendKeyDataMessage;
type messages_BackendMessage = BackendMessage;
type messages_CommandCompleteMessage = CommandCompleteMessage;
declare const messages_CommandCompleteMessage: typeof CommandCompleteMessage;
type messages_CopyDataMessage = CopyDataMessage;
declare const messages_CopyDataMessage: typeof CopyDataMessage;
type messages_CopyResponse = CopyResponse;
declare const messages_CopyResponse: typeof CopyResponse;
type messages_DataRowMessage = DataRowMessage;
declare const messages_DataRowMessage: typeof DataRowMessage;
type messages_DatabaseError = DatabaseError;
declare const messages_DatabaseError: typeof DatabaseError;
type messages_Field = Field;
declare const messages_Field: typeof Field;
type messages_MessageName = MessageName;
type messages_Mode = Mode;
type messages_NoticeMessage = NoticeMessage;
declare const messages_NoticeMessage: typeof NoticeMessage;
type messages_NotificationResponseMessage = NotificationResponseMessage;
declare const messages_NotificationResponseMessage: typeof NotificationResponseMessage;
type messages_ParameterDescriptionMessage = ParameterDescriptionMessage;
declare const messages_ParameterDescriptionMessage: typeof ParameterDescriptionMessage;
type messages_ParameterStatusMessage = ParameterStatusMessage;
declare const messages_ParameterStatusMessage: typeof ParameterStatusMessage;
type messages_ReadyForQueryMessage = ReadyForQueryMessage;
declare const messages_ReadyForQueryMessage: typeof ReadyForQueryMessage;
type messages_RowDescriptionMessage = RowDescriptionMessage;
declare const messages_RowDescriptionMessage: typeof RowDescriptionMessage;
declare const messages_bindComplete: typeof bindComplete;
declare const messages_closeComplete: typeof closeComplete;
declare const messages_copyDone: typeof copyDone;
declare const messages_emptyQuery: typeof emptyQuery;
declare const messages_noData: typeof noData;
declare const messages_parseComplete: typeof parseComplete;
declare const messages_portalSuspended: typeof portalSuspended;
declare const messages_replicationStart: typeof replicationStart;
declare namespace messages {
  export { messages_AuthenticationMD5Password as AuthenticationMD5Password, messages_BackendKeyDataMessage as BackendKeyDataMessage, type messages_BackendMessage as BackendMessage, messages_CommandCompleteMessage as CommandCompleteMessage, messages_CopyDataMessage as CopyDataMessage, messages_CopyResponse as CopyResponse, messages_DataRowMessage as DataRowMessage, messages_DatabaseError as DatabaseError, messages_Field as Field, type messages_MessageName as MessageName, type messages_Mode as Mode, messages_NoticeMessage as NoticeMessage, messages_NotificationResponseMessage as NotificationResponseMessage, messages_ParameterDescriptionMessage as ParameterDescriptionMessage, messages_ParameterStatusMessage as ParameterStatusMessage, messages_ReadyForQueryMessage as ReadyForQueryMessage, messages_RowDescriptionMessage as RowDescriptionMessage, messages_bindComplete as bindComplete, messages_closeComplete as closeComplete, messages_copyDone as copyDone, messages_emptyQuery as emptyQuery, messages_noData as noData, messages_parseComplete as parseComplete, messages_portalSuspended as portalSuspended, messages_replicationStart as replicationStart };
}

type FilesystemType = "nodefs" | "idbfs" | "memoryfs";
type DebugLevel = 0 | 1 | 2 | 3 | 4 | 5;
type RowMode = "array" | "object";
interface ParserOptions {
    [pgType: number]: (value: string) => any;
}
interface QueryOptions {
    rowMode?: RowMode;
    parsers?: ParserOptions;
    blob?: Blob | File;
}
interface ExecProtocolOptions {
    syncToFs?: boolean;
}
interface ExtensionSetupResult {
    emscriptenOpts?: any;
    namespaceObj?: any;
    bundlePath?: URL;
    init?: () => Promise<void>;
    close?: () => Promise<void>;
}
type ExtensionSetup = (pg: PGliteInterface, emscriptenOpts: any) => Promise<ExtensionSetupResult>;
interface Extension {
    name: string;
    setup: ExtensionSetup;
}
type Extensions = {
    [namespace: string]: Extension | URL;
};
interface PGliteOptions {
    dataDir?: string;
    fs?: Filesystem;
    debug?: DebugLevel;
    relaxedDurability?: boolean;
    extensions?: Extensions;
}
type PGliteInterface = {
    readonly waitReady: Promise<void>;
    readonly debug: DebugLevel;
    readonly ready: boolean;
    readonly closed: boolean;
    close(): Promise<void>;
    query<T>(query: string, params?: any[], options?: QueryOptions): Promise<Results<T>>;
    exec(query: string, options?: QueryOptions): Promise<Array<Results>>;
    transaction<T>(callback: (tx: Transaction) => Promise<T>): Promise<T | undefined>;
    execProtocol(message: Uint8Array, options?: ExecProtocolOptions): Promise<Array<[BackendMessage, Uint8Array]>>;
    listen(channel: string, callback: (payload: string) => void): Promise<() => Promise<void>>;
    unlisten(channel: string, callback?: (payload: string) => void): Promise<void>;
    onNotification(callback: (channel: string, payload: string) => void): () => void;
    offNotification(callback: (channel: string, payload: string) => void): void;
};
type PGliteInterfaceExtensions<E> = E extends Extensions ? {
    [K in keyof E]: E[K] extends Extension ? Awaited<ReturnType<E[K]["setup"]>>["namespaceObj"] extends infer N ? N extends undefined | null | void ? never : N : never : never;
} : {};
type Row<T = {
    [key: string]: any;
}> = T;
type Results<T = {
    [key: string]: any;
}> = {
    rows: Row<T>[];
    affectedRows?: number;
    fields: {
        name: string;
        dataTypeID: number;
    }[];
    blob?: Blob;
};
interface Transaction {
    query<T>(query: string, params?: any[], options?: QueryOptions): Promise<Results<T>>;
    exec(query: string, options?: QueryOptions): Promise<Array<Results>>;
    rollback(): Promise<void>;
    get closed(): boolean;
}

export { type BackendMessage as B, type DebugLevel as D, type ExecProtocolOptions as E, type Filesystem as F, type PGliteInterface as P, type QueryOptions as Q, type Results as R, type Transaction as T, type PGliteOptions as a, type PGliteInterfaceExtensions as b, type ParserOptions as c, type FilesystemType as d, type RowMode as e, type ExtensionSetupResult as f, type ExtensionSetup as g, type Extension as h, type Extensions as i, type Row as j, messages as m };
