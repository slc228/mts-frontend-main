import React from 'react';
import Home from '../Home/Home';
import Overall from '../Overall/Overall';
import Programme from '../Programme/Programme';
import Admin from '../Admin/Admin';
import View from '../View/View';
import Tool from "../Tool/Tool";
import HotArticle from "../Programme/HotArticle/HotArticle";

const getRoutes = (userType) => {
  const routes = [
    { key: 'home', link: '/home', label: '首页', component: Home },
    { key: 'search', link: '/search', label: '全网搜索', component: Overall },
    { key: 'hotarticle', link: '/HotArticle', label: '热门文章', component: HotArticle},
    { key: 'monitor', link: '/monitor', label: '舆情监测', component: Programme },
    { key: 'view', link: '/view', label: '数据大屏', component: View },
    { key: 'tool', link: '/tool', label: '工具库', component: Tool}
  ];
  if (userType === 'admin') routes.push({ key: 'admin', link: '/admin', label: '用户管理', component: Admin });
  return routes;
};

export default getRoutes;
