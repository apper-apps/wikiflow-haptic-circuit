export const buildPageTree = (pages, parentId = null) => {
  return pages
    .filter(page => page.parentId === parentId)
    .map(page => ({
      ...page,
      children: buildPageTree(pages, page.Id)
    }));
};

export const flattenPageTree = (pages) => {
  const result = [];
  
  const flatten = (pageList, level = 0) => {
    pageList.forEach(page => {
      result.push({ ...page, level });
      if (page.children && page.children.length > 0) {
        flatten(page.children, level + 1);
      }
    });
  };
  
  flatten(pages);
  return result;
};

export const findPagePath = (pages, targetId, currentPath = []) => {
  for (const page of pages) {
    const newPath = [...currentPath, page];
    
    if (page.Id === targetId) {
      return newPath;
    }
    
    if (page.children && page.children.length > 0) {
      const result = findPagePath(page.children, targetId, newPath);
      if (result) {
        return result;
      }
    }
  }
  
  return null;
};

export const generateBreadcrumbs = (pages, currentPageId) => {
  const pageTree = buildPageTree(pages);
  const path = findPagePath(pageTree, currentPageId);
  
  if (!path) return [];
  
  return [
    { title: "Home", href: "/" },
    ...path.map((page, index) => ({
      title: page.title,
      href: index === path.length - 1 ? null : `/page/${page.Id}`,
      id: page.Id
    }))
  ];
};

export const getAvailableTags = (pages) => {
  const allTags = pages.flatMap(page => page.tags || []);
  return [...new Set(allTags)].sort();
};

export const getAvailableCategories = (pages) => {
  const allCategories = pages.map(page => page.category).filter(Boolean);
  return [...new Set(allCategories)].sort();
};