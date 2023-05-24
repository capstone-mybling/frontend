/**
 * Model User
 *
 */
export type User = {
  id: number;
  address: string;
  username: string | null;
  avatar: string | null;
  description: string | null;
  isApproved: boolean;
  lastLoginIP: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

/**
 * Model UserFollow
 *
 */
export type UserFollow = {
  userId: number;
  followUserId: number;
};

/**
 * Model UserLog
 *
 */
export type UserLog = {
  id: number;
  userId: number;
  ip: string;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

/**
 * Model Storage
 *
 */
export type Storage = {
  id: number;
  contractAddress: string | null;
  name: string;
  hash: string;
  saveType: StorageType;
  fileType: FileType;
  size: number;
  url: string | null;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

/**
 * Model Contract
 *
 */
export type Contract = {
  id: number;
  authorAddress: string;
  hash: string;
  mintId: number;
  itemId: number;
  fromAddress: string;
  toAddress: string;
  createdAt: Date;
};

/**
 * Model Post
 *
 */
export type Post = {
  id: number;
  address: string;
  authorAddress: string;
  contractAddress: string;
  name: string;
  description: string;
  thumbnail: string;
  price: number;
  count: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

/**
 * Model PostLike
 *
 */
export type PostLike = {
  postAddress: string;
  userId: number;
};

/**
 * Model PostComment
 *
 */
export type PostComment = {
  id: number;
  postAddress: string;
  authorAddress: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

/**
 * Model PostCommentLike
 *
 */
export type PostCommentLike = {
  commentId: number;
  userAddress: string;
};

/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export enum FileTypeEnum {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  METADATA = "METADATA",
}

export type FileType = (typeof FileTypeEnum)[keyof typeof FileTypeEnum];

export enum StorageTypeEnum {
  LOCAL = "LOCAL",
  S3 = "S3",
  IPFS = "IPFS",
}

export type StorageType = (typeof StorageTypeEnum)[keyof typeof StorageTypeEnum];
