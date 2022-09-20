import PostService from "./post.service";

const fetchList = () => {
  PostService.fetchList({ param: { limit: 10, page: 1 } });
};

const fetchTop = () => {
  PostService.fetchTop({ param: { limit: 5, page: 1 } });
};

export default { fetchList, fetchTop };
