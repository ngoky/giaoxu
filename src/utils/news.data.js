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

const newByType = () => {
  const posts = [];
  for (let i = 0; i < 10; i += 1) {
    const index = i + 1;
    const type = {
      id: i,
      name: `Type of news ${index}`
    };
    const newsNum = util.random({ min: 1, max: 3 });
    const postsByType = [];
    for (let j = 0; j < newsNum; j += 1) {
      postsByType.push({
        ...post,
        photo: images[util.random({ min: 0, max: images.length - 1 })],
        title: `${j} New by type to in to specific view ${index}`,
        id: j + 1
      });
    }
    posts.push({
      ...type,
      posts: [...postsByType]
    });
  }
  return posts;
};

const newDetail = (id) => {
  return {
    ...post,
    title:
      "ha ha thiệt ko thể tin nổi very very very very long text long long text",
    id,
    photo: images[images.length - 1],
    createdAt: "2022-09-24T17:05:33",
    updatedAt: "2022-09-24T17:05:33",
    publishedBy: "Json t",
    author: {
      name: "ABC",
      title: "administrator"
    },
    type: { id: 12, name: "Type of days" }
  };
};

export default { fetchTop, newByType, newDetail };
