import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
const cheerio = await import('cheerio');

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const processContent = (content) => {
    if (!content) return "";

    const $ = cheerio.load(content);

    $("img").each((_, img) => {
        const src = $(img).attr("src");
        if (src && !src.startsWith("http")) {
            $(img).attr("src", `${process.env.API_MEDIA_URL}${src}`);
        }
    });

    $('br').replaceWith('<span class="custom-br"></span>');

    return $.html();
};
