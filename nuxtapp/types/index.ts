import { DocumentData } from "firebase/firestore";

const objectEmpty = {};

export type OrNull<T> = T | null;
export type OrNoValue<T> = T | null | undefined;
export type OneOrMany<T> = T | T[];
export type OneOrManyOrNull<T> = OrNull<OneOrMany<T>>;
export type CallbackAny = (...args: any[]) => any;
export type ScalarAny = string | number | symbol;
export type TPrimitive = ScalarAny;
export type Flatten<T> = T extends Array<infer Item> ? Item : T;
export type GetReturnType<T> = T extends (...args: never[]) => infer R
  ? R
  : never;
export type OptionsFlags<T> = {
  [K in keyof T]: boolean;
};
export type CreateMutable<T> = {
  -readonly [K in keyof T]: T[K];
};
export type CreateRequired<T> = {
  [K in keyof T]-?: T[K];
};
export type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
export type WithouFieldId<T> = {
  [K in keyof T as Exclude<K, "id">]: T[K];
};
export type ObjectEmpty = typeof objectEmpty;

export interface IData {
  [key: ScalarAny]: any;
}

export interface IAppEvent<T = any> {
  type: string;
  payload?: T;
}

// @@auth
export interface IUser {
  id: string;
  email: string;
}
export interface IToken {
  accessToken: string;
  refreshToken?: string;
  sessionToken?: string;
}
export interface IAuthCredentials {
  email: string;
  password: string;
}

export type TVariableValue = OrNull<TPrimitive>;
export interface IVariable {
  id: TPrimitive;
  name: string;
  value: TVariableValue;
  createdAt: string;
  updatedAt: string;
}

export interface IMessage {
  __typename?: string;
  id: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IStorageFile {
  __typename?: string;
  id: string;
  fileID: string;
  user_id: string;
  title?: string;
  description?: string;
  filename: string;
  path: string;
  size?: number;
  mimetype?: string;
  meta?: string;
  public: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface IFileToUpload {
  name: string;
  file: any;
  title?: OrNoValue<string>;
  description?: OrNoValue<string>;
}

export interface IComment {
  __typename?: string;
  id: string;
  topicID: string;
  userId?: string;
  userName?: string;
  value: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface ICommentInput {
  value: string;
  userId?: string;
  userName?: string;
}

export interface IFlags {
  [key: string]: boolean;
}

export interface IFormData {
  [key: string]: OrNoValue<string | number>;
}

export interface IAppStreamEvent {
  type: string;
  [key: TPrimitive]: any;
}

export interface IDataChartBarVertical<TKey = string, TValue = number> {
  key: TKey;
  value: TValue;
  [index: string]: any;
}

export interface IValueNumber {
  value: number;
}
export interface IHasValueNumber extends IValueNumber {
  [name: TPrimitive]: any;
}

export interface ILightboxImage {
  src: string;
  title?: string;
  alt?: string;
}

export interface IDataChartLine<TKey = number, TValue = number> {
  key: TKey;
  value: TValue;
  [name: TPrimitive]: any;
}

export type TFirebaseDoc = { id: string } & DocumentData;

export interface IIncrementFields {
  [field: string]: number;
}

export interface IDefaultDoc {
  (): DocumentData | Promise<DocumentData>;
}

export interface IEventsUseOn<TEvent = any> {
  target: any;
  [type: string]: (...e: TEvent[]) => void;
}

export interface IDataChartPie<TKey = string, TValue = number> {
  key: TKey;
  value: TValue;
  [field: string]: any;
}

export interface IDoc {
  __typename?: string;
  id: string;
  userId: string;
  data: string | IData;
  docId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUseApiCollectionFormatDocData<
  TData = IDoc[],
  TDataFormated = IDoc[]
> {
  (d: TData): TDataFormated;
}

export interface IUseApiDocFormatData<TData = IDoc, TDataFormated = IDoc> {
  (d: TData): TDataFormated;
}

export interface IInputDoc {
  data: IData;
  // tag: string;
  id?: string;
  docId?: string;
}

export interface IDefaultUseApiDocData<T = IData> {
  (): T | Promise<T>;
}

export interface IDataChartPlot<TKey = string, TValue = number> {
  key: TKey;
  value: TValue;
  [field: string]: any;
}

export interface IDataChartBarHorizontal<TKey = string, TValue = number> {
  key: TKey;
  value: TValue;
  [index: string]: any;
}

export interface IEffectClasses {
  [index: string]: boolean;
}

export type TEffectOnEnd = (...args: any[]) => void;

export interface IStoreMain {
  [key: TPrimitive]: any;
}
export type TStoreMainPutCallback = (currentStore: IStoreMain) => IStoreMain;

export type TFirebaseStorageNode<T = any> = T;

export type TPubSubPublisherFn = <TPayload = any>(
  event: IAppEvent<TPayload>
) => void;
export type TPubSubHandleEvent = (handle: (event: IAppEvent) => void) => void;

export interface ITransitionNames {
  [name: string]: string;
}
