import { faker } from '@faker-js/faker';

//Auto generate random ID
import { v4 as uuidv4 } from 'uuid';

//Min and max for the file size function
const minSize = 1;
const maxSize = 7;

//AUDIO FILES
const audioFileTypes = ['wav', 'mp3', 'flac', 'aac', 'wma']

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
    const img = '';

    const audioItem = {
        id: uuidv4(),
        title,
        artist,
        genre,
        fileType,
        size,
        duration,
        path: `D:/media/audio/${genre.toLowerCase()}/${artist.toLowerCase()}/${artist.replaceAll(' ', '-')}_${title.replaceAll(' ', '-')}.${fileType}`,
        comment,
        img
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
    const name = faker.random.words();
    const size = Math.floor(Math.random() * (maxSize - minSize + 1) + minSize);
    const comment = faker.lorem.text(3);
    const img = '';

    const docItem = {
        id: uuidv4(),
        name,
        fileType,
        size,
        path: `D:/media/documents/${name.replaceAll(' ', '-')}.${fileType}`,
        comment,
        img
    }
    return docItem;
}

//VIDEOS
const videoFileTypes = ['mov', 'mp4', 'avi', 'wmv', 'flv'];
const minDuration = 1;
const maxDuration = 10;

const createVideoItem = () => {
    const fileType = videoFileTypes[Math.floor(Math.random() * 5)];
    const title = faker.random.words();
    const artist = `${faker.name.firstName()} ${faker.name.lastName()}`;
    const img = faker.image.image(640, 480, true);
    const size = Math.floor(Math.random() * (maxSize - minSize + 1) + minSize);
    const duration = Math.floor(Math.random() * (maxDuration - minDuration + 1) + minDuration);
    const comment = faker.lorem.text(3);

    const videoItem = {
        id: uuidv4(),
        title,
        artist,
        img,
        fileType,
        size,
        duration,
        path: `D:/media/videos/${title.replaceAll(' ', '-')}.${fileType}`,
        comment
    }
    return videoItem;
}


const data = () => {
    //Number of file created for each family type
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