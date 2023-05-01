import {createClient} from '@redis/client';

const client = createClient();

client.connect();

export async function follow(userId: number, followingId: number) {
    await client.sAdd(`user:${userId}:following`, followingId);
    await client.sAdd(`user:${followingId}:followers`, userId);
}

export async function unfollow(userId: number, followingId: number) {
    await client.sRem(`user:${userId}:following`, followingId);
    await client.sRem(`user:${followingId}:followers`, userId);
}

export async function getFollowers(userId: number) {
    return await client.sMembers(`user:${userId}:followers`);
}

export async function getFollowing(userId: number) {
    return await client.sMembers(`user:${userId}:following`);
}