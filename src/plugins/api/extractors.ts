import { http, RequesterOptions } from "./requester";
import { util } from "../util";
import { Requester } from "anime-extru/dist/types";

import MALAnimeSearch, {
    SearchResult as MALSearchAnimeSearchResult,
} from "anime-extru/dist/integrations/myanimelist/anime-search";
import MALMangaSearch, {
    SearchResult as MALSearchMangaSearchResult,
} from "anime-extru/dist/integrations/myanimelist/manga-search";
import MALAnimeInfo, {
    InfoResult as MALAnimeInfoInfoResult,
} from "anime-extru/dist/integrations/myanimelist/anime-info";
import MALMangaInfo, {
    InfoResult as MALMangaInfoInfoResult,
} from "anime-extru/dist/integrations/myanimelist/manga-info";
import * as MALTopAnimes from "anime-extru/dist/integrations/myanimelist/top";
import * as MALSchedule from "anime-extru/dist/integrations/myanimelist/schedule";
import * as MALSeason from "anime-extru/dist/integrations/myanimelist/season";

import * as MALOva from "anime-extru/dist/integrations/word-art/ova";

import * as MALPopular from "anime-extru/dist/integrations/crunchyroll/show/popular";
import * as MALOngoing from "anime-extru/dist/integrations/crunchyroll/show/ongoing";
import * as MALAnons from "anime-extru/dist/integrations/crunchyroll/show/anons";
import * as MALMovie from "anime-extru/dist/integrations/crunchyroll/show/movie";

import { AnimeExtractorModel } from "anime-extru/dist/extractors/anime/model";
import GogoAnime from "anime-extru/dist/extractors/anime/gogoanime";
import KawaiifuAnime from "anime-extru/dist/extractors/anime/kawaiifu";
import AnimeParadise from "anime-extru/dist/extractors/anime/animeparadise";
import TenshiMoe from "anime-extru/dist/extractors/anime/tenshidotmoe";
import Animedia from "anime-extru/dist/extractors/anime/animedia";
import Animego from "anime-extru/dist/extractors/anime/animego";
import Smotret from "anime-extru/dist/extractors/anime/smotret";
import Animania from "anime-extru/dist/extractors/anime/animania";
import Agorov from "anime-extru/dist/extractors/anime/news/agorov";
import Wakanim from "anime-extru/dist/extractors/anime/news/wakanim";

import {
    MangaExtractorConstructorOptions,
    MangaExtractorModel,
    MangaExtractorPageImageResult,
} from "anime-extru/dist/extractors/manga/model";
import FanFoxManga from "anime-extru/dist/extractors/manga/fanfox";
import MangaDexManga from "anime-extru/dist/extractors/manga/mangadex";
import MangaInnManga from "anime-extru/dist/extractors/manga/mangainn";
import ReadM from "anime-extru/dist/extractors/manga/readm";
import MangaNato from "anime-extru/dist/extractors/manga/manganato";
import ManhwaTop from "anime-extru/dist/extractors/manga/manhwatop";
import ComicK from "anime-extru/dist/extractors/manga/comick";

export interface ExtractorsEntity {
    integrations: {
        MyAnimeList: {
            searchAnime(term: string): Promise<MALSearchAnimeSearchResult[]>;
            searchManga(term: string): Promise<MALSearchMangaSearchResult[]>;
            getAnimeInfo(url: string): Promise<MALAnimeInfoInfoResult>;
            getMangaInfo(url: string): Promise<MALMangaInfoInfoResult>;
            getTopAnime(type: string): Promise<MALTopAnimes.TopResult[]>;
            getTopAnimeTypes(): Promise<string[]>;
            schedule(): Promise<MALSchedule.ScheduleResult[]>;
            season(): Promise<MALSeason.SeasonResult>;
			mainmenu(): Promise<MALMainMenu.MainMenuResult[]>;
			popular(): Promise<MALPopular.PopularResult>;
			ongoing(): Promise<MALOngoing.OngoingResult>;
			anons(): Promise<MALAnons.AnonsResult>;
			movie(): Promise<MALMovie.MovieResult>;
			ova(): Promise<MALOva.OvaResult>;
			
			getOva(type: string): Promise<MALOva.TopResult[]>;
        };
    };
    anime: Record<string, AnimeExtractorModel>;
    manga: Record<string, MangaExtractorModel>;
}

export interface OptionsEntity {
    http: Requester;
}

export const Extractors = {
    __extractor: <ExtractorsEntity | null>null,
    __options: <OptionsEntity | null>null,
    async getOptions() {
        if (!this.__options) {
            this.__options = {
                http: await http.getClient(),
            };
        }

        return this.__options;
    },
    async getClient() {
        if (!this.__extractor) {
            const options = await this.getOptions();

            this.__extractor = {
                integrations: {
                    MyAnimeList: {
                        async searchAnime(terms) {
                            return MALAnimeSearch(terms, options);
                        },
                        async searchManga(terms) {
                            return MALMangaSearch(terms, options);
                        },
                        async getAnimeInfo(url) {
                            return MALAnimeInfo(url, options);
                        },
                        async getMangaInfo(url) {
                            return MALMangaInfo(url, options);
                        },
                        async getTopAnime(type) {
                            return MALTopAnimes.default(<any>type, options);
                        },
						async getOva(type) {
                            return MALOva.default(<any>type, options);
                        },
                        async getTopAnimeTypes() {
                            return ["all", ...MALTopAnimes.TopAnimeTypes];
                        },
                        async schedule() {
                            return MALSchedule.default(options);
                        },
                        async season() {
                            return MALSeason.default(options);
                        },
						async mainmenu() {
                            return MALMainMenu.default(options);
                        },
                        async popular() {
                            return MALPopular.default(options);
                        },
						async ongoing() {
                            return MALOngoing.default(options);
                        },
						async anons() {
                            return MALAnons.default(options);
                        },
						async movie() {
                            return MALMovie.default(options);
                        },
						async ova() {
                            return MALOva.default(options);
                        },
                    },
                },
                anime: {
					Wakanim: new Wakanim(options),
					Agorov: new Agorov(options),
					Animania: new Animania(options),
                    GogoAnime: new GogoAnime(options),
                    Kawaiifu: new KawaiifuAnime(options),
                    AnimeParadise: new AnimeParadise(options),
                    TenshiMoe: new TenshiMoe(options),
					Animedia: new Animedia(options),
					Animego: new Animego(options),
					Smotret: new Smotret(options),
                },
                manga: {
                    FanFox: new FanFoxManga(options),
                    MangaDex: new MangaDexManga(options),
                    MangaInn: new MangaInnManga(options),
                    ReadM: new (Mangab64Chapters(Mangab64Search(ReadM)))(
                        options
                    ),
                    MangaNato: new (Mangab64Chapters(MangaNato))(options),
                    ManhwaTop: new (Mangab64Chapters(
                        Mangab64Search(ManhwaTop)
                    ))(options),
                    ComicK: new ComicK(options),
                },
            };
        }

        return this.__extractor;
    },
};

type MangaModelClass = new (
    options: MangaExtractorConstructorOptions
) => MangaExtractorModel;
function Mangab64Search(cls: MangaModelClass) {
    return class extends cls {
        async search(url: string) {
            const res = await super.search(url);
            for (const key in res) {
                if (res.hasOwnProperty(key)) {
                    const img = res[key].thumbnail;
                    if (img && img.startsWith("http")) {
                        res[key].thumbnail = await getBase64Image(img, {
                            headers: {},
                        });
                    }
                }
            }
            return res;
        }
    };
}

function Mangab64Chapters(cls: MangaModelClass) {
    return class extends cls {
        async getChapterPages(url: string) {
            const res = await super.getChapterPages(url);
            res.type = "page_urls";
            return res;
        }

        async getPageImage(url: string, headers?: Record<string, string>) {
            return <MangaExtractorPageImageResult>{
                page: "-",
                image: await getBase64Image(url, {
                    headers: headers || {},
                }),
            };
        }
    };
}

async function getBase64Image(
    url: string,
    options: Omit<RequesterOptions, "responseType">
) {
    try {
        const client = await http.getClient();
        const res = await client.get(url, {
            ...options,
            responseType: "buffer",
        });
        return `data:image/png;base64,${util.BufferToBase64(res)}`;
    } catch (err: any) {
        throw err;
    }
}
