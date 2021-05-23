import { ContentfulClientApi } from 'contentful';
import { Store } from 'vuex';
import { Context } from '@nuxt/types';

export const makeListEntries =
  (contentfulClient: ContentfulClientApi, contentType: string) =>
    async ({
      filters = {},
      // eslint-disable-next-line camelcase
      contentType: content_type = contentType,
      limit = 1000,
      order = '-sys.updatedAt'
    } = {}) => {
      const result = await contentfulClient.getEntries({
        ...filters,
        content_type,
        order,
        limit,
        include: 2
      });

      return result?.items;
    };

type User = { name: string };
type Theme = { backgroundColor: string };
type AppState = {
  announcements: unknown[] | null;
  user: User | null;
  theme: Theme | null;
};

export const mutationTypes = {
  SET_USER: 'SET_USER',
  SET_ANNOUNCEMENTS: 'SET_ANNOUNCEMENTS',
  SET_THEME: 'SET_THEME'
};

export const actionTypes = {
  RESTORE_SESSION: 'restoreSession',
  SET_THEME: 'setTheme',
  SET_USER: 'setUser',
  LOGOUT: 'logout'
};

export const mutations = {
  [mutationTypes.SET_ANNOUNCEMENTS]: (
    state: AppState,
    announcements: unknown[]
  ) => {
    state.announcements = announcements;
  },
  [mutationTypes.SET_USER]: (state: AppState, user: User | null) => {
    state.user = user;
  },
  [mutationTypes.SET_THEME]: (state: AppState, theme: Theme | null) => {
    state.theme = theme;
  }
};

export const state = (): AppState => ({
  announcements: null,
  user: null,
  theme: null
});

export const actions = {
  restoreSession ({ commit, state }: Store<AppState>) {
    if (state.user) {
      return;
    }

    const user = window.localStorage.getItem('session');
    if (user) {
      commit(mutationTypes.SET_USER, JSON.parse(user));
    }
  },
  setUser ({ commit }: Store<unknown>, user: User | null) {
    window.localStorage.setItem('session', JSON.stringify(user));
    commit(mutationTypes.SET_USER, user);
  },
  logout ({ commit }: Store<unknown>) {
    commit(mutationTypes.SET_USER, null);
    window.localStorage.removeItem('session');
    window.location.reload();
  },
  setTheme ({ commit }: Store<unknown>, theme: Theme | null) {
    commit(mutationTypes.SET_THEME, theme);
  },
  async nuxtServerInit (
    { commit }: Store<unknown>,
    {
      env,
      $contentfulClient
    }: Context & {
      $contentfulClient: ContentfulClientApi | null;
    }
  ) {
    if (!$contentfulClient) {
      return;
    }

    const fetchAnnouncements = makeListEntries(
      $contentfulClient,
      'announcement'
    );
    const announcements = await fetchAnnouncements(env.NUXT_ENV_COMPANY_ID);
    commit(mutationTypes.SET_ANNOUNCEMENTS, announcements);
  }
};
