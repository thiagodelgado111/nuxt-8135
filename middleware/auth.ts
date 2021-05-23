import { Context, Middleware } from '@nuxt/types';

const authenticate: Middleware = ({ store, redirect }: Context) => {
  console.log('Current state', store.state);

  const user = store.state.user;
  if (!user) {
    console.log('User not authenticated');
    return redirect('/login');
  }
};

export default authenticate;
