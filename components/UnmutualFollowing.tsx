// @ts-nocheck
import React, { FC, useEffect, useState } from 'react';
import Pagination from 'react-paginate';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

let followers = [];
let following = [];

import DropLet from './DropLet';

const UnmutualFollowing: FC = () => {
  const [loading, setLoading] = useState(true);

  if (typeof window !== 'undefined') {
    followers = JSON.parse(localStorage.getItem('followers'));
    following = JSON.parse(localStorage.getItem('following'));
  }

  const toggleLoading = () => {
    setLoading(!loading);
  };

  useEffect(() => {
    setTimeout(toggleLoading, 1500);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  if (loading) {
    return <DropLet />;
  }

  const unmutualFollowing = following.filter(
    user => !followers.some(follower => follower.id === user.id)
  );

  const followersOnCurrentPage = unmutualFollowing.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <div className="following">
      {unmutualFollowing.length ? (
        <>
          <div className="table">
            <h2>Unmutual Following</h2>
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Avatar</th>
                  <th>Username</th>
                  <th>Unfollow</th>
                </tr>
              </thead>
              <tbody>
                {followersOnCurrentPage.map((follower, index) => (
                  <tr key={follower.id}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>
                      <Image
                        src={follower.avatar_url}
                        width={50}
                        height={50}
                        alt={follower.login}
                      />
                    </td>
                    <td>{follower.login}</td>
                    <td>
                      <a
                        href={follower.html_url}
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        Unfollow
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="buttons">
            <Pagination
              pageCount={Math.ceil(unmutualFollowing.length / pageSize)}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={({ selected }) => setCurrentPage(selected + 1)}
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              activeClassName="active"
              previousLabel={<FaArrowLeft />}
              nextLabel={<FaArrowRight />}
              breakLabel={<span className="dots">...</span>}
              disabledClassName="disabled"
            />
          </div>
        </>
      ) : (
        <div>
          <h2>No Unmutual Following</h2>
        </div>
      )}
    </div>
  );
};

export default UnmutualFollowing;
