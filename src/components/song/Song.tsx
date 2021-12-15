import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addSongToPlaylist, removeSongFromLiked,
         removeSongFromPlaylist, toggleSongLikeById } from 'redux/songs-reducer';
import { RouteLinks } from 'app-routing';
import { useAppDispatch, useAppSelector } from 'tools/hooks';
import s from './Song.module.scss';
import { MediaQuery, Dropdown } from 'components/common';
import MobileSongPullOut from '../mobile-song-pull-out/MobileSongPullOut';
import { DropdownAction, SongRowAlbumLink, SongRowDuration,
         SongRowIndex, SongRowLikeButton, SongRowNames, SongRowPhoto } from './SonParts';
import { Dots } from 'icons';


type PropsType = {
   id: number
   index: { number: number, hideIndex?: boolean }
   photo: { path: string, isShownOnDesktop: boolean }
   name: string
   singer: { id: number, name: string }
   album: { id: number, name?: string }
   isLiked: boolean
   duration: string
   audio: string
   songActions?: SongActionsType
};

const Song: React.FC<PropsType> = (props) => {
   const dispatch = useAppDispatch();
   const playlists = useAppSelector(state => state.playlists.smallPlaylists.playlists);
   const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

   const onLikeToggleClick = () => {
      if (props.songActions?.toggleSongLike) {
         dispatch(toggleSongLikeById(props.id));
      }
   };

   const onRemoveClick = () => {
      if (props.songActions?.removeSongFromPlaylist) {
         dispatch(removeSongFromPlaylist({
            songId: props.id,
            playlistId: props.songActions?.removeSongFromPlaylist.playlistId
         }));
      }
   }

   const onRemoveFromLikedClick = () => {
      if (props.songActions?.removeSongFromLiked) {
         dispatch(removeSongFromLiked(props.id))
      }
   };

   const addSongInSelectedPlaylist = (playlistId: number) => {
      if (props.songActions?.addSongToPlaylist) {
         dispatch(addSongToPlaylist({ songId: props.id, playlistId }));
      }
   };

   const hideMobileMenu = () => {
      document.body.classList.remove('_disable-scroll');
      setIsMobileMenuOpened(false);
   };

   const onMobileDotsClick = () => {
      document.body.classList.toggle('_disable-scroll');
      setIsMobileMenuOpened(prev => !prev);
   };

   return (
      <div className={s.song}>
         <SongRowIndex index={props.index.number} hideIndex={props.index.hideIndex} />
         <SongRowPhoto
            photo={props.photo.path}
            isShownOnDesktop={props.photo.isShownOnDesktop}
            // if 'isShownOnDesktop' is passed as true, photo'll be shown
         />
         <SongRowNames
            songName={props.name}
            singerName={props.singer.name}
            singerId={props.singer.id}
            // 'singerId' is required for link to a singer
         />
         <SongRowAlbumLink
            id={props.album.id}
            name={props.album.name}
            // if 'name' is passed, link'll be shown
         />
         <SongRowLikeButton
            onClick={onLikeToggleClick}
            isLiked={props.isLiked}
            isShown={!!props.songActions?.toggleSongLike}
         />
         <SongRowDuration duration={props.duration} />

         {/* Dots on desktop */}
         <MediaQuery mode='min-width' width='sm'>
            <Dropdown
               initialPosition='top'
               trackVerticalPosition={true}
               LabelComponent={() => <Dots size={25} />}
               event='focus'
            >
               <Dropdown.Item>
                  <Link className={s.dropDownLink} to={`${RouteLinks.SINGER}/${props.singer.id}`}>
                     Go to artist
                  </Link>
               </Dropdown.Item>
               <Dropdown.Item>
                  <Link className={s.dropDownLink} to={`${RouteLinks.ALBUM}/${props.album.id}`}>
                     Go to album
                  </Link>
               </Dropdown.Item>
               <DropdownAction requires={!!props.songActions?.removeSongFromPlaylist}>
                  <button onClick={onRemoveClick} className={s.dropDownButton}>
                     Remove song
                  </button>
               </DropdownAction>
               <DropdownAction requires={!!props.songActions?.addSongToPlaylist}>
                  <Dropdown
                     initialPosition='bottom'
                     isOverflow={true}
                     trackVerticalPosition={true}
                     LabelComponent={() => <span className={s.playListsLabel}>Add to playlist</span>}
                     event='hover'
                  >
                     {playlists.map(playlist => (
                        <Dropdown.Item key={playlist.id}>
                           <button onClick={() => addSongInSelectedPlaylist(playlist.id)} className={s.dropDownButtonPlayList}>
                              {playlist.name}
                           </button>
                        </Dropdown.Item>
                     ))}
                  </Dropdown>
               </DropdownAction>
               <DropdownAction requires={!!props.songActions?.toggleSongLike}>
                  <button onClick={onLikeToggleClick} className={s.dropDownButton}>
                     {props.isLiked ? 'Dislike song' : 'Like song'}
                  </button>
               </DropdownAction>
               <DropdownAction requires={!!props.songActions?.removeSongFromLiked}>
                  <button className={s.dropDownButton} onClick={onRemoveFromLikedClick}>
                     Remove from Liked Songs
                  </button>
               </DropdownAction>
            </Dropdown>
         </MediaQuery>

         {/* Dots on mobile */}
         <MediaQuery mode='max-width' width='sm'>
            <button onClick={onMobileDotsClick}>
               <Dots size={25} />
            </button>
            <MobileSongPullOut
               id={props.id}
               songName={props.name}
               singerName={props.singer.name}
               duration={props.duration}
               photo={props.photo.path}
               singerId={props.singer.id}
               isLiked={props.isLiked}
               albumId={props.album.id}
               isOpened={isMobileMenuOpened}
               hide={hideMobileMenu}
               songActions={{
                  toggleSongLike:
                     props.songActions?.toggleSongLike ? onLikeToggleClick : undefined,
                  removeSong:
                     props.songActions?.removeSongFromPlaylist ? onRemoveClick : undefined,
                  removeSongFromLiked:
                     props.songActions?.removeSongFromLiked ? onRemoveFromLikedClick : undefined,
                  addSongToPlaylist:
                     props.songActions?.addSongToPlaylist ? addSongInSelectedPlaylist : undefined,
               }}
            />
         </MediaQuery>
      </div>
   );
};

export default Song;