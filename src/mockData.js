import { faker } from '@faker-js/faker';

import { v4 as uuidv4 } from 'uuid';

const minSize = 1;
const maxSize = 7;


const audioFileTypes = ['wav', 'mp3', 'aac', 'flac', 'alac', 'dsd']

// const createFile = () => {
//     const file = {
//         id: uuidv4(),
//         name: faker.random.words(),
//         path: faker.system.filePath(),
//         type: faker.system.fileExt(),
//         comment: faker.lorem.text(),
//         category: '',
//         playlists: [],
//         imgName: '',
//         imgPath: '',
//     }

//     return file;
// }

// const files = [];

// const data = () => {
//     const numFiles = 100;
    
//     for(let i = 0 ; i > numFiles ; i++){
//         files.push(createFile());
//     }
    
//     return files;
// }

// files.forEach(file => {
//     audioFileTypes.map(audioType => {
//         if(file.type === audioType){
//             return (
//                 {...file,
//                 artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
//                 title: faker.music.songName(),
//                 genre: faker.music.genre()
//                 }
//             )
//         }
//     })
// })


//AUDIO FILES

const createAudioItem = () => {
    const fileType = audioFileTypes[Math.floor(Math.random() * 4)];
    const artist = `${faker.name.firstName()} ${faker.name.lastName()}`;
    const title = faker.music.songName();
    const genre = faker.music.genre();
    const size = Math.floor(Math.random()*(maxSize-minSize+1)+minSize)

    const audioItem = {
        id: uuidv4(),
        title,
        artist,
        genre,
        fileType,
        size,
        path: `D:/media/audio/${genre.toLowerCase()}/${artist[0].toLowerCase}/${artist.replaceAll(' ', '-')}_${title.replaceAll(' ', '-')}.${fileType}`
    }

    return audioItem;
}

//IMAGES
const imageFileTypes = ['jpg','png','bmp']

const createImageItem = () => {
    const fileType = imageFileTypes[Math.floor(Math.random() * 3)];
    const img = faker.image.image(640, 480, true);
    const name = faker.random.words();
    const size = Math.floor(Math.random()*(maxSize-minSize+1)+minSize)

    const imageItem = {
        id: uuidv4(),
        img,
        name,
        fileType,
        size,
        path: `D:/media/images/${name.replaceAll(' ', '-')}.${fileType}`
    }

    return imageItem;
}

//DOCUMENTS
const docFileTypes = ['pdf', 'doc', 'html', 'txt']

const createDocItem = () => {
    const fileType = docFileTypes[Math.floor(Math.random() * 4)];
    const title = faker.random.words();
    const size = Math.floor(Math.random()*(maxSize-minSize+1)+minSize)

    const docItem = {
        id: uuidv4(),
        title,
        fileType,
        size,
        path: `D:/media/documents/${title.replaceAll(' ', '-')}`
    }

    return docItem;
}

//VIDEOS
const videoFileTypes = ['aac', 'mp4', 'wav', 'avi'];
const minDuration = 1;
const maxDuration = 10;

const createVideoItem = () => {
    const fileType = videoFileTypes[Math.floor(Math.random() * 4)];
    const title = faker.random.words();
    const img = faker.image.image(640, 480, true);
    const size = Math.floor(Math.random()*(maxSize-minSize+1)+minSize);
    const duration = Math.floor(Math.random()*(maxDuration-minDuration+1)+minDuration);

    const videoItem = {
        id: uuidv4(),
        title,
        img,
        fileType,
        size,
        duration,
        path: `D:/media/videos/${title.replaceAll(' ', '-')}`
    }

    return videoItem;
}

const data = () => {
    const itemCount = 25;
    const audioItems = [];
    const imageItems = [];
    const docItems = [];
    const videoItems = [];

    for (let i = 0; i < itemCount; i++) {
        audioItems.push(createAudioItem())
    }
    for (let i = 0; i < itemCount; i++) {
        imageItems.push(createImageItem())
    }
    for (let i = 0; i < itemCount; i++) {
        docItems.push(createDocItem())
    }
    for (let i = 0; i < itemCount; i++) {
        videoItems.push(createVideoItem())
    }

    // so with this now, you import it once, into <App /> then you let all the category components do their own sorting
    // like: <Category categoryData={filterByType(data, audioFileTypes)} type="Audio" />
    // const filterByType = (data, type) => data.filter(item => audioFileTypes.includes(item.type))

    // and then for the "all data" category, just pass the data
    // <Category categoryData={data} type="All" />
    
    return [ ...audioItems, ...imageItems, ...docItems, ...videoItems ];

}

export default data;