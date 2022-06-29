import { faker } from '@faker-js/faker';

import { v4 as uuidv4 } from 'uuid';

const minSize = 1;
const maxSize = 7;


const audioFileTypes = ['wav', 'mp3', 'aac', 'flac', 'alac', 'dsd']


//AUDIO FILES

const createAudioItem = () => {
    const minDuration = 1;
    const maxDuration = 4;

    const fileType = audioFileTypes[Math.floor(Math.random() * 4)];
    const artist = `${faker.name.firstName()} ${faker.name.lastName()}`;
    const title = faker.music.songName();
    const genre = faker.music.genre();
    const size = Math.floor(Math.random() * (maxSize - minSize + 1) + minSize)
    const duration = Math.floor(Math.random() * (maxDuration - minDuration + 1) + minDuration);
    const comment = faker.lorem.text(3);

    const audioItem = {
        id: uuidv4(),
        title,
        artist,
        genre,
        fileType,
        size,
        duration,
        path: `D:/media/audio/${genre.toLowerCase()}/${artist.toLowerCase()}/${artist.replaceAll(' ', '-')}_${title.replaceAll(' ', '-')}.${fileType}`,
        comment
    }

    return audioItem;
}

//IMAGES
const imageFileTypes = ['jpg', 'png', 'bmp']

const createImageItem = () => {
    const fileType = imageFileTypes[Math.floor(Math.random() * 3)];
    const img = faker.image.image(640, 480, true);
    const name = faker.random.words();
    const size = Math.floor(Math.random() * (maxSize - minSize + 1) + minSize);
    const comment = faker.lorem.text(3);

    const imageItem = {
        id: uuidv4(),
        img,
        name,
        fileType,
        size,
        path: `D:/media/images/${name.replaceAll(' ', '-')}.${fileType}`,
        comment
    }

    return imageItem;
}

//DOCUMENTS
const docFileTypes = ['pdf', 'doc', 'html', 'txt']

const createDocItem = () => {
    const fileType = docFileTypes[Math.floor(Math.random() * 4)];
    const title = faker.random.words();
    const size = Math.floor(Math.random() * (maxSize - minSize + 1) + minSize);
    const comment = faker.lorem.text(3);

    const docItem = {
        id: uuidv4(),
        title,
        fileType,
        size,
        path: `D:/media/documents/${title.replaceAll(' ', '-')}.${fileType}`,
        comment
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
    const size = Math.floor(Math.random() * (maxSize - minSize + 1) + minSize);
    const duration = Math.floor(Math.random() * (maxDuration - minDuration + 1) + minDuration);
    const comment = faker.lorem.text(3);

    const videoItem = {
        id: uuidv4(),
        title,
        img,
        fileType,
        size,
        duration,
        path: `D:/media/videos/${title.replaceAll(' ', '-')}`,
        comment
    }

    return videoItem;
}

const data = () => {
    const itemCount = 25;

    const dataObject = {}

    for (let i = 0; i < itemCount; i++) {
        const item = createAudioItem();
        dataObject[item.id] = item;
    }
    for (let i = 0; i < itemCount; i++) {
        const item = createImageItem();
        dataObject[item.id] = item;
    }
    for (let i = 0; i < itemCount; i++) {
        const item = createDocItem();
        dataObject[item.id] = item;
    }
    for (let i = 0; i < itemCount; i++) {
        const item = createVideoItem();
        dataObject[item.id] = item;
    }

    return dataObject;

}

export default data;