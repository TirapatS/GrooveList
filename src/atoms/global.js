import { atom } from "recoil";

let width = (window.innerWidth > 0) ? window.innerWidth : screen.width

export const deviceWidthState = atom({
    key: 'DeviceWidth',
    default: width
});

export const selectedTrackState = atom({
    key: 'SelectedTrack',
    default: []
})

export const selectedCategoryState = atom({
    key: 'SelectedCategory',
    default: ''
})

export const selectedPlaylistState = atom({
    key: 'SelectedPlaylist',
    default: ''
})