import { faker } from '@faker-js/faker';

import { v4 as uuidv4 } from 'uuid';

const minSize = 1;
const maxSize = 7;

//AUDIO FILES
const audioFileTypes = {
    wav: 'wav',
    mp3: 'mp3',
    ogg: 'ogg',
    aac: 'aac',
}
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
const imageFileTypes = ['jpg','png','bmp',]

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
const docFileTypes = {
    pdf: 'pdf',
    doc: 'doc',
    html: 'html',
    txt: 'txt',
}
const createDocItem = () => {
    const fileType = docFileTypes[Math.floor(Math.random() * 4)];
    const title = faker.random.words();

    const docItem = {
        id: uuidv4(),
        title,
        fileType,
        path: `D:/media/documents/${title.replaceAll(' ', '-')}`
    }

    return docItem;
}

//VIDEOS
const videoFileTypes = {
    aac: 'aac',
    mp4: 'mp4',
    wav: 'wav',
    avi: 'avi',
}
const createVideoItem = () => {
    const fileType = videoFileTypes[Math.floor(Math.random() * 4)];
    const title = faker.random.words();

    const videoItem = {
        id: uuidv4(),
        title,
        fileType,
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

    console.log(imageItems)

    return { audioItems, imageItems, docItems, videoItems };
}

export default data;