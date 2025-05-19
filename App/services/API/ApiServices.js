//REST API SERVICES
export default {
  post: (API, slug, payload) => {
    return API.post(slug, payload);
  },
  get: (API, slug) => {
    return API.get(slug);
  },
  delete: (API, slug) => {
    return API.delete(slug);
  }
};
