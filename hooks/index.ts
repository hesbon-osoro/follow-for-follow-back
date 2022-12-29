//@ts-nocheck
import { useState, useEffect } from 'react';
import { User } from '../types';

async function fetchUsers(
  username: string,
  type: 'followers' | 'following',
  page = 1
) {
  const response = await fetch(
    `https://api.github.com/users/${username}/${type}?per_page=100&page=${page}`
  );
  return response.json();
}

export const useUsername = () => {
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      setUsername(
        JSON.parse(window.localStorage.getItem('username')) || 'hesbon-osoro'
      );
    } else {
      setUsername('hesbon-osoro');
    }
  }, []);

  const setUsernameInLocalStorage = (newUsername: string) => {
    setUsername(newUsername);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('username', newUsername);
    }
  };

  return [username, setUsernameInLocalStorage] as const;
};

async function fetchAllUsers(
  username: string,
  type: 'followers' | 'following'
) {
  let users: User[] = [];
  let page = 1;
  let morePages = true;

  while (morePages) {
    const res = await fetchUsers(username, type, page);
    if (res.length === 0) {
      morePages = false;
      break;
    }
    users = [...users, ...res];
    page += 1;
  }

  return users;
}

export async function fetchAndStoreUsers(username: string) {
  const followers = await fetchAllUsers(username, 'followers');
  localStorage.setItem('followers', JSON.stringify(followers));

  const following = await fetchAllUsers(username, 'following');
  localStorage.setItem('following', JSON.stringify(following));
}
