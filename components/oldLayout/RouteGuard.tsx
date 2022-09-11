// next component to add security
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Props = {
  children: JSX.Element;
};

export const RouteGuard = ({ children }: Props) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  function routeCheck(url: string) {
    const publicUrls = ['/login', '/login/', '/signup'];
    const path = url.split('?')[0];
    const isPublic = publicUrls.includes(path);

    if (!isPublic) {
      console.log('idk');
      setIsAuthenticated(false);
      router
        .push({
          pathname: '/login',
          // query: { returnUrl: router.asPath },
        })
        .then(() => console.log('redirected'))
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    // on initial load - run auth check
    routeCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setIsAuthenticated(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', routeCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', routeCheck);
    };
  }, []);

  return <>{isAuthenticated && children}</>;
};
