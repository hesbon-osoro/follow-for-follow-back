// @ts-nocheck
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  GrAdd,
  GrClock,
  GrClose,
  GrFormClock,
  GrGithub,
  GrLinkedin,
  GrLocation,
  GrTwitter,
} from 'react-icons/gr';
import { format } from 'date-fns';
import { getElapsedTime } from '../utils/getElapsedTime';
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
  } = profile;

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
  };

  useEffect(() => {
    $(() => {
      $(document).ready(function () {
        $('#viewMore').click(function () {
          $('#info').animate({ top: '480px' });
          $('#profileBio').animate({ top: '0px' });
          $('#image').animate({ left: '250px' });
          $('#project').animate({ left: '0px' });
        });
        $('#close').click(function () {
          $('#info').animate({ top: '328px' });
          $('#profileBio').animate({ top: '-160px' });
          $('#image').animate({ left: '0px' });
          $('#project').animate({ left: '-250px' });
        });
      });
    });
  }, []);

  return (
    <div id="profile" onAnimationIteration={changeColor}>
      <div id="image">
        <Image src={avatar_url} alt={login} height={100} width={100} />
        <div id="wave"></div>
        <div id="wave2"></div>
      </div>
      <div id="info">
        <div id="viewMore">
          <GrAdd />
        </div>
        <div id="name">{name}</div>
        <div id="location">
          <GrLocation />
          <span>{location}</span>
        </div>
        <div id="date">
          <GrFormClock />
          <span>{format(new Date(created_at), 'MMM dd, yyyy')}</span>
        </div>
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
        <h2>Bio</h2>
        <p>{bio}</p>
        <div id="close">
          <GrClose width="30%" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
