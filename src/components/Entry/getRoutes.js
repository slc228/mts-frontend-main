import React from 'react';
import Home from '../Home/Home';
import Overall from '../Overall/Overall';
import Programme from '../Programme/Programme';
import Admin from '../Admin/Admin';
import View from '../View/View';
import Tool from '../Tool/Tool';
import HotArticle from '../Programme/HotArticle/HotArticle';
import SensitiveWords from '../SensitiveWords/SensitiveWords';

const getRoutes = (userType, userJurisdiction) => {
  const jurisdiction = userJurisdiction ? JSON.parse(userJurisdiction) : undefined;
  const routes = [
    { key: 'home', link: '/home', label: '首页', component: Home },
    // { key: 'search', link: '/search', label: '全网搜索', component: Overall },
    // { key: 'hotarticle', link: '/HotArticle', label: '热门文章', component: HotArticle },
    { key: 'monitor', link: '/monitor', label: '舆情监测', component: Programme },
    // { key: 'view', link: '/view', label: '数据大屏', component: View },
    { key: 'tool', link: '/tool', label: '工具库', component: Tool },
  ];
  if (jurisdiction) {
    jurisdiction.forEach(item => {
      if (item.type === '全网搜索' && item.tag === true) {
        routes.push({ key: 'search', link: '/search', label: '全网搜索', component: Overall });
      }
      if (item.type === '热门文章' && item.tag === true) {
        routes.push({ key: 'hotarticle', link: '/HotArticle', label: '热门文章', component: HotArticle });
      }
      if (item.type === '大屏显示' && item.tag === true) {
        routes.push({ key: 'view', link: '/view', label: '数据大屏', component: View });
      }
    });
  }
  if (userType === 'admin') {
    routes.push({ key: 'admin', link: '/admin', label: '用户管理', component: Admin, type: 'admin' });
    routes.push({ key: 'sword', link: '/sword', label: '敏感词管理', component: SensitiveWords, type: 'admin' });
  }
  return routes;
};

export default getRoutes;
