// @ts-nocheck
import React, { FC, useEffect, useState } from 'react';
import Pagination from 'react-paginate';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { withRouter } from 'next/router';

import { DropLet } from '.';

const Followers: FC = () => {
  let followers = [];
  const [loading, setLoading] = useState(true);

  if (typeof window !== 'undefined') {
    followers = JSON.parse(localStorage.getItem('followers'));
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

  const followersOnCurrentPage = followers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) {
    return <DropLet />;
  }

  return (
    <div className="following">
      <div className="table">
        <h2>Followers</h2>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Avatar</th>
              <th>Username</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <Pagination
          pageCount={Math.ceil(followers.length / pageSize)}
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
    </div>
  );
};

export default withRouter(Followers);
