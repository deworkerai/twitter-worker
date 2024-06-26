import * as RSSHub from 'rsshub';

let inited = false;
export const postInit = async () => {
  if (inited) return;

  if (!process.env.TWITTER_USERNAME) {
    console.log('TWITTER_USERNAME is not set, please set it in .env file');
    process.exit(1);
  }

  if (!process.env.TWITTER_PASSWORD) {
    console.log('TWITTER_PASSWORD is not set, please set it in .env file');
    process.exit(1);
  }

  if (!process.env.TWITTER_COOKIE) {
    console.log('TWITTER_COOKIE is not set, please set it in .env file');
    process.exit(1);
  }

  await RSSHub.init({
    // config
    TWITTER_USERNAME: process.env.TWITTER_USERNAME,
    TWITTER_PASSWORD: process.env.TWITTER_PASSWORD,
    TWITTER_AUTHENTICATION_SECRET: process.env.TWITTER_AUTHENTICATION_SECRET,
    TWITTER_COOKIE: process.env.TWITTER_COOKIE,
  });

  inited = true;
};

export const sayHello = ({ params }: any = {}) => {
  return 'hello world' + ', ' + params?.name + '!';
};

export const listTimeline = async ({
  params,
}: {
  params: { id: string; routeParams?: string };
}) => {
  const { id, routeParams = 'showAuthorInTitle=false' } = params;
  console.log('request args: ', id, routeParams);
  const res = await RSSHub.request(`/twitter/list/${id}/${routeParams}?`);
  const rtn = { ...res, item: res.item.slice(0, 3) };
  console.log('[list_timeline]', rtn);

  return rtn;
};

export const homeTimeline = async (
  { routeParams }: any = {
    routeParams: 'showAuthorInTitle=false',
  },
) => {
  RSSHub.request(`/twitter/home/${routeParams}?`)
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const userTimeline = async ({
  params,
}: {
  params: { handle: string; routeParams?: string };
}) => {
  const { handle, routeParams = 'showAuthorInTitle=false&exclude_replies=1' } = params;
  console.log('request args: ', handle, routeParams);

  const res = await RSSHub.request(`/twitter/user/${handle}/${routeParams}?`);

  const rtn = { ...res, item: res.item.slice(0, 3) };
  console.log('[user_timeline]', rtn);

  return rtn;
};

export const tweetDetail = async ({ params }: { params: { url: string } }) => {
  const url = new URL(params.url);
  const parts = url.pathname.split('/');
  const handle = parts[1];
  const id = parts[3];
  console.log('request args: ', handle, id);

  const res = await RSSHub.request(`/twitter/tweet/${handle}/status/${id}?original=true`);
  if (res?.error) {
    return null;
  }
  console.log('[tweet_detail]', res);
  return res;
};
