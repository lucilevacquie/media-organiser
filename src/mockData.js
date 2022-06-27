import { faker } from '@faker-js/faker';

import { v4 as uuidv4 } from 'uuid';

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

    const audioItem = {
        id: uuidv4(),
        title,
        artist,
        genre,
        fileType,
        path: `D:/media/audio/${genre.toLowerCase()}/${artist[0].toLowerCase}/${artist.replaceAll(' ', '-')}_${title.replaceAll(' ', '-')}`
    }

    return audioItem;
}

//IMAGES
const imageFileTypes = {
    jpg: 'jpg',
    png: 'png',
    bmp: 'bmp',
}
const imageCategories = {
    abstract: 'abstract',
    animals: 'animal',
    food: 'food',
    nature: 'nature',
}
const createImageItem = () => {
    const fileType = imageFileTypes[Math.floor(Math.random() * 3)];
    const fileCategory = imageCategories[Math.floor(Math.random() * 4)];
    const name = faker.music.songName();

    const imageItem = {
        id: uuidv4(),
        name,
        fileCategory,
        fileType,
        path: `D:/media/images/${fileCategory}/${name.replaceAll(' ', '-')}`
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

export default () => {
    const itemCount = 25;
    const audioItems = [];

    for (let i = 0; i < itemCount; i++) {
        audioItems.push(createAudioItem())
    }

    return audioItems;


}