import { StatusCodes } from "http-status-codes";

import type { LinkType } from "../types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getOnePost = async (
  slug: any
): Promise<LinkType[] | { notFound: true }> => {
  const res = await fetch(`${API_URL}/links/${slug}`);
  const data: any = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  return data;
};

export const getAllPosts = async (
  _no?: string[] | undefined
): Promise<(LinkType[] | any)[]> => {
  try {
    const res = await fetch(`${API_URL}/links/`);
    const dataArray: any[] = await res.json();

    if (!dataArray) {
      return [null, { notFound: true }];
    }

    return [dataArray, null];
  } catch (e) {
    console.log(e);
    return [[], { notFound: true }];
  }
};

export const getAllStats = async (
  _no?: string[] | undefined
): Promise<(LinkType[] | any)[]> => {
  const res = await fetch(`${API_URL}/stats/`);
  const dataArray: any[] = await res.json();

  if (!dataArray) {
    return [null, { notFound: true }];
  }

  return [dataArray, null];
};

export const putLink = async (
  id: any,
  lynkPayload: any
): Promise<(LinkType[] | any)[]> => {
  const res = await fetch(`${API_URL}/links/${id}`, {
    body: lynkPayload,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
  const newLink = await res.json();

  if (!newLink) {
    return [null, { notFound: true }];
  }

  return [newLink, null];
};

export const postLink = async (
  lynkPayload: any
): Promise<(LinkType[] | any)[]> => {
  const res = await fetch(`${API_URL}/links/`, {
    body: lynkPayload,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  const newLink = await res.json();

  if (!newLink) {
    return [null, { notFound: true }];
  }

  return [newLink, null];
};

export const deleteLink = async (id: string) => {
  const res = await fetch(`${API_URL}/links/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });
  if (res.status != StatusCodes.OK) {
    return [{}, { notFound: true }];
  }
  return [true, null];
};

export const getPostAndMorePosts = async (slug: string) => {
  const post = await getOnePost(slug);
  const [data] = await getAllPosts();
  const endData = data.slice(0, 2);
  return [post, endData];
};

export async function getAllPostsWithSlug(): Promise<LinkType[]> {
  const [data]: any[] = await getAllPosts();
  return data;
}
