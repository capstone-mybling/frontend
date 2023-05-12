import {identicon} from 'minidenticons';

const generateIdenticon = (name: string) => {
    return `data:image/svg+xml;utf8,${encodeURIComponent(identicon(name, 64))}`
}

export default generateIdenticon;
