export type HostId = string & { readonly __tag: unique symbol };
export type KernelId = string & { readonly __tag: unique symbol };
export type SessionId = string & { readonly __tag: unique symbol };
export type CellId = string & { readonly __tag: unique symbol };

export const castToHostId = (id: string): HostId => id as HostId;
export const castToKernelId = (id: string): KernelId => id as KernelId;
export const castToSessionId = (id: string): SessionId => id as SessionId;
export const castToCellId = (id: string): CellId => id as CellId;
