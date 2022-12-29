// @ts-nocheck
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  GrAdd,
  GrClose,
  GrFormClock,
  GrGithub,
  GrLinkedin,
  GrLocation,
  GrTwitter,
} from 'react-icons/gr';
import { format } from 'date-fns';
import ReactCountryFlag from 'react-country-flag';
import '/node_modules/flag-icons/css/flag-icons.min.css';

import {
  capitalCode,
  countryCode,
  extractCityState,
  getElapsedTime,
  thousandSeparator,
  trimExtraSpaces,
} from '../utils';
import jquery from 'jquery';
const $: JQueryStatic = jquery;

const Profile = profile => {
  const {
    name,
    avatar_url,
    login,
    followers,
    following,
    bio,
    location,
    twitter_username,
    blog,
    company,
    created_at,
    updated_at,
    public_repos,
  } = profile;
  const { city, state } = extractCityState(location);

  const colors = [
    '#004d7a',
    '#008793',
    '#00bf72',
    '#a8eb12',
    '#d16ba5',
    '#c777b9',
    '#ba83ca',
    '#aa8fd8',
    '#9a9ae1',
    '#8aa7ec',
    '#79b3f4',
    '#69bff8',
    '#52cffe',
    '#41dfff',
    '#46eefa',
    '#5ffbf1',
  ];
  const [value, setValue] = useState(0);

  const changeColor = () => {
    const random = Math.floor(Math.random() * colors.length);
    setValue(random);
    const color = colors[value];
    $('#wave').css('background', color);
    $('#wave2').css('background', color);
    $('#addBtn path').css('stroke', color);
    $('#closeBtn path').css('stroke', color);
  };

  useEffect(() => {
    $(() => {
      $(document).ready(function () {
        $('#viewMore').click(function () {
          $('#info').animate({ top: '480px' });
          $('#profileBio').animate({ top: '0px' });
          $('#image').animate({ left: '250px' });
          $('#userInfo').animate({ left: '0px' });
        });
        $('#close').click(function () {
          $('#info').animate({ top: '328px' });
          $('#profileBio').animate({ top: '-160px' });
          $('#image').animate({ left: '0px' });
          $('#userInfo').animate({ left: '-250px' });
        });
      });
    });
  }, []);

  return (
    <div id="profile" onAnimationIteration={changeColor}>
      <div id="image">
        <Image
          src={avatar_url || '/default.png'}
          alt={login}
          height={100}
          width={100}
        />
        <div id="wave"></div>
        <div id="wave2"></div>
      </div>
      <div id="info">
        <div id="viewMore">
          <GrAdd id="addBtn" />
        </div>
        <div id="name">{trimExtraSpaces(name)}</div>
        {location && (
          <div id="location">
            <GrLocation />
            <span>{location}</span>
          </div>
        )}
        {created_at && (
          <div id="date">
            <GrFormClock />
            <span>{format(new Date(created_at), 'MMM dd, yyyy')}</span>
          </div>
        )}
        <div id="social">
          {blog && (
            <a href={`${blog}`} target="_blank" rel="noopener noreferrer">
              <GrLinkedin id="linkedin" />
            </a>
          )}
          {login && (
            <a
              href={`https://github.com/${login}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GrGithub id="github" />
            </a>
          )}
          {twitter_username && (
            <a
              href={`https://twitter.com/${twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GrTwitter id="twitter" />
            </a>
          )}
        </div>
      </div>
      <div id="profileBio">
        {bio && (
          <>
            <h2>Bio</h2>
            <p className="line-clamp">{trimExtraSpaces(bio)}</p>
          </>
        )}
        <div id="close">
          <GrClose id="closeBtn" width="30%" />
        </div>
      </div>
      <div id="userInfo">
        <h2>Info</h2>
        <div id="panels">
          {created_at && (
            <div id="panel1">
              <p>Joined: {getElapsedTime(created_at)} ago.</p>
              <hr />
            </div>
          )}
          {updated_at && (
            <div id="panel2">
              <p>Updated: {getElapsedTime(updated_at)} ago.</p>
              <hr />
            </div>
          )}
          {followers && (
            <div id="panel3">
              <p>Followers: {thousandSeparator(followers)}</p>
              <hr />
            </div>
          )}
          {following && (
            <div id="panel4">
              <p>Following: {thousandSeparator(following)}</p>
              <hr />
            </div>
          )}
          {public_repos && (
            <div id="panel5">
              <p>Public repos: {thousandSeparator(public_repos)}</p>
              <hr />
            </div>
          )}
          {company && (
            <div id="panel6">
              <p>Company: {trimExtraSpaces(company)}</p>
              <hr />
            </div>
          )}
          {city && (
            <div id="panel7">
              <p>City: {trimExtraSpaces(city)}</p>
              <hr />
            </div>
          )}
          {(state || city) && (
            <div id="panel7">
              <p>
                State: {trimExtraSpaces(state)}
                <ReactCountryFlag
                  className="flag-icon"
                  countryCode={
                    countryCode(state).toLowerCase() ||
                    capitalCode(city).toLowerCase()
                  }
                  width={50}
                  height={20}
                />
              </p>
              <hr />
            </div>
          )}
          {(state || city) && (
            <div id="panel8">
              <p>
                Flag:
                <span
                  className={`flag-icon fi fi-${
                    countryCode(state).toLowerCase() ||
                    capitalCode(city).toLowerCase()
                  }`}
                ></span>
              </p>
              <hr />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
