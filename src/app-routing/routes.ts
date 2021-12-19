import React from 'react';
import { RouteComponentProps, StaticContext } from 'react-router';
import Album from '../pages/album/Album';
import Playlist from '../pages/playlist/Playlist';
import MySongs from '../pages/my-songs/MySongs';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import Search from '../pages/search/Search';
import Albums from '../pages/my-songs/sub-pages/Albums';
import Playlists from '../pages/my-songs/sub-pages/Playlists';
import Singers from '../pages/my-songs/sub-pages/Singers';
import MobileMySongs from '../pages/my-songs/MobileMySongs/MobileMySongs';
import LikedSongs from 'pages/liked-songs/LikedSongs';
import Singer from 'pages/singer/Singer';

export const RouteLinks = {
   SIGN_IN: '/sign-in',
   SIGN_UP: '/sign-up',
   MY_SONGS: '/my-songs',
   ALBUM: '/album',
   PLAYLIST: '/playlist',
   SEARCH: '/search',
   LIKED_SONGS: '/liked',
   SINGER: '/singer',
} as const;

export const NestedRouteLinks = {
   PLAYLISTS: RouteLinks.MY_SONGS + '/playlists',
   ALBUMS: RouteLinks.MY_SONGS + '/albums',
   SINGERS: RouteLinks.MY_SONGS + '/singers',
} as const;

export type RouteType = {
   path:
      typeof RouteLinks[keyof typeof RouteLinks] |
      typeof NestedRouteLinks[keyof typeof NestedRouteLinks]
   component:
      React.ComponentType<RouteComponentProps<any, StaticContext, unknown>> |
      React.ComponentType<any>
   parameter?: string
   exact?: boolean
}

export const Routes: RouteType[] = [
   { path: RouteLinks.ALBUM, component: Album, parameter: '/:albumId', exact: true },
   { path: RouteLinks.SINGER, component: Singer, parameter: '/:singerId', exact: true },
   { path: RouteLinks.PLAYLIST, component: Playlist, parameter: '/:playlistId', exact: true },
   { path: RouteLinks.MY_SONGS, component: MySongs },
   { path: RouteLinks.SIGN_IN, component: SignIn, exact: true },
   { path: RouteLinks.SIGN_UP, component: SignUp, exact: true },
   { path: RouteLinks.SEARCH, component: Search, exact: true },
   { path: RouteLinks.LIKED_SONGS, component: LikedSongs, exact: true },
];

export const NestedRoutes: RouteType[] = [
   { path: RouteLinks.MY_SONGS, component: MobileMySongs, exact: true },
   { path: NestedRouteLinks.PLAYLISTS, component: Playlists, exact: true },
   { path: NestedRouteLinks.ALBUMS, component: Albums, exact: true },
   { path: NestedRouteLinks.SINGERS, component: Singers, exact: true },
];