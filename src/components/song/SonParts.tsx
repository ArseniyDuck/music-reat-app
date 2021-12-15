import { RouteLinks } from "app-routing";
import { AuthRequired, Dropdown } from "components/common";
import { Heart } from "icons";
import { Link } from "react-router-dom";
import { conditionClassName } from "tools/functions";
import s from './Song.module.scss';

export const SongRowIndex: React.FC<{index: number, hideIndex?: boolean}> = ({ hideIndex=true, index }) => {
   return (
      <p className={conditionClassName(s.songNumber, hideIndex, s.hideIndex)}>{index}</p>
   );
}

export const SongRowPhoto: React.FC<{photo: string, isShownOnDesktop: boolean}> = (props) => {
   return <>{
      props.isShownOnDesktop && 
      <div className={`${s.photo} ibg`}>
         <img src={props.photo} alt='album' />
      </div>
   }</>;
}

export const SongRowNames: React.FC<{songName: string, singerName: string, singerId: number}> = (props) => {
   return (
      <div className={`${s.songNamesWrapper} cropTextContainer`}>
         <h3 className={`${s.songName} ellipseOverflow`}>{props.songName}</h3>
         <Link to={`/singer/${props.singerId}`} className={s.songLink}>{props.singerName}</Link>
      </div>
   );
}

export const SongRowAlbumLink: React.FC<{id: number, name?: string}> = (props) => {
   return <>{
      props.name && 
      <div className={s.songLink+' '+s.albumLink}>
         <Link to={RouteLinks.ALBUM+'/'+props.id}>
            {props.name}
         </Link>
      </div>
   }</>
}

export const SongRowLikeButton: React.FC<{onClick: () => void, isLiked: boolean, isShown: boolean}> = (props) => {
   return <>{
      props.isShown && (
         <AuthRequired>
            <button
               onClick={props.onClick}
               onFocus={(e) => e.target.blur()}
               className={conditionClassName(s.likeSongButton, props.isLiked, s.liked)}
            >
               <Heart isLiked={props.isLiked} color='pink' />
            </button>
         </AuthRequired>
      )
   }</>;
}

export const SongRowDuration: React.FC<{duration: string}> = (props) => {
   return (
      <p className={s.songDuration}>{props.duration}</p>
   );
}

export const DropdownAction: React.FC<{requires: boolean}> = (props) => {
   return (
      <AuthRequired>{
         props.requires && (
            <Dropdown.Item>
               {props.children}
            </Dropdown.Item>
         )
      }</AuthRequired>
   );
}