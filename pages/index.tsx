// @ts-nocheck
import Image from 'next/image';
import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GrGithub } from 'react-icons/gr';
import {
  DropLet,
  ErrorBoundary,
  Head,
  MenuButton,
  Profile,
  SetUsernameModal,
} from '../components';
import { fetchAndStoreUsers } from '../hooks';
import styles from '../styles/Home.module.css';

function Home({ router }) {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(
    (typeof window !== 'undefined' &&
      JSON.parse(localStorage.getItem('profile'))) ||
      null
  );

  const updateProfileData = newProfileData => {
    setProfileData(newProfileData);
  };

  const fetchDefaultData = async () => {
    const res = await fetch(`https://api.github.com/users/hesbon-osoro`);
    const data = await res.json();
    setProfileData(data);
    localStorage.setItem('profile', JSON.stringify(data));
  };

  useEffect(() => {
    setTimeout(() => {
      if (profileData) setLoading(false);
      else fetchDefaultData();
    }, 3000);
  }, [profileData]);

  profileData && fetchAndStoreUsers(profileData['login']);

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <Head />
        <h1 className={styles.title}>
          Follow For <Image src="/fffb.png" width={50} height={50} alt="" />{' '}
          Follow Back
        </h1>
        <MenuButton location={router.asPath} />
        <SetUsernameModal onUsernameSave={updateProfileData} />
        <main className={styles.main}>
          {loading ? <DropLet /> : <Profile {...profileData} />}
        </main>
        <footer className={styles.footer}>
          <p>
            &copy;{new Date().getFullYear()}
            <a
              href="https://github.com/hesbon-osoro"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.logo}>
                <GrGithub />
              </span>
            </a>
            wazimu
          </p>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default withRouter(Home);
