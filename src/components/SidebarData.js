import React from 'react';
import * as AiIcons from 'react-icons/ai';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Module Info',
    path: '/ModInfo',
    icon: <AiIcons.AiOutlineQuestionCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Mod Suggestions',
    path: '/ModSuggest',
    icon: <AiIcons.AiOutlineBulb />,
    cName: 'nav-text'
  },
  {
    title: 'About',
    path: '/about',
    icon: <AiIcons.AiOutlineInfoCircle />,
    cName: 'nav-text'
  }
];