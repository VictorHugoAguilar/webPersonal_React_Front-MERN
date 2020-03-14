import React from 'react';

import { ReactComponent as YouTubeIcon } from '../../../assets/img/svg/youtube.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/img/svg/twitter.svg';
import { ReactComponent as LinkendinIcon } from '../../../assets/img/svg/in.svg';


import './SocialLinks.scss';


export default function SocialLinks() {

    return (
        <div className="social-links">

            <a href="https://www.linkedin.com/in/victor-hugo-aguilar-aguilar-7620b6198/"
                className="linkedin"
                target="_blank"
                rel="noopener noreferrer"
            >
                <LinkendinIcon />
            </a>

            <a href="https://www.youtube.es"
                className="youtube"
                target="_blank"
                rel="noopener noreferrer"
            >
                <YouTubeIcon />
            </a>

            <a href="https://twitter.com/_victor__hugo_"
                className="twitter"
                target="_blank"
                rel="noopener noreferrer"
            >
                <TwitterIcon />
            </a>

        </div>
    );

}