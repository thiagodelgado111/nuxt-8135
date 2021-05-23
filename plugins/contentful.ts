import { Context } from '@nuxt/types';
import { Inject } from '@nuxt/types/app';
const contentful = require('contentful');

const config = {
  space: process.env.CONTENTFUL_ADMIN_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ADMIN_ACCESS_TOKEN || '',
  environment: process.env.CONTENTFUL_ENVIRONMENT
};

export default (_: Context, inject: Inject) => {
  const client = contentful.createClient(config);
  inject('contentfulClient', client);
};
