import axios from "axios";
import { getAuthHeaders } from "./auth";

const Articles = {
  async index(category, location) {
    let response;
    try {
      let result;
      if (category) {
        result = await axios.get(`/articles/?category=${category}`);
      } else if (location) {
        result = await axios.get(`/articles/?location=${location}`);
      } else {
        result = await axios.get(`/articles`);
      }
      return result.data.articles;
    } catch (error) {
      return error.response.data.error;
    } finally {
      return response;
    }
  },

  async show(articleId, authenticated) {
    try {
      let result;
      if (authenticated) {
        result = await axios.get(`/articles/${articleId}`, {
          headers: getAuthHeaders(),
        });
      } else {
        result = await axios.get(`/articles/${articleId}`);
      }
      return result.data.article;
    } catch (error) {
      return error.response.data.error;
    }
  },
};
export default Articles;
