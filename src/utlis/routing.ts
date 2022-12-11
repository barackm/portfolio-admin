export const getBreadcrumb = (path: string, routes: any) => {
  const paths: any[] = [];
  const parents: any[] = [];
  const children: any[] = [];

  const pathsArray = path.split('/').filter((item) => item !== '');
  routes.forEach((route: any) => {
    if (pathsArray.includes(route.name.toLowerCase())) {
      parents.push(route);
    }
  });

  parents.forEach((parent: any) => {
    parent.children.forEach((child: any) => {
      if (child.link === path) {
        children.push(child);
      }
    });
  });

  const lastParent = parents[parents.length - 1];
  const lastPath = pathsArray[pathsArray.length - 1];
  const lastPathChild = lastParent?.children.find(
    (child: any) =>
      child.link.split('/').pop() === lastPath ||
      child.link.split('/').filter((path: any) => path !== '').length ===
        pathsArray.length,
  );

  if (parents.length > 1) {
    parents.forEach((parent: any) => {
      if (parent.link.trim() !== '/dashboard' && parent.link.trim() !== '/') {
        paths.push({
          name: parent.name,
          path: parent.link,
          description: parent.description,
          isCurrent: parent.link === lastPathChild?.link || false,
        });
      }
    });
  }

  if (lastPathChild) {
    const isLastPathInPaths = paths.find(
      (path: any) => path.path === lastPathChild.link,
    );
    if (!isLastPathInPaths) {
      paths.push({
        name: lastPathChild?.name,
        path: lastPathChild?.link,
        description: lastPathChild?.description,
        isCurrent: true,
      });
    }
  }

  return {
    paths,
    title: lastPathChild?.name,
    description: lastPathChild?.description,
  };
};

export const getCurrentActiveLink = (path: string, routes: any[]) => {
  const paths: any[] = [];
  const parents: any[] = [];
  const children: any[] = [];

  if (path === '/dashboard' || path === '/') {
    return {
      parent: routes[0],
      child: routes[0].children[0],
    };
  }

  const pathsArray = path.split('/').filter((item) => item !== '');
  routes.forEach((route: any) => {
    if (pathsArray.includes(route.name.toLowerCase())) {
      parents.push(route);
    }
  });

  parents.forEach((parent: any) => {
    parent.children.forEach((child: any) => {
      if (child.link === path) {
        children.push(child);
      }
    });
  });

  const lastParent = parents[parents.length - 1];
  const lastPath = pathsArray[pathsArray.length - 1];
  const lastPathChild = lastParent?.children.find(
    (child: any) =>
      child.link.split('/').pop() === lastPath ||
      child.link.split('/').filter((path: any) => path !== '').length ===
        pathsArray.length,
  );

  if (parents.length > 1) {
    parents.forEach((parent: any) => {
      if (parent.link.trim() !== '/dashboard' && parent.link.trim() !== '/') {
        paths.push({
          name: parent.name,
          path: parent.link,
          description: parent.description,
          isCurrent: parent.link === lastPathChild?.link || false,
        });
      }
    });
  }

  if (lastPathChild) {
    const isLastPathInPaths = paths.find(
      (path: any) => path.path === lastPathChild.link,
    );
    if (!isLastPathInPaths) {
      paths.push({
        name: lastPathChild?.name,
        path: lastPathChild?.link,
        description: lastPathChild?.description,
        isCurrent: true,
      });
    }
  }

  return {
    parent: lastParent,
    child: lastPathChild,
  };
};

export const isCurrentRouteActive = (
  path: string,
  curentLink: any,
  options: {
    isParent?: boolean;
    router?: any;
  },
) => {
  const { isParent, router } = options;
  const pathsArray = path.split('/').filter((item) => item !== '');
  const splitLink = curentLink.split('/').filter((item: any) => item !== '');
  if (isParent) {
    if (
      pathsArray.length === 1 &&
      (curentLink === '/dashboard' || curentLink === '/')
    ) {
      return true;
    }

    return pathsArray[0] === splitLink[0] && pathsArray[1] === splitLink[1];
  } else {
    if (
      pathsArray.length === 1 &&
      splitLink.length === 1 &&
      path === curentLink
    ) {
      return true;
    }
    if (path === curentLink) {
      return true;
    }
    const isDynamicRoute = router.pathname.includes('[id]');
    if (isDynamicRoute) {
      return splitLink[splitLink.length - 1] === 'new';
    }
  }
};
