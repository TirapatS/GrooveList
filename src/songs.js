import id1Img from '../src/assets/images/after_dark.jpg'
import id2Img from '../src/assets/images/Hate_It_or_love_It.jpg'
import id3Img from '../src/assets/images/piece_of_your_heart_meduza.jpg'
import afterDark from '../src/assets/mp3/Mr_Kitty_After_Dark.mp3'
import hateItOrLoveIt from '../src/assets/mp3/Hate_It_Or_Love_It_The_Game.mp3'
import pieceOfYourHeart from '../src/assets/mp3/Meduza_Piece_Of_Your_Heart_ft_Goodboys_.mp3'

export const songs = [
    {
        id: 1,
        name: "After Dark",
        artist: "Mr.Kitty",
        image: id1Img,
        src: afterDark,
    },
    {
        id: 2,
        name: "Hate it Or Love It",
        artist: "The Game",
        image: id2Img,
        src: hateItOrLoveIt
    },
    {
        id:3,
        name: "Piece of Your Heart",
        artist: "Meduza",
        image: id3Img,
        src: pieceOfYourHeart
    }
]
