import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("../pages/Home.vue")
    },
	{
        path: "/main",
        component: () => import("../pages/Main/Main.vue"),
        children: [
			{
                path: "/popular",
                component: () => import("../pages/Main/popular.vue")
            },
			{
                path: "/ongoing",
                component: () => import("../pages/Main/ongoing.vue")
            },
			{
                path: "/anons",
                component: () => import("../pages/Main/anons.vue")
            },
			{
                path: "/movie",
                component: () => import("../pages/Main/movie.vue")
            },
			{
                path: "/ova",
                component: () => import("../pages/Main/ova.vue")
            }
        ]
    },
    {
        path: "/search",
        component: () => import("../pages/Search.vue")
    },
    {
        path: "/anime",
        component: () => import("../pages/Anime.vue")
    },
    {
        path: "/manga",
        component: () => import("../pages/Manga.vue")
    },
    {
        path: "/anime/source",
        component: () => import("../pages/AnimeSourceInfo.vue")
    },
    {
        path: "/manga/source",
        component: () => import("../pages/MangaSourceInfo.vue")
    },
    {
        path: "/settings",
        component: () => import("../pages/Settings.vue")
    },
    {
        path: "/history",
        component: () => import("../pages/History.vue")
    },
    {
        path: "/schedule",
        component: () => import("../pages/Schedule/Main.vue"),
        children: [
            {
                path: "",
                component: () => import("../pages/Schedule/Season.vue")
            },
            {
                path: "week",
                component: () => import("../pages/Schedule/Week.vue")
            }
        ]
    },
    {
        path: "/bookmark",
        component: () => import("../pages/Bookmark.vue")
    },
    {
        path: "/connections",
        component: () => import("../pages/Connections/Main.vue")
    },
    {
        path: "/connections/myanimelist/anime",
        component: () =>
            import("../pages/Connections/MyAnimeList/Profile-Anime.vue")
    },
    {
        path: "/connections/myanimelist/manga",
        component: () =>
            import("../pages/Connections/MyAnimeList/Profile-Manga.vue")
    },
    {
        path: "/auth/myanimelist/callback",
        component: () =>
            import("../pages/Connections/MyAnimeList/Authenticate.vue")
    },
    {
        path: "/connections/anilist/anime",
        component: () =>
            import("../pages/Connections/AniList/Profile-Anime.vue")
    },
    {
        path: "/connections/anilist/manga",
        component: () =>
            import("../pages/Connections/AniList/Profile-Manga.vue")
    },
    {
        path: "/auth/anilist/callback",
        component: () => import("../pages/Connections/AniList/Authenticate.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;

export const BarRoutes: {
    name: string;
    url: string;
    external: boolean;
    icon: string;
}[] = [
    {
        name: "Home",
        url: "/",
        external: false,
        icon: "home"
    },
	{
        name: "Main",
        url: "/Main",
        external: false,
        icon: "calendar-alt"
    },
    {
        name: "Search",
        url: "/search",
        external: false,
        icon: "search"
    },
    {
        name: "Connections",
        url: "/connections",
        external: false,
        icon: "link"
    },
    {
        name: "Schedule",
        url: "/schedule",
        external: false,
        icon: "calendar-alt"
    },
    {
        name: "Bookmarks",
        url: "/bookmark",
        external: false,
        icon: "bookmark"
    },
    {
        name: "History",
        url: "/history",
        external: false,
        icon: "history"
    },
    {
        name: "Settings",
        url: "/settings",
        external: false,
        icon: "cog"
    }
];
