import util from './util';
import post from './news.constant'

const images = ['assets/logo192.png', 'assets/logo512.png', "https://imagens.nxplay.com.br/video_thumb/9e196b28-98ce-47d1-8e80-1f163ac8f5fb.jpg"]

const fetchTop = () => {
  const posts = [];
  for (let i = 0; i < 10; i += 1) {
    const index = i + 1;
    posts.push({
      ...post,
      photo: images[util.random({ min: 0, max: images.length - 1 })],
      title: `${index}. Test the slider and display to in to specific view ${index}`,
      id: index
    });
  }
  return posts;
};

const random = ({ min = 1, max = 5 }) => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const newByType = () => {
  const posts = [];
  for (let i = 0; i < 10; i += 1) {
    const index = i + 1;
    const type = {
      id: i,
      name: `Type of news ${index}`
    };
    const newsNum = random({})
    const postsByType = []
    for (let j = 0; j < newsNum; j += 1) {
      postsByType.push({
        ...post,
        photo: images[util.random({ min: 0, max: images.length - 1 })],
        title: `${j} New by type to in to specific view ${index}`,
        id: j + 1
      })
    }
    posts.push({
      ...type,
      posts: [...postsByType]
    });
  }
  return posts;
};

const newDetail = (id) => {
  return { ...post, title: 'ha ha thiệt ko thể tin nổi', id, photo: images[images.length - 1], type: { id: 12, name: "Type of days" } };
};

export default { fetchTop, newByType, newDetail };
