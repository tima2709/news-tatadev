import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
const cheerio = await import('cheerio');

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const processContent = (content, galleryDelegate) => {
    if (!content) return "";

    const $ = cheerio.load(content);

    $("img").each((_, img) => {
        const src = $(img).attr("src");
        if (src && !src.startsWith("http")) {
            $(img).attr("src", `${process.env.API_MEDIA_URL}${src}`);
        }

        if (!$(img).parent().is("a[data-fancybox]")) {
            $(img).wrap(`<a data-fancybox="${galleryDelegate}" data-src="${$(img).attr("src")}"></a>`);
        }
    });

    $('br').replaceWith('<span class="custom-br"></span>');

    return $.html();
};
